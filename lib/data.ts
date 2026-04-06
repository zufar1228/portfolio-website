export const navItems = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroContent = {
  greeting: "Hello, I'm",
  name: "Muhammad Zufar Natsir",
  title: "Software & IoT Developer",
  description:
    "I build backend systems and IoT solutions that turn real-world sensor data into actionable insights — from warehouse monitoring to geolocation asset tracking.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Download Resume", href: "https://drive.google.com/file/d/1EiKF9yDO-15LhYgtCDrvP2GK1XEXdSOH/view?usp=sharing" },
};

export type Skill = {
  name: string;
  logo?: string;
  darkInvert?: boolean;
};

export const skillCategories: {
  icon: string;
  title: string;
  skills: Skill[];
}[] = [
  {
    icon: "Database",
    title: "Backend & Database",
    skills: [
      { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", darkInvert: true },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "RESTful API" },
      { name: "Client-Server Architecture" },
    ],
  },
  {
    icon: "Monitor",
    title: "Frontend",
    skills: [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", darkInvert: true },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    icon: "Cpu",
    title: "IoT & Protocols",
    skills: [
      { name: "MQTT", logo: "https://cdn.simpleicons.org/mqtt" },
      { name: "GPS/GIS Integration" },
      { name: "Embedded Systems" },
    ],
  },
  {
    icon: "Cloud",
    title: "Cloud & Tools",
    skills: [
      { name: "AWS Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "Postman", logo: "https://cdn.simpleicons.org/postman" },
    ],
  },
];

export const projects = [
  {
    title: "Smart Warehouse IoT Dashboard",
    description:
      "Built a real-time monitoring dashboard for smart warehouse operations, processing data from 4 IoT node systems and 8 sensor points using the MQTT protocol. Managed server-side data flow maintaining zero downtime during testing. Led development of over 80% of frontend dashboard features in a cross-functional team of 4 members.",
    highlights: [
      "Processed real-time data from 4 IoT nodes and 8 sensor points",
      "Zero downtime during testing with MQTT data pipeline",
      "Led 80%+ frontend dashboard development",
      "Cross-functional team of 4 members",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL", "MQTT"],
    image: "/dashboard-warehouse.png",
    sourceUrl: "https://github.com/zufar1228/synergy-frontend",
    backendUrl: "https://github.com/zufar1228/synergy-backend",
  },
  {
    title: "Geolocation Asset Tracking System",
    description:
      "Designed backend architecture using Express.js and PostgreSQL to process asset management data distributed across 6 different company locations during the prototype phase. Developed a backend logic framework for spatial data processing (GIS/GPS), laying the foundation for a centralized asset tracking system responding to real-time coordinate point requests.",
    highlights: [
      "Backend architecture for 6 distributed company locations",
      "Spatial data processing framework (GIS/GPS)",
      "Real-time coordinate point request handling",
      "Centralized asset tracking foundation",
    ],
    tags: ["Express.js", "PostgreSQL", "GIS/GPS", "RESTful API"],
    image: "/dashboard-geo.png",
  },
  {
    title: "River Monitoring & Early Warning System",
    description:
      "Served as the sole full-stack developer in a cross-divisional collaboration with PT Toyo Sensing Indonesia. Built a real-time river condition monitoring system processing IoT sensor data streams at 5-minute intervals — tracking water quality, temperature, and water level. The system delivers automated warning notifications when readings exceed safe thresholds. Planned for future enhancement with ML-based sedimentation prediction.",
    highlights: [
      "Real-time monitoring of water quality, temperature & water level",
      "Automated warning notifications for abnormal conditions",
      "IoT sensor data streams processed at 5-minute intervals",
      "Future roadmap: ML-based sedimentation prediction",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL", "IoT"],
    image: "/dashboard-river.png",
    sourceUrl: "https://github.com/zufar1228/sicita-frontend",
    backendUrl: "https://github.com/zufar1228/sicita-backend",
  },
  {
    title: "Laundry Management App",
    description:
      "Built an MVP laundry management web application to handle core business operations. Features include order registration, status tracking, and customer data management — designed as a practical solution for small laundry businesses.",
    highlights: [
      "MVP-focused feature set for quick deployment",
      "Order registration and status tracking",
      "Customer data management",
      "Built with CodeIgniter 3 and MySQL",
    ],
    tags: ["CodeIgniter 3", "MySQL", "PHP", "Bootstrap"],
    image: "/dashboard-laundry.png",
    sourceUrl: "https://github.com/zufarnatsir/SmartWash",
  },
];

export const experiences = [
  {
    period: "Aug 2025 — Dec 2025",
    role: "IoT Intern",
    company: "PT Synergy Dua Kawan Sejati",
    description:
      "Built scalable IoT backend infrastructure with dynamic database schema. Managed real-time MQTT data flow and led frontend dashboard development using Next.js.",
    metrics: [
      { value: "4", label: "IoT Nodes" },
      { value: "8", label: "Sensors" },
      { value: "0", label: "Downtime" },
    ],
  },
  {
    period: "Feb 2025 — Jun 2025",
    role: "Software & IoT Engineer Intern",
    company: "PT Len Industri (Persero)",
    description:
      "Designed backend architecture (RESTful API) using Express.js and PostgreSQL for centralized asset tracking with spatial data processing (GIS/GPS).",
    metrics: [
      { value: "6", label: "Locations" },
      { value: "REST", label: "API Design" },
      { value: "GIS", label: "Integration" },
    ],
  },
  {
    period: "Aug 2022 — Jun 2026 (Expected)",
    role: "Bachelor of Applied Computer Engineering Technology (D4)",
    company: "IPB University — Vocational School",
    description:
      "Focused on embedded systems, web application development, and sensor-based automation. Built practical skills in real-time data processing, IoT protocols, and full-stack engineering.",
  },
];

export const contactInfo = {
  email: "zufarnatsir@apps.ipb.ac.id",
  phone: "+62 812 1174 3607",
  location: "Jakarta, Indonesia",
  linkedin: "https://www.linkedin.com/in/muhammad-zufar-natsir-0b1353341",
  github: "https://github.com/zufar1228",
};

export const footerContent = {
  text: "Designed & Built by Muhammad Zufar Natsir",
  year: "© 2026",
};
