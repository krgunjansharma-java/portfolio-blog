export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
}

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post1",
    title: "Migrating Enterprise Logs to ELF using Vert.x and Java 8",
    excerpt: "A detailed breakdown of how we migrated a legacy Splunk logging system to the ELF stack, utilizing Vert.x for non-blocking reactive stream processing and high-throughput ingestion.",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    tags: ["Vert.x", "Java 8", "Reactive Systems", "Logging"],
    content: `
Enterprise log ingestion at scale is one of the most demanding tasks for backend infrastructures. When migrating a high-throughput logging platform from Splunk to ELF (Elasticsearch, Logstash, Fluentd/FluentBit) at American Express, our primary challenge was designing a microservices architecture that could ingest millions of log records per minute without dropping packets or exhausting thread pools.

In this article, we'll dive into why we chose **Vert.x (Reactive)** over standard multi-threaded Spring Boot architectures, how we built the non-blocking log routers, and the performance gains we observed.

### Why Vert.x?

In standard Servlet-based JVM architectures (like standard Spring MVC), each request is bound to a single worker thread. If the ingestion endpoint blocks on an I/O operation (like writing to Elasticsearch or database validation), that thread stays active, consuming memory and preventing other connections from utilizing it. Under heavy log bursts, the thread pool is quickly exhausted, resulting in timeouts.

Vert.x, built on the **Eclipse Vert.x** reactive framework, operates on an event-driven loop pattern (similar to Node.js but leveraging the JVM's multi-core capabilities via multi-reactor design):
* **Single Event Loop Thread**: Handles thousands of connections concurrently using non-blocking I/O.
* **Verticles**: Modular components that communicate via an Event Bus.
* **Worker Verticles**: Dedicated to standard blocking operations (e.g. legacy DB queries) without stalling the main event loop.

### Designing the Reactive Log Ingestion Pipeline

Our pipeline consists of three core components:
1. **HTTP/TCP Ingestion Verticle**: Receives raw log entries from client systems.
2. **Log Transformer Verticle**: Parses, filters, and formats logs (e.g., extracting transaction IDs, levels, timestamps) using Vert.x reactive streams.
3. **Elasticsearch Router Verticle**: Batches parsed logs and forwards them to Elasticsearch clusters using the Vert.x Web Client.

Here is a simplified code example of our reactive HTTP Log Ingestor:

\`\`\`java
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;

public class LogIngestionVerticle extends AbstractVerticle {

    @Override
    public void start(Promise<Void> startPromise) {
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        
        router.post("/api/v1/logs").handler(ctx -> {
            String rawPayload = ctx.getBodyAsString();
            
            // Send payload to the Event Bus for transformation asynchronously
            vertx.eventBus().send("log.transform.address", rawPayload, reply -> {
                if (reply.succeeded()) {
                    ctx.response()
                       .setStatusCode(202)
                       .end("{\"status\":\"ACCEPTED\"}");
                } else {
                    ctx.response()
                       .setStatusCode(500)
                       .end("{\"status\":\"ERROR\", \"reason\":\"" + reply.cause().getMessage() + "\"}");
                }
            });
        });

        vertx.createHttpServer()
             .requestHandler(router)
             .listen(8080, http -> {
                 if (http.succeeded()) {
                     startPromise.complete();
                 } else {
                     startPromise.fail(http.cause());
                 }
             });
    }
}
\`\`\`

### Results & Performance Gains

By implementing this non-blocking ingestion route:
* **Memory footprint** was reduced by **65%** compared to our previous prototype built on Tomcat/Spring Boot.
* **Throughput** surged to over **85,000 log events per second** per node, with zero CPU throttling.
* **SLA compliance** reached **99.999%**, even during high-traffic transactional cycles.
    `
  },
  {
    id: "post2",
    title: "Automating Release Workflows with Go and the GitHub API",
    excerpt: "How to build command-line automation in Go that interacts with the GitHub API to automate PR creation, status checks, and release branch cuts, cutting manual overhead by 90%.",
    date: "Nov 05, 2025",
    readTime: "5 min read",
    tags: ["Go Lang", "GitHub API", "Automation", "CI/CD"],
    content: `
In large microservice environments with dozens of repositories, manual release processes are a developer's nightmare. Creating release branches, opening staging pull requests (PRs), updating changelogs, and verifying CI/CD status checks across multiple services consumes hours of valuable engineering time.

During my work on release optimization, I built a custom API publishing automation tool using **Go (Golang)**. Let's explore how Go's lightweight runtime, concurrency features, and the \`google/go-github\` client make it the perfect candidate for DevOps tooling.

### Why Go for DevOps Tooling?

1. **Single Binary compilation**: Go compiles into a standalone static binary with zero external runtime dependencies (unlike Node.js or Python). This makes it extremely easy to distribute to developers or run inside a Dockerized Jenkins or GitHub Actions container.
2. **First-class concurrency**: Go's goroutines make it simple to query 20+ GitHub repositories in parallel and aggregate their PR statuses.
3. **Rich Ecosystem**: The official-grade GitHub clients and SDKs make interaction with the GitHub API seamless.

### Interacting with the GitHub API in Go

Let's look at how we can implement parallel PR checks across a list of repositories using Go routines and the \`github\` package.

\`\`\`go
package main

import (
	"context"
	"fmt"
	"sync"
	"github.com/google/go-github/v53/github"
	"golang.org/x/oauth2"
)

type PRStatus struct {
	Repo   string
	Number int
	State  string
	Merged bool
}

func checkPRStatus(ctx context.Context, client *github.Client, owner string, repo string, prNum int, ch chan<- PRStatus, wg *sync.WaitGroup) {
	defer wg.Done()

	pr, _, err := client.PullRequests.Get(ctx, owner, repo, prNum)
	if err != nil {
		fmt.Printf("Error fetching PR for %s: %v\n", repo, err)
		return
	}

	ch <- PRStatus{
		Repo:   repo,
		Number: prNum,
		State:  *pr.State,
		Merged: *pr.Merged,
	}
}

func main() {
	ctx := context.Background()
	
	// Create GitHub OAuth client
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: "your_github_token_here"},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	repos := []string{"auth-service", "payment-service", "notification-service"}
	prNumbers := map[string]int{
		"auth-service":         102,
		"payment-service":      45,
		"notification-service": 289,
	}

	var wg sync.WaitGroup
	ch := make(chan PRStatus, len(repos))

	for _, repo := range repos {
		wg.Add(1)
		go checkPRStatus(ctx, client, "my-org", repo, prNumbers[repo], ch, &wg)
	}

	// Wait and close channel in background
	go func() {
		wg.Wait()
		close(ch)
	}()

	for status := range ch {
		fmt.Printf("Repo: %s | PR #%d | State: %s | Merged: %t\n", 
			status.Repo, status.Number, status.State, status.Merged)
	}
}
\`\`\`

### Automated PR and Branching Strategy

Our internal Go tool does more than just query statuses:
1. It cuts a new branch \`release/vX.Y.Z\` on target repositories.
2. It programmatically modifies YAML configurations (e.g. updating version variables).
3. It commits the changes and pushes them back to GitHub.
4. It creates a Pull Request targeted at the \`main\` branch.
5. It monitors the status of GitHub Actions workflows for that PR.
6. Once green, it auto-merges the PR.

This complete loop has cut down release coordination time from **4 hours to 5 minutes**, proving the power of Go-based API automation.
    `
  },
  {
    id: "post3",
    title: "Design Principles for High-Availability Spring Boot Microservices",
    excerpt: "Exploring key strategies for building resilient enterprise backend architectures: circuit breakers, caching with Redis, optimistic locking in Hibernate, and database connection pool tuning.",
    date: "Sep 20, 2025",
    readTime: "7 min read",
    tags: ["Spring Boot", "Microservices", "High Availability", "Architecture"],
    content: `
Building microservices is easy; building highly available, resilient microservices that handle network blips, database locks, and downstream failures gracefully is exceptionally hard.

In my years of experience developing enterprise banking and e-commerce APIs, I've compiled a set of vital design patterns and configuration details that differentiate a fragile system from a high-availability one.

### 1. Resiliency with Circuit Breakers (Resilience4j)

A microservice should never wait indefinitely for an unresponsive downstream dependency. This triggers thread pile-up and causes cascading failures across the system.

Instead, implement the **Circuit Breaker Pattern**. If a service experiences failures above a certain threshold (e.g., 50% failures in a sliding window), the circuit opens, and subsequent requests fail fast immediately, routing to a fallback method.

\`\`\`yaml
resilience4j.circuitbreaker:
  instances:
    downstreamService:
      slidingWindowType: COUNT_BASED
      slidingWindowSize: 10
      minimumNumberOfCalls: 5
      failureRateThreshold: 50
      waitDurationInOpenState: 10s
      permittedNumberOfCallsInHalfOpenState: 3
\`\`\`

And in your Java code:

\`\`\`java
@Service
public class PaymentService {

    @Autowired
    private PaymentClient paymentClient;

    @CircuitBreaker(name = "downstreamService", fallbackMethod = "fallbackProcessPayment")
    public PaymentResponse process(PaymentRequest request) {
        return paymentClient.execute(request);
    }

    public PaymentResponse fallbackProcessPayment(PaymentRequest request, Throwable t) {
        // Log downstream error and return a cached response or queued status
        return new PaymentResponse("QUEUED", "System is temporarily busy. Your transaction will process shortly.");
    }
}
\`\`\`

### 2. Tuning Database Connection Pools (HikariCP)

One of the most frequent root causes of microservice failure is database connection pool starvation. By default, Spring Boot uses **HikariCP** with a maximum pool size of 10. Under high load, this leads to \`Connection is not available, request timed out\` errors.

Key tuning directives for production workloads:
* **Maximum Pool Size**: Calculate based on the formula: \`connections = ((core_count * 2) + effective_spindle_count)\`. Do not blindly set this to 100+, as too many active connections increase context-switching overhead on the DB side.
* **Minimum Idle**: Keep this close to the maximum pool size to prevent the cost of establishing new connections during a sudden traffic spike.
* **Connection Timeout**: Set this aggressively (e.g., 2500ms). If a service can't get a connection in 2.5 seconds, it's better to fail fast rather than block worker threads.

\`\`\`properties
spring.datasource.hikari.maximum-pool-size=25
spring.datasource.hikari.minimum-idle=15
spring.datasource.hikari.connection-timeout=2500
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.max-lifetime=1800000
\`\`\`

### 3. Caching & Stale-While-Revalidate

In high-read scenarios (such as fetching stock indices or catalogs), hit the database as little as possible. Implement a multi-level cache strategy:
1. **In-Memory Cache (Caffeine)**: Extremely fast, perfect for high-frequency static data.
2. **Distributed Cache (Redis)**: Shared cache for scaling across multiple pods.
3. **Stale-While-Revalidate**: Return the cached (possibly stale) data immediately to the caller, while sending a background task to fetch the fresh database record and update the cache. This keeps latency near-zero.
    `
  }
];
