import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
import CursorGlow from "@/components/ui/CursorGlow";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import SocialSidebar from "@/components/ui/SocialSidebar";
import EasterEgg from "@/components/ui/EasterEgg";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <CursorGlow />
      <CustomCursor />
      <EasterEgg />
      <SocialSidebar />
      <div className="grain" />
      {/* Vignette overlay for depth */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, var(--color-bg) 100%)",
          opacity: 0.4,
        }}
      />
      <Navbar />
      <main className="relative">
        <Hero />
        <SectionDivider variant="diamond" />
        <About />
        <Skills />
        <SectionDivider variant="dots" />
        <Projects />
        <Experience />
        <SectionDivider variant="line" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
