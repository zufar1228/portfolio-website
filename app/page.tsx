import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
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
      <main>
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
