import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Geist } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: "Muhammad Zufar Natsir | Software & IoT Developer",
  description:
    "Final-year Computer Engineering student at IPB University, focused on backend systems, IoT solutions, and reliable real-world software engineering.",
  openGraph: {
    title: "Muhammad Zufar Natsir | Software & IoT Developer",
    description:
      "Final-year Computer Engineering student at IPB University, focused on backend systems, IoT solutions, and reliable real-world software engineering.",
    type: "website",
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
      <body className="min-h-screen overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
