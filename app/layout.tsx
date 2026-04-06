import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Geist } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans',display:'swap'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zufarnatsir.dev"),
  title: "Muhammad Zufar Natsir | Software & IoT Developer",
  description:
    "I build backend systems and IoT solutions that turn real-world sensor data into actionable insights — from warehouse monitoring to geolocation asset tracking.",
  openGraph: {
    title: "Muhammad Zufar Natsir | Software & IoT Developer",
    description:
      "I build backend systems and IoT solutions that turn real-world sensor data into actionable insights.",
    type: "website",
    siteName: "Zufar Natsir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zufar Natsir | Software & IoT Developer",
    description:
      "I build backend systems and IoT solutions that turn real-world sensor data into actionable insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, plusJakarta.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Zufar Natsir",
              url: "https://zufarnatsir.dev",
              jobTitle: "Software & IoT Developer",
              description:
                "I build backend systems and IoT solutions that turn real-world sensor data into actionable insights.",
              sameAs: [
                "https://www.linkedin.com/in/muhammad-zufar-natsir-0b1353341",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "IPB University",
              },
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] focus:rounded-lg focus:font-body focus:font-semibold focus:text-sm focus:outline-none"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
