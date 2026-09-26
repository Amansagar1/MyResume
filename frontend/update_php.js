const fs = require('fs');

const phpPath = 'd:/resume/backend/api/resume.php';
let phpContent = fs.readFileSync(phpPath, 'utf8');

const replacementProjects = `    "projects" => [
        [
            "title" => "AI-Powered Smart Campaign & Mail Queue Engine",
            "description" => "A full-stack automation platform featuring a Next.js UI and an asynchronous Python/Flask backend integrated with LLM APIs for automated content customization.",
            "highlights" => [
                "Engineered a full-stack automation platform featuring a Next.js UI and an asynchronous Python/Flask backend integrated with LLM APIs for automated content customization.",
                "Implemented high-throughput Redis task queues and MongoDB to process distributed asynchronous dispatches without blocking the main event loop."
            ],
            "technologies" => ["Next.js", "Python", "Flask", "LLM APIs", "Redis", "MongoDB", "Async Queues"],
            "demo" => "https://aman-bulk-mailer.vercel.app/",
            "github" => "https://github.com/Amansagar1",
            "link" => "https://github.com/Amansagar1"
        ],
        [
            "title" => "Cloud-Native Automated CI/CD & AI Microservices Pipeline",
            "description" => "An enterprise-grade CI/CD pipeline using GitHub Actions, Docker, and AWS ECS to deploy containerized full-stack and AI service endpoints.",
            "highlights" => [
                "Built an enterprise-grade CI/CD pipeline using GitHub Actions, Docker, and AWS ECS to deploy containerized full-stack and AI service endpoints.",
                "Automated cloud infrastructure provisioning using modular Terraform configurations with fine-grained AWS IAM security policies."
            ],
            "technologies" => ["AWS ECS", "Docker", "GitHub Actions", "Terraform", "AWS IAM", "Microservices"],
            "github" => "https://github.com/Amansagar1",
            "link" => "https://github.com/Amansagar1"
        ],
        [
            "title" => "Apartment Facility Management",
            "description" => "A comprehensive apartment facility management dashboard and login portal.",
            "highlights" => [
                "Engineered a secure login portal and facility management system for apartment complexes.",
                "Implemented seamless user authentication and data access controls."
            ],
            "technologies" => ["React", "Next.js", "Authentication", "Tailwind CSS"],
            "demo" => "https://apartment-facility.vercel.app/login",
            "github" => "https://github.com/Amansagar1",
            "link" => "https://apartment-facility.vercel.app/login"
        ],
        [
            "title" => "Six Degrees of Tech",
            "description" => "An AI-powered technology graph and relationship mapping platform (Wexa AI Beryl).",
            "highlights" => [
                "Developed Wexa AI Beryl to map and visualize complex technology relationships.",
                "Integrated modern frontend architectures to deliver high-performance visual graphs."
            ],
            "technologies" => ["Next.js", "AI Integration", "React", "Tailwind CSS"],
            "demo" => "https://wexa-ai-beryl.vercel.app/",
            "github" => "https://github.com/Amansagar1",
            "link" => "https://wexa-ai-beryl.vercel.app/"
        ]
    ],`;

// The regex will match from '"projects" => [' up to the end of the projects array, right before '"skills" => ['.
phpContent = phpContent.replace(/"projects"\s*=>\s*\[[\s\S]*?\],\s*"skills"\s*=>/m, replacementProjects + '\n    "skills" =>');

fs.writeFileSync(phpPath, phpContent, 'utf8');
console.log("Updated projects in resume.php!");
