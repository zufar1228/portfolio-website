export const profile = {
  name: "Muhammad Zufar Natsir",
  shortName: "Zufar Natsir",
  role: "Full-stack developer",
  company: "Telkomsat",
  location: "Bogor, Indonesia",
  headline: "I build the software between sensors and the people who rely on them.",
  intro:
    "I'm a full-stack developer in the product development division at Telkomsat. Before that, I built IoT backends and monitoring dashboards for warehouses, rivers and defense-industry assets.",
  resumeUrl:
    "https://drive.google.com/file/d/1EiKF9yDO-15LhYgtCDrvP2GK1XEXdSOH/view?usp=sharing",
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/**
 * Water-level readings traced from the SiCita demo dashboard
 * (Ciliwung river sensor, Depok). Values are normalised 0–1;
 * the last value is the reading shown on the dashboard.
 */
export const heroTrace = {
  values: [
    0.167, 0.089, 0.06, 0.107, 0.185, 0.214, 0.226, 0.232, 0.238, 0.244, 0.244, 0.214, 0.173, 0.143, 0.131, 0.125,
    0.125, 0.137, 0.143, 0.119, 0.048, 0.0, 0.065, 0.155, 0.185, 0.196, 0.202, 0.19, 0.137, 0.089, 0.06, 0.048,
    0.042, 0.054, 0.077, 0.095, 0.107, 0.125, 0.155, 0.196, 0.214, 0.214, 0.208, 0.196, 0.155, 0.107, 0.095, 0.089,
    0.083, 0.065, 0.03, 0.018, 0.077, 0.161, 0.167, 0.143, 0.113, 0.089, 0.077, 0.065, 0.065, 0.071, 0.077, 0.077,
    0.083, 0.095, 0.125, 0.149, 0.149, 0.143, 0.143, 0.149, 0.155, 0.167, 0.185, 0.196, 0.214, 0.238, 0.25, 0.25,
    0.25, 0.25, 0.268, 0.298, 0.357, 0.458, 0.506, 0.476, 0.411, 0.381, 0.381, 0.381, 0.369, 0.31, 0.262, 0.274,
    0.351, 0.381, 0.369, 0.345, 0.339, 0.399, 0.458, 0.464, 0.452, 0.446, 0.452, 0.458, 0.464, 0.47, 0.47, 0.482,
    0.548, 0.589, 0.595, 0.595, 0.601, 0.607, 0.625, 0.643, 0.673, 0.702, 0.726, 0.75, 0.762, 0.732, 0.649, 0.607,
    0.625, 0.643, 0.643, 0.601, 0.565, 0.631, 0.804, 0.905, 0.917, 0.923, 0.917, 0.839, 0.75, 0.756, 0.827, 0.887,
    0.881, 0.863, 0.845, 0.833, 0.827, 0.839, 0.875, 0.911, 0.911, 0.905, 0.893, 0.929, 0.982, 0.994, 0.935, 0.804,
  ],
  reading: "147.6 cm",
  caption: "Water level at the Ciliwung river sensor in Depok, from the SiCita demo dashboard.",
};

export type ProjectImage = {
  light: string;
  dark?: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  context: string;
  summary: string;
  contribution: string;
  stack: string[];
  image?: ProjectImage;
  diagram?: "bff";
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "warehouse",
    title: "Smart warehouse monitoring",
    context: "PT Synergy Dua Kawan Sejati, 2025",
    summary:
      "A real-time dashboard for warehouse security and conditions. It collects door-intrusion events, alarms and sensor readings from 4 IoT nodes and 8 sensor points over MQTT.",
    contribution:
      "Built the server-side MQTT data flow and about 80% of the dashboard frontend, in a team of four. The pipeline ran with no downtime through testing.",
    stack: ["Next.js", "Express.js", "PostgreSQL", "MQTT"],
    image: {
      light: "/dashboard-warehouse-light.png",
      dark: "/dashboard-warehouse-dark.png",
      width: 2834,
      height: 1618,
      alt: "Warehouse dashboard showing door security status, alarm counts and an event log for the Tangerang warehouse.",
    },
    links: [
      { label: "Open live demo", href: "https://synergyiot.ninja/demo" },
      { label: "Frontend code", href: "https://github.com/zufar1228/synergy-frontend" },
      { label: "Backend code", href: "https://github.com/zufar1228/synergy-backend" },
    ],
  },
  {
    id: "river",
    title: "River monitoring and early warning",
    context: "With PT Toyo Sensing Indonesia",
    summary:
      "SiCita tracks water level, temperature and water quality from river sensors every five minutes, and sends a warning when a reading goes outside its normal range.",
    contribution:
      "Full-stack developer in a cross-division team: sensor data ingestion, the API and the monitoring dashboard.",
    stack: ["Next.js", "Express.js", "PostgreSQL", "IoT sensors"],
    image: {
      light: "/dashboard-river-light.png",
      dark: "/dashboard-river-dark.png",
      width: 2813,
      height: 1589,
      alt: "SiCita dashboard for the Ciliwung river sensor in Depok, showing water level, temperature, rainfall, TDS and turbidity with a water-level chart.",
    },
    links: [
      { label: "Open live demo", href: "https://sicita-frontend.vercel.app" },
      { label: "Frontend code", href: "https://github.com/zufar1228/sicita-frontend" },
      { label: "Backend code", href: "https://github.com/zufar1228/sicita-backend" },
    ],
  },
  {
    id: "asset-bff",
    title: "Industrial asset monitoring API",
    context: "PT Len Industri (Persero), 2025",
    summary:
      "A backend-for-frontend API that sits between a mobile asset-monitoring app and the systems of five state-owned defense companies: PT Len, PINDAD, DI, DAHANA and PAL.",
    contribution:
      "Worked on real-time GPS trip tracking over Socket.IO, geofence alerts, asset usage timers and multi-tenant login. Deployed with Docker and PM2, documented with Swagger.",
    stack: ["Express.js", "TypeScript", "PostgreSQL", "TypeORM", "Socket.IO", "Docker"],
    diagram: "bff",
    links: [],
  },
];

export const earlierWork = [
  {
    title: "SmartWash",
    summary:
      "A laundry management app for a small business: order intake, status tracking and customer records.",
    stack: "CodeIgniter 3, PHP, MySQL",
    link: { label: "Source code", href: "https://github.com/zufarnatsir/SmartWash" },
  },
];

export type Experience = {
  period: string;
  role: string;
  org: string;
  description?: string;
};

export const experiences: Experience[] = [
  {
    period: "2026 – now",
    role: "Full-stack developer",
    org: "Telkomsat, product development division",
  },
  {
    period: "Aug – Dec 2025",
    role: "IoT intern",
    org: "PT Synergy Dua Kawan Sejati",
    description:
      "Built IoT backend infrastructure with a dynamic database schema, ran the real-time MQTT data flow and led the Next.js dashboard work.",
  },
  {
    period: "Feb – Jun 2025",
    role: "Software and IoT engineer intern",
    org: "PT Len Industri (Persero)",
    description:
      "Built parts of a BFF API in Express and TypeScript for a mobile asset-monitoring app used by five defense companies: GPS trip tracking, geofence alerts and multi-tenant authentication.",
  },
  {
    period: "2022 – 2026",
    role: "D4 Applied Computer Engineering Technology",
    org: "IPB University, Vocational School",
    description:
      "Embedded systems, web application development and sensor-based automation.",
  },
];

export const tools =
  "TypeScript, Next.js, React, Express.js, PostgreSQL, MQTT, Socket.IO, Docker, Linux, AWS and Git.";

export const contactInfo = {
  email: "zufarntsr@gmail.com",
  phone: "+62 812 1174 3607",
  phoneHref: "tel:+6281211743607",
  location: "Bogor, Indonesia",
  linkedin: "https://www.linkedin.com/in/muhammad-zufar-natsir-0b1353341",
  github: "https://github.com/zufar1228",
};
