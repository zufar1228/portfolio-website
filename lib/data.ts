export const navItems = [
  { label: "About", href: "#about" },
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
    "Final-year Computer Engineering student at IPB University, building reliable backend systems and IoT solutions that turn real-world data into actionable insights.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Get In Touch", href: "#contact" },
};

export const aboutContent = {
  sectionLabel: "About",
  heading: "A bit about me",
  bio: "I'm a final-year student in the Computer Engineering Technology program at the Vocational School of IPB University. I specialize in backend development and IoT systems, with hands-on experience building real-time monitoring dashboards, RESTful APIs for geolocation-based asset tracking, and scalable IoT data pipelines. I enjoy working in cross-functional teams and turning complex technical problems into clean, reliable solutions.",
  stats: [
    { value: "2+", label: "Years of Experience" },
    { value: "5+", label: "Projects Completed" },
    { value: "3.71", label: "GPA" },
  ],
};

export const skillCategories = [
  {
    icon: "Database",
    title: "Backend & Database",
    skills: ["Express.js", "PostgreSQL", "RESTful API", "Client-Server Architecture"],
  },
  {
    icon: "Monitor",
    title: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    icon: "Cpu",
    title: "IoT & Protocols",
    skills: ["MQTT", "GPS/GIS Integration", "Embedded Systems"],
  },
  {
    icon: "Cloud",
    title: "Cloud & Tools",
    skills: ["AWS Cloud", "Git"],
  },
];

export const projects = [
  {
    title: "Smart Warehouse IoT Dashboard",
    description:
      "Built a real-time monitoring dashboard for smart warehouse operations, processing data from 4 IoT node systems and 8 sensor points using the MQTT protocol. Managed server-side data flow maintaining zero downtime during testing. Led development of over 80% of frontend dashboard features in a cross-functional team of 4 members.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "MQTT"],
    image: "/images/project-1.svg",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Geolocation Asset Tracking System",
    description:
      "Designed backend architecture using Express.js and PostgreSQL to process asset management data distributed across 6 different company locations during the prototype phase. Developed a backend logic framework for spatial data processing (GIS/GPS), laying the foundation for a centralized asset tracking system responding to real-time coordinate point requests.",
    tags: ["Express.js", "PostgreSQL", "GIS/GPS", "RESTful API"],
    image: "/images/project-2.svg",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Flood Detection & Sedimentation Prediction",
    description:
      "Served as the sole full-stack developer in a cross-divisional collaboration with PT Toyo Sensing Indonesia. Built a complete system processing IoT sensor data streams at 5-minute intervals for real-time flood detection and sedimentation prediction. Handled end-to-end development from database design to frontend visualization.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "IoT Sensors"],
    image: "/images/project-3.svg",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Laundry Business Management App",
    description:
      "Developed a comprehensive web application prototype to digitize and optimize the operational management of a laundry business. Features include order tracking, customer management, and operational workflow automation.",
    tags: ["Web Application", "Full-Stack"],
    image: "/images/project-4.svg",
    liveUrl: "#",
    sourceUrl: "#",
  },
];

export const experiences = [
  {
    period: "Feb 2025 — Jun 2025",
    role: "Software & IoT Engineer Intern",
    company: "PT Len Industri (Persero)",
    description:
      "Designed backend architecture (RESTful API) using Express.js and PostgreSQL to process asset management data across 6 company locations. Developed spatial data processing framework (GIS/GPS) for centralized asset tracking.",
  },
  {
    period: "Aug 2025 — Dec 2025",
    role: "IoT Intern",
    company: "PT Synergy Dua Kawan Sejati",
    description:
      "Built backend infrastructure with dynamic database schema for scalable IoT device management. Managed MQTT data flow from 4 IoT nodes and 8 sensor points with zero downtime. Led 80%+ of frontend dashboard development using Next.js.",
  },
  {
    period: "Aug 2022 — Jun 2026 (Expected)",
    role: "Bachelor of Applied Computer Engineering Technology (D4)",
    company: "IPB University — Vocational School",
    description:
      "GPA: 3.71/4.00. Active in embedded system, web application, and sensor-based automation projects. Contributed to Soltarine UV energy charging device development.",
  },
];

export const contactInfo = {
  email: "zufarnatsir@apps.ipb.ac.id",
  phone: "+62 812 1174 3607",
  location: "Jakarta, Indonesia",
  linkedin: "https://www.linkedin.com/in/muhammad-zufar-natsir-0b1353341",
  github: "#",
};

export const footerContent = {
  text: "Designed & Built by Muhammad Zufar Natsir",
  year: "© 2026",
};
