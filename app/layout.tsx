import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Providers from "@/components/Providers";
import { profile, contactInfo } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const title = `${profile.name} | Full-stack developer`;
const description =
  "Full-stack developer at Telkomsat. I build IoT backends and monitoring dashboards that turn sensor data into something people can act on.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zufarnats.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6ecec" },
    { media: "(prefers-color-scheme: dark)", color: "#0c2228" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-ink">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: "https://zufarnats.dev",
              jobTitle: "Full-stack developer",
              description,
              worksFor: { "@type": "Organization", name: "Telkomsat" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bogor",
                addressCountry: "ID",
              },
              email: `mailto:${contactInfo.email}`,
              sameAs: [contactInfo.linkedin, contactInfo.github],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "IPB University",
              },
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
