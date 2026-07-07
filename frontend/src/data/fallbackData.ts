import { ResumeData } from "../types/resume";

export const fallbackResumeData: ResumeData = {
  personal: {
    name: "K. Aman Sagar",
    title: "Full Stack Developer",
    subtitle: "Specializing in MERN, PHP & AI Integrations",
    summary: "Full Stack MERN Developer with approximately 3 years of experience building scalable web applications. Skilled in CRM systems, RBAC, AI integrations, performance optimization, and DevOps practices including Docker, CI/CD pipelines, cloud deployment, and environment management using React, Node.js, PHP and MongoDB.",
    email: "kumaramansagar01@gmail.com",
    phone: "+91 8434120273",
    location: "Bengaluru, Karnataka",
    github: "https://github.com/Amansagar1",
    githubUsername: "Amansagar1"
  },
  experience: [
    {
      company: "I2 Global Virtual Learning Private Limited",
      role: "Full Stack Developer",
      period: "2025-11 - Present",
      highlights: [
        "Designed and developed scalable CRM modules using Next.js, React, Node.js, and Python supporting multi-role workflows.",
        "Implemented RBAC (Role-Based Access Control) to manage secure access across admins, agents, and users.",
        "Integrated AI tools (Digipanda, Ganani AI, Bolna AI) to automate lead management and communication pipelines.",
        "Optimized REST APIs and database queries improving system performance and response time.",
        "Collaborated with DevOps using CI/CD (GitHub Actions, Docker) ensuring stable production deployments."
      ]
    },
    {
      company: "Digital-Sync Technologies & Services Pvt Ltd.",
      role: "Software Developer",
      period: "2024-02 - 2025-11",
      highlights: [
        "Developed microservices-based applications using Next.js and Node.js.",
        "Implemented JWT authentication and caching mechanisms improving performance and security.",
        "Built reusable components and improved scalability of Omni Edgemetio Platform by 25%."
      ]
    },
    {
      company: "Achintya Solution (InfotechBrains) Pvt. Ltd.",
      role: "Web Developer Intern",
      period: "2023-07 - 2024-02",
      highlights: [
        "Developed and maintained dynamic web applications using PHP, React.js, and Next.js.",
        "Built secure and scalable PHP backend modules for business applications.",
        "Developed CRUD operations, authentication, and role-based access control using PHP.",
        "Developed frontend applications using React and Next.js, and integrated REST APIs to improve UI performance.",
        "Built reusable components and resolved UI bugs efficiently."
      ]
    }
  ],
  projects: [
    {
      title: "CRM Admin & Franchise Dashboard",
      description: "A high-performance dashboard that supports advanced Admin and Franchise workflows, integrating RBAC and high-speed API data channels.",
      highlights: [
        "Developed scalable CRM dashboard supporting Admin and Franchise workflows.",
        "Implemented RBAC-based role management for secure and structured access control.",
        "Integrated frontend with backend APIs enabling real-time data handling.",
        "Built modular and reusable UI components improving maintainability and development speed.",
        "Developed core business logic and backend modules using PHP."
      ],
      technologies: ["PHP", "Next.js", "React.js", "REST APIs", "RBAC", "MySQL"],
      link: "https://github.com/Amansagar1"
    },
    {
      title: "Hotel Management & Booking System",
      description: "A full-stack online booking platform optimized for swift load times, security, and search engine discoverability.",
      highlights: [
        "Built a full-stack booking platform using Next.js, Node.js, and MongoDB (~1.8s load time).",
        "Implemented Google OAuth authentication and improved SEO rankings.",
        "Deployed using Nginx ensuring scalability and production reliability."
      ],
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Google OAuth", "Nginx"],
      link: "https://github.com/Amansagar1"
    },
    {
      title: "Water Management System",
      description: "An automated management console featuring dynamic telemetry charting and responsive frontend interfaces connected to robust PHP backend APIs.",
      highlights: [
        "Designed real-time dashboards and data visualization systems.",
        "Developed admin controls for monitoring and managing operations.",
        "Integrated frontend applications with PHP backend services using AJAX and JSON APIs.",
        "Developed responsive user interfaces using React.js, Next.js, HTML5, CSS3, JavaScript, and Tailwind CSS while consuming PHP APIs."
      ],
      technologies: ["PHP", "React.js", "Next.js", "Tailwind CSS", "AJAX", "JSON APIs", "MySQL"],
      link: "https://github.com/Amansagar1"
    }
  ],
  skills: {
    languages: ["PHP", "JavaScript (ES6+)", "Python", ".NET", "HTML5", "CSS3"],
    frontend: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Bootstrap"],
    backend: ["PHP", "Node.js", "Express.js", "FastAPI", "Python"],
    database: ["MongoDB", "MySQL"],
    tools: ["Git", "VS Code", "Jira", "Azure DevOps"],
    other: [
      "REST APIs", "JWT Authentication", "Microservices", "CI/CD", 
      "Docker", "Responsive UI Development", "CRM Development", 
      "RBAC (Role-Based Access Control)", "AI Integration (Digipanda, Ganani AI, Bolna AI)"
    ]
  },
  certifications: [
    "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    "Oracle Fusion AI Agent Studio Certified Foundations Associate - Rel 1",
    "React JS Certification",
    "Web Development Fundamentals Certification"
  ],
  education: [
    {
      institution: "Muslim Minority Degree College",
      degree: "Bachelor of Arts (BA)",
      details: "Degree Program"
    },
    {
      institution: "EdYoda Digital University",
      degree: "Full Stack MERN Developer Certification",
      details: "Scored 89%"
    }
  ]
};
