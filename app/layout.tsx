import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "Full-stack engineer writing the software between field sensors and the people who act on them — MQTT pipelines, APIs, and monitoring dashboards.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zufarnats.dev"),
  title: "Muhammad Zufar Natsir | Full-Stack & IoT Engineer",
  description,
  openGraph: {
    title: "Muhammad Zufar Natsir | Full-Stack & IoT Engineer",
    description,
    type: "website",
    siteName: "Zufar Natsir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zufar Natsir | Full-Stack & IoT Engineer",
    description,
  },
};

// Runs before paint: applies the saved/system theme and arms the reveal
// animations so content never flashes in its final state first.
const initScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('zn-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')d.setAttribute('data-theme','dark');var l=localStorage.getItem('zn-lang');if(l==='en'||l==='id')d.lang=l;}catch(e){}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'animate' in d)d.classList.add('rv');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Zufar Natsir",
              url: "https://zufarnats.dev",
              jobTitle: "Full-Stack Engineer",
              worksFor: { "@type": "Organization", name: "PT Telkom Satelit Indonesia" },
              description,
              sameAs: [
                "https://www.linkedin.com/in/muhammad-zufar-natsir-0b1353341",
                "https://github.com/zufar1228",
              ],
              alumniOf: { "@type": "CollegeOrUniversity", name: "IPB University" },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
