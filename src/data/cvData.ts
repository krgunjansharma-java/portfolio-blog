export interface Project {
  name: string;
  client?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  projects?: Project[];
  highlights?: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CVData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    location: string;
  };
  summary: string;
  skillCategories: SkillCategory[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  achievements: string[];
}

export const initialCVData: CVData = {
  name: "GUNJAN KUMAR SHARMA",
  title: "Senior Java Developer | Spring Boot Microservices | Reactive Systems (Vert.x) | Go Lang Automation",
  contact: {
    phone: "+91-8218443568",
    email: "kr.gunjansharma@gmail.com",
    linkedin: "linkedin.com/in/gunjan-sharma-696254130",
    location: "Pune, Maharashtra",
  },
  summary: "Performance-driven Senior Java Developer and Infosys Certified Microservice Design Professional with nearly 7 years of experience designing, building, and migrating scalable enterprise applications. Recognized expert in Spring Boot microservices, reactive programming with Vert.x, and modern backend automation using Golang. Proven success executing high-impact legacy system migrations for financial services clients and creating automated CI/CD tooling to streamline developer workflows.",
  skillCategories: [
    {
      category: "Languages & Frameworks",
      skills: ["Java 8", "Go Lang (Golang)", "Spring Boot", "Vert.x (Reactive)", "REST API", "SOAP API", "Angular", "HTML/CSS"]
    },
    {
      category: "Architectural Competencies",
      skills: ["Microservices Architecture", "Systems Migration", "High-Availability Systems", "API Management"]
    },
    {
      category: "Databases & ORM",
      skills: ["MySQL", "Oracle SQL", "Hibernate/JPA"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["Azure Cloud", "CI/CD Pipelines (Jenkins, GitHub Actions)", "GitHub API Automation", "GitHub", "GitLab"]
    },
    {
      category: "Development Tools",
      skills: ["IntelliJ IDEA", "STS", "Eclipse", "VS Code", "Postman", "Swagger", "MySQL Workbench", "Jira"]
    },
    {
      category: "Build Tools",
      skills: ["Maven", "Gradle"]
    }
  ],
  experience: [
    {
      id: "exp1",
      role: "Senior Software Engineer",
      company: "Infosys Ltd.",
      location: "Pune, MH",
      startDate: "Aug 2025",
      endDate: "Present",
      projects: [
        {
          name: "Splunk to ELF Migration",
          client: "American Express",
          description: "Seamless enterprise logging system migration using Java 8 and Vert.x, designing reactive microservices for log ingestion, data transformation, and intelligent routing.",
          highlights: [
            "Developed, optimized, and supported highly scalable Java and Spring Boot microservices backends, ensuring high availability and system performance.",
            "Engineered a seamless enterprise logging system migration using Java 8 and Vert.x, designing reactive microservices for log ingestion, data transformation, and intelligent routing.",
            "Served as an Individual Contributor on a custom API publishing automation tool built with Golang, programmatically integrating with the GitHub API to streamline release workflows across multiple repositories.",
            "Automated developer CI/CD workflows by implementing programmatic code pushes, dynamic Pull Request (PR) generation, and automated tracking of open, closed, and merged PR statuses.",
            "Maintained code bases in client GitHub repositories and implemented automated deployments via optimized CI/CD pipelines."
          ],
          technologies: ["Java 8", "Spring Boot", "Vert.x", "Go Lang", "GitHub API", "Microservices", "REST APIs", "GitHub", "CI/CD Pipelines (Jenkins/GitHub Actions)"]
        }
      ],
      technologies: ["Java 8", "Spring Boot", "Vert.x", "Go Lang", "GitHub API", "Microservices", "REST APIs", "GitHub", "CI/CD Pipelines (Jenkins/GitHub Actions)"]
    },
    {
      id: "exp2",
      role: "Lead Engineer",
      company: "HCL Technologies Ltd.",
      location: "Noida, UP",
      startDate: "Nov 2022",
      endDate: "Aug 2025",
      highlights: [
        "Led Java/Spring Boot backend development and tier-3 support for critical client-facing web applications.",
        "Built dynamic Angular front-ends integrated seamlessly with RESTful Spring Boot APIs (Java 8) and MySQL/Azure Cloud environments using Hibernate/JPA.",
        "Delivered high-priority production support for critical incidents, minimizing system downtime and ensuring strict SLA adherence."
      ],
      technologies: ["Java 8", "Spring Boot", "REST API", "Swagger", "MySQL", "Angular", "HTML/CSS", "Azure Cloud", "Hibernate/JPA"]
    },
    {
      id: "exp3",
      role: "Junior Software Engineer",
      company: "Cognizant Technology Solutions",
      location: "Bangalore, KA",
      startDate: "Nov 2021",
      endDate: "Oct 2022",
      highlights: [
        "Implemented enterprise stock and share history export functionality supporting PDF, Excel, Word, and text formats.",
        "Developed Angular front-end modules integrated with RESTful Spring Boot APIs (Java 8) and Oracle SQL using Hibernate/JPA.",
        "Managed end-to-end software development lifecycle activities including requirements analysis, backend development, and testing."
      ],
      technologies: ["Java 8", "Spring Boot", "Oracle Database", "Angular", "Hibernate/JPA", "Jira", "Eclipse"]
    },
    {
      id: "exp4",
      role: "Junior Software Engineer",
      company: "Capgemini Technology Services",
      location: "Kolkata, WB",
      startDate: "Jul 2019",
      endDate: "Oct 2021",
      highlights: [
        "Designed, developed, and unit-tested Core Java components, Angular web pages, and secure REST/SOAP services.",
        "Maintained codebase baselines in GitLab and managed modular deployments inside a fast-paced DevOps workflow.",
        "Collaborated effectively within an Agile environment using Jira for sprint planning, task tracking, and defect management."
      ],
      technologies: ["Java 8", "Spring Boot", "Angular", "MySQL", "REST API", "SOAP API", "Jira", "Eclipse", "GitLab"]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      school: "Roorkee College of Engineering",
      location: "Roorkee, Uttarakhand",
      startDate: "Aug 2014",
      endDate: "Aug 2018"
    },
    {
      degree: "Higher Secondary (Class XII)",
      school: "Bihar School of Examination Board",
      location: "Patna, Bihar",
      startDate: "Apr 2011",
      endDate: "May 2013"
    },
    {
      degree: "Secondary (Class X)",
      school: "Bihar School of Examination Board",
      location: "Patna, Bihar",
      startDate: "Apr 2010",
      endDate: "May 2011"
    }
  ],
  certifications: [
    "Certification: Infosys Certified Microservice Design Professional"
  ],
  achievements: [
    "1st Prize, Coding Competition, Capgemini campus (2020)",
    "2nd Prize, Code Debugging (college)",
    "3rd Prize, Algorithm Design (college)"
  ]
};
