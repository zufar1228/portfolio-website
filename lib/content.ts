export type Lang = "en" | "id";

export const COPY = {
  en: {
    themeLight: "Dark",
    themeDark: "Light",
    nav: { services: "Services", work: "Work", experience: "Experience", toolkit: "Toolkit", contact: "Contact" },
    hero: {
      kicker: "Portfolio — 2026 edition",
      status: "Open to freelance",
      role: "Full-stack engineer — PT Telkom Satelit Indonesia",
      statement:
        "I write the software between field sensors and the people who have to act on them — MQTT pipelines, APIs, and the dashboards at the other end.",
      cta1: "See selected work",
      cta2: "Résumé (PDF)",
      figTag: "Illustration",
    },
    facts: [
      { label: "Based in", value: "Jakarta, Indonesia" },
      { label: "Studying", value: "D4 Computer Engineering Technology, IPB University — graduating Jun 2026" },
      { label: "Currently", value: "Full-Stack Engineer, PT Telkom Satelit Indonesia" },
      { label: "Open to", value: "Freelance projects alongside my full-time role" },
    ],
    services: {
      label: "Services",
      title: "Where I’m useful on a team.",
      items: [
        { n: "01", title: "Backend systems", body: "REST and BFF services in Express + TypeScript on PostgreSQL. Multi-tenant auth, Socket.IO for live data, shipped in Docker with Swagger docs." },
        { n: "02", title: "IoT data pipelines", body: "MQTT from device to database: ingesting node and sensor streams, keeping the flow up, and turning thresholds into alerts someone will see." },
        { n: "03", title: "Monitoring dashboards", body: "Next.js screens that operators use on shift — live readings, event logs, alarms, arm/disarm controls and CSV export." },
      ],
    },
    work: {
      label: "Selected work",
      title: "Four projects. Three of them talk to real hardware.",
      private: "Source private — client project.",
      compare: "Drag to compare light and dark themes",
      light: "Light",
      dark: "Dark",
    },
    exp: {
      label: "Experience",
      title: "Where I’ve worked and studied.",
      items: [
        { period: "Sep 2026 — Present", role: "Full-Stack Engineer", org: "PT Telkom Satelit Indonesia", body: "Current full-time role.", metrics: "" },
        { period: "Aug — Dec 2025", role: "IoT Intern", org: "PT Synergy Dua Kawan Sejati", body: "Built the IoT backend on a dynamic database schema, kept the MQTT data flow running, and led frontend development of the monitoring dashboard in Next.js.", metrics: "4 IoT nodes · 8 sensors · 0 downtime in testing" },
        { period: "Feb — Jun 2025", role: "Software & IoT Engineer Intern", org: "PT Len Industri (Persero)", body: "Part of the team building a BFF API (Express + TypeScript) for a mobile asset-monitoring app across five defense companies. Implemented GPS trip tracking, geofence alerts and multi-tenant auth.", metrics: "5 companies · Real-time GPS · BFF architecture" },
        { period: "Aug 2022 — Jun 2026", role: "D4 Applied Computer Engineering Technology", org: "IPB University — Vocational School", body: "Embedded systems, web application development and sensor-based automation. Graduation expected June 2026.", metrics: "" },
      ],
    },
    skills: {
      label: "Toolkit",
      title: "What I build with.",
      groups: [
        { title: "Backend & database", items: ["Express.js", "PostgreSQL", "RESTful APIs", "Client–server architecture"] },
        { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
        { title: "IoT & protocols", items: ["MQTT", "GPS / GIS integration", "Embedded systems"] },
        { title: "Cloud & tools", items: ["AWS", "Docker", "Git", "Linux", "Postman"] },
      ],
    },
    contact: {
      label: "Contact",
      title: "Got sensors, data, or a deadline? Let’s talk.",
      intro: "Need an API, an IoT data pipeline or a monitoring dashboard built on a freelance basis? Email is fastest. The form lands in the same inbox.",
      loc: "Based in",
      phone: "Phone",
    },
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      namePh: "Your name",
      emailPh: "you@company.com",
      messagePh: "What are you building, and where could I help?",
      send: "Send message",
      sending: "Sending…",
      sent: "Sent. I’ll get back to you soon.",
      failed: "Couldn’t send. Please email me directly.",
      errName: "Please enter at least 2 characters.",
      errEmail: "That email doesn’t look right.",
      errMessage: "A little more detail, please — 10 characters minimum.",
    },
    footer: { colophon: "Designed and built by me. Set in Archivo.", top: "Back to top" },
  },
  id: {
    themeLight: "Gelap",
    themeDark: "Terang",
    nav: { services: "Layanan", work: "Karya", experience: "Pengalaman", toolkit: "Tools", contact: "Kontak" },
    hero: {
      kicker: "Portofolio — edisi 2026",
      status: "Terbuka untuk freelance",
      role: "Full-stack engineer — PT Telkom Satelit Indonesia",
      statement:
        "Saya menulis perangkat lunak di antara sensor lapangan dan orang-orang yang harus bertindak atas datanya — pipeline MQTT, API, dan dashboard di ujungnya.",
      cta1: "Lihat karya pilihan",
      cta2: "Résumé (PDF)",
      figTag: "Ilustrasi",
    },
    facts: [
      { label: "Domisili", value: "Jakarta, Indonesia" },
      { label: "Pendidikan", value: "D4 Teknologi Rekayasa Komputer, IPB University — lulus Jun 2026" },
      { label: "Saat ini", value: "Full-Stack Engineer, PT Telkom Satelit Indonesia" },
      { label: "Terbuka untuk", value: "Proyek freelance di luar pekerjaan full-time" },
    ],
    services: {
      label: "Layanan",
      title: "Di mana saya berguna dalam tim.",
      items: [
        { n: "01", title: "Sistem backend", body: "Layanan REST dan BFF dengan Express + TypeScript di atas PostgreSQL. Auth multi-tenant, Socket.IO untuk data live, dikirim dengan Docker dan dokumentasi Swagger." },
        { n: "02", title: "Pipeline data IoT", body: "MQTT dari perangkat ke database: menerima aliran data node dan sensor, menjaga alurnya tetap hidup, dan mengubah ambang batas menjadi peringatan yang benar-benar terlihat." },
        { n: "03", title: "Dashboard monitoring", body: "Tampilan Next.js yang dipakai operator saat bertugas — pembacaan live, log kejadian, alarm, kontrol arm/disarm, dan ekspor CSV." },
      ],
    },
    work: {
      label: "Karya pilihan",
      title: "Empat proyek. Tiga di antaranya terhubung ke perangkat keras nyata.",
      private: "Kode privat — proyek klien.",
      compare: "Geser untuk membandingkan tema terang dan gelap",
      light: "Terang",
      dark: "Gelap",
    },
    exp: {
      label: "Pengalaman",
      title: "Tempat saya bekerja dan belajar.",
      items: [
        { period: "Sep 2026 — Sekarang", role: "Full-Stack Engineer", org: "PT Telkom Satelit Indonesia", body: "Posisi full-time saat ini.", metrics: "" },
        { period: "Agu — Des 2025", role: "IoT Intern", org: "PT Synergy Dua Kawan Sejati", body: "Membangun backend IoT dengan skema database dinamis, menjaga alur data MQTT tetap berjalan, dan memimpin pengembangan frontend dashboard monitoring dengan Next.js.", metrics: "4 node IoT · 8 sensor · 0 downtime saat pengujian" },
        { period: "Feb — Jun 2025", role: "Software & IoT Engineer Intern", org: "PT Len Industri (Persero)", body: "Bagian dari tim yang membangun BFF API (Express + TypeScript) untuk aplikasi mobile monitoring aset di lima perusahaan pertahanan. Mengerjakan pelacakan perjalanan GPS, peringatan geofence, dan auth multi-tenant.", metrics: "5 perusahaan · GPS real-time · Arsitektur BFF" },
        { period: "Agu 2022 — Jun 2026", role: "D4 Teknologi Rekayasa Komputer", org: "IPB University — Sekolah Vokasi", body: "Sistem tertanam, pengembangan aplikasi web, dan otomasi berbasis sensor. Perkiraan lulus Juni 2026.", metrics: "" },
      ],
    },
    skills: {
      label: "Tools",
      title: "Yang saya pakai untuk membangun.",
      groups: [
        { title: "Backend & database", items: ["Express.js", "PostgreSQL", "RESTful API", "Arsitektur client–server"] },
        { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
        { title: "IoT & protokol", items: ["MQTT", "Integrasi GPS / GIS", "Sistem tertanam"] },
        { title: "Cloud & tools", items: ["AWS", "Docker", "Git", "Linux", "Postman"] },
      ],
    },
    contact: {
      label: "Kontak",
      title: "Punya sensor, data, atau tenggat? Mari bicara.",
      intro: "Butuh API, pipeline data IoT, atau dashboard monitoring untuk proyek freelance? Email paling cepat. Form ini masuk ke inbox yang sama.",
      loc: "Domisili",
      phone: "Telepon",
    },
    form: {
      name: "Nama",
      email: "Email",
      message: "Pesan",
      namePh: "Nama Anda",
      emailPh: "anda@perusahaan.com",
      messagePh: "Apa yang sedang Anda bangun, dan di mana saya bisa membantu?",
      send: "Kirim pesan",
      sending: "Mengirim…",
      sent: "Terkirim. Saya akan segera membalas.",
      failed: "Gagal mengirim. Silakan email saya langsung.",
      errName: "Minimal 2 karakter.",
      errEmail: "Format email sepertinya salah.",
      errMessage: "Tambahkan sedikit detail — minimal 10 karakter.",
    },
    footer: { colophon: "Dirancang dan dibangun sendiri. Menggunakan Archivo.", top: "Kembali ke atas" },
  },
};

type ProjectCopy = { title: string; context: string; summary: string; facts: string[] };

export type Project = {
  key: string;
  light: string;
  dark: string;
  stack: string;
  links: { en: string; id: string; href: string }[];
  en: ProjectCopy;
  id: ProjectCopy;
};

export const PROJECTS: Project[] = [
  {
    key: "warehouse",
    light: "/images/dashboard-warehouse-light.webp",
    dark: "/images/dashboard-warehouse-dark.webp",
    stack: "Next.js · Express.js · PostgreSQL · MQTT",
    links: [
      { en: "Live demo", id: "Demo live", href: "https://synergyiot.ninja/demo" },
      { en: "Frontend repo", id: "Repo frontend", href: "https://github.com/zufar1228/synergy-frontend" },
      { en: "Backend repo", id: "Repo backend", href: "https://github.com/zufar1228/synergy-backend" },
    ],
    en: { title: "Smart Warehouse IoT Dashboard", context: "PT Synergy · 2025", summary: "Real-time security and environment monitoring for warehouses. Readings from 4 IoT nodes and 8 sensor points travel over MQTT into Express and PostgreSQL; I built over 80% of the Next.js dashboard in a team of four.", facts: ["4 IoT nodes, 8 sensor points", "Zero downtime during testing", "Door-intrusion alarms with arm/disarm control"] },
    id: { title: "Dashboard IoT Gudang Pintar", context: "PT Synergy · 2025", summary: "Monitoring keamanan dan lingkungan gudang secara real-time. Data dari 4 node IoT dan 8 titik sensor dikirim lewat MQTT ke Express dan PostgreSQL; saya membangun lebih dari 80% dashboard Next.js dalam tim berempat.", facts: ["4 node IoT, 8 titik sensor", "Nol downtime selama pengujian", "Alarm intrusi pintu dengan kontrol arm/disarm"] },
  },
  {
    key: "len",
    light: "/images/dashboard-len-light.webp",
    dark: "/images/dashboard-len-dark.webp",
    stack: "Express.js · PostgreSQL · TypeORM · Socket.IO · Docker",
    links: [],
    en: { title: "Industrial Asset Monitoring BFF", context: "PT Len Industri · 2025", summary: "A Backend-for-Frontend API for a mobile asset-monitoring app used by five state-owned defense companies — PT Len, PINDAD, DI, DAHANA and PAL. I worked on live GPS trip tracking, geofence alerts and multi-tenant auth.", facts: ["Multi-tenant across 5 companies", "Live GPS tracking and geofence alerts over Socket.IO", "PM2 cluster mode in Docker, documented with Swagger"] },
    id: { title: "BFF Monitoring Aset Industri", context: "PT Len Industri · 2025", summary: "API Backend-for-Frontend untuk aplikasi mobile monitoring aset yang dipakai lima BUMN pertahanan — PT Len, PINDAD, DI, DAHANA, dan PAL. Saya mengerjakan pelacakan perjalanan GPS live, peringatan geofence, dan auth multi-tenant.", facts: ["Multi-tenant untuk 5 perusahaan", "Pelacakan GPS live dan geofence lewat Socket.IO", "PM2 cluster di Docker, terdokumentasi Swagger"] },
  },
  {
    key: "river",
    light: "/images/dashboard-river-light.webp",
    dark: "/images/dashboard-river-dark.webp",
    stack: "Next.js · Express.js · PostgreSQL · IoT",
    links: [
      { en: "Live demo", id: "Demo live", href: "https://sicita-frontend.vercel.app" },
      { en: "Frontend repo", id: "Repo frontend", href: "https://github.com/zufar1228/sicita-frontend" },
      { en: "Backend repo", id: "Repo backend", href: "https://github.com/zufar1228/sicita-backend" },
    ],
    en: { title: "River Monitoring & Early Warning System", context: "With PT Toyo Sensing", summary: "Tracks water quality, temperature and water level from sensors reporting every five minutes, and warns when readings go abnormal. A cross-divisional build where I worked across the full stack.", facts: ["Sensor data every 5 minutes", "Automatic warnings on abnormal readings", "Next: ML-based sedimentation prediction"] },
    id: { title: "Sistem Monitoring & Peringatan Dini Sungai", context: "Bersama PT Toyo Sensing", summary: "Memantau kualitas air, suhu, dan tinggi muka air dari sensor yang melapor setiap lima menit, dan memberi peringatan saat pembacaan tidak normal. Kolaborasi lintas divisi; saya mengerjakan seluruh stack.", facts: ["Data sensor setiap 5 menit", "Peringatan otomatis saat kondisi abnormal", "Berikutnya: prediksi sedimentasi berbasis ML"] },
  },
  {
    key: "laundry",
    light: "/images/dashboard-laundry.webp",
    dark: "/images/dashboard-laundry.webp",
    stack: "CodeIgniter 3 · PHP · MySQL · Bootstrap",
    links: [{ en: "Source", id: "Kode sumber", href: "https://github.com/zufarnatsir/SmartWash" }],
    en: { title: "Laundry Management App", context: "Independent · MVP", summary: "A small, practical MVP for neighbourhood laundry businesses: take an order, track its status, keep customer records. Built to be deployable quickly on cheap hosting.", facts: ["Order intake and status tracking", "Customer records", "Runs on standard PHP hosting"] },
    id: { title: "Aplikasi Manajemen Laundry", context: "Mandiri · MVP", summary: "MVP sederhana untuk usaha laundry kecil: terima pesanan, lacak statusnya, simpan data pelanggan. Dibuat agar cepat di-deploy di hosting murah.", facts: ["Input pesanan dan pelacakan status", "Data pelanggan", "Jalan di hosting PHP standar"] },
  },
];

export const RESUME_URL = "https://drive.google.com/file/d/1EiKF9yDO-15LhYgtCDrvP2GK1XEXdSOH/view?usp=sharing";
export const EMAIL = "zufarntsr@gmail.com";
