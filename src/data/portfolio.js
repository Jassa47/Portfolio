export const personalInfo = {
  name: "Akaaljot Singh Mathoda",
  initials: "AM",
  title: "Full-Stack Developer & AI Enthusiast",
  tagline: "Building things at the intersection of AI and full-stack engineering",
  location: "Vancouver, BC",
  phone: "778-926-7116",
  email: "asm40@sfu.ca",
  linkedin: "https://www.linkedin.com/in/akaaljot-singh-mathoda-703b04253/",
  github: "https://github.com/Jassa47",
  linkedinDisplay: "linkedin.com/in/akaaljotmathoda",
  githubDisplay: "github.com/akaaljotmathoda",
};

export const about = {
  paragraphs: [
    "I'm a Computing Science student at Simon Fraser University with a concentration in Artificial Intelligence. I build full-stack applications, deep learning systems, and everything in between.",
    "When I'm not shipping code, I'm exploring the latest in distributed systems, cloud architecture, and making machines smarter.",
  ],
};

export const techStack = {
  languages: [
    { name: "Java", icon: "☕" },
    { name: "Python", icon: "🐍" },
    { name: "JavaScript", icon: "JS" },
    { name: "TypeScript", icon: "TS" },
    { name: "Kotlin", icon: "K" },
    { name: "SQL", icon: "DB" },
    { name: "C/C++", icon: "C" },
    { name: "HTML/CSS", icon: "</>" },
  ],
  frameworks: [
    { name: "React.js", icon: "⚛" },
    { name: "Next.js", icon: "N" },
    { name: "Node.js", icon: "⬢" },
    { name: "Express.js", icon: "Ex" },
    { name: "Spring Boot", icon: "🍃" },
    { name: "Tailwind CSS", icon: "🎨" },
  ],
  tools: [
    { name: "Git", icon: "⎇" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁" },
    { name: "Firebase", icon: "🔥" },
    { name: "Kubernetes", icon: "⎈" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Postman", icon: "📬" },
  ],
};

export const projects = [
  {
    title: "StudySage",
    subtitle: "Android App",
    description:
      "Production-scale Android app with MVVM + Clean Architecture, 30+ Jetpack Compose screens, WebSocket real-time multiplayer with <50ms latency, and Firebase Auth/Firestore integration.",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "WebSocket"],
    github: "https://github.com/Jassa47/StudySage",
    live: "https://studysage.vercel.app/",
    featured: true,
    color: "purple",
    stats: { screens: "30+", latency: "<50ms", threads: "90" },
  },
  {
    title: "DermaScan AI",
    subtitle: "Deep Learning",
    description:
      "Skin lesion classification system using PyTorch on 500+ images. Achieved 90%+ accuracy through hyperparameter tuning. Deployed on AWS EC2 with S3 and containerized with Docker.",
    tech: ["Python", "PyTorch", "AWS", "Docker"],
    github: null,
    live: null,
    featured: true,
    color: "blue",
    stats: { accuracy: "90%+", images: "500+", improvement: "20%" },
  },
  {
    title: "StudySage Website",
    subtitle: "Web App",
    description:
      "Production-grade Next.js + React web application with REST API integration, optimized dynamic rendering improving performance by 30%, and Git-based CI/CD pipeline.",
    tech: ["React.js", "Next.js", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/Jassa47/StudySage-Website",
    live: "https://studysage.vercel.app/",
    featured: false,
    color: "teal",
    stats: { performance: "+30%", apis: "REST", deploy: "Vercel" },
  },
  {
    title: "RizzervIT",
    subtitle: "Booking Platform",
    description:
      "Java full-stack event booking system with MVC architecture, 20+ RESTful API endpoints, 10+ JUnit test cases reducing regression defects by 25%. Built with Agile sprints.",
    tech: ["Java", "Spring Boot", "SQL", "REST APIs"],
    github: "https://github.com/Jassa47/rizzervit",
    live: null,
    featured: false,
    color: "coral",
    stats: { endpoints: "20+", tests: "10+", defects: "-25%" },
  },
];

export const experience = [
  {
    role: "Software Development Intern",
    company: "Golden Globe Education & Migration Consultants",
    location: "Mohali, India",
    period: "May 2024 — July 2024",
    bullets: [
      "Developed 5+ user-facing features using HTML, CSS, and JavaScript",
      "Refactored codebase reducing page load time by ~20% and improving scalability",
      "Integrated REST APIs for dynamic data flow between frontend and backend",
      "Authored unit tests to validate feature correctness and workflow reliability",
    ],
  },
];

export const education = {
  school: "Simon Fraser University",
  location: "Burnaby, BC",
  degree: "Bachelor of Applied Science, Computing Science",
  minor: "Minor in Statistics",
  concentration: "Artificial Intelligence and Information Systems",
  expectedGrad: "Dec 2027",
  gpa: "3.46",
  honors: "Dean's Honour Roll (Twice)",
  coursework: [
    "Data Structures & Algorithms",
    "Software Engineering",
    "OOP in Java",
    "Distributed Systems",
    "Cloud Computing",
  ],
};

export const certifications = [
  {
    title: "Docker for Absolute Beginners",
    issuer: "KodeKloud",
    year: "2026",
    description: "Hands-on experience with Docker images, containers, volumes, and networking",
  },
];

export const stats = [
  { label: "Projects Built", value: 4, suffix: "+" },
  { label: "CGPA", value: 3.46, suffix: "", decimals: 2 },
  { label: "Dean's List", value: 2, suffix: "×" },
  { label: "API Endpoints", value: 20, suffix: "+" },
];