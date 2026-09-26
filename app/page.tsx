import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import SocialSidebar from "@/components/ui/SocialSidebar";
import EasterEgg from "@/components/ui/EasterEgg";
import SectionDivider from "@/components/ui/SectionDivider";
import AiChat from "@/components/sections/AiChat";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <EasterEgg />
      <SocialSidebar />
      <AiChat />
      <div className="grain" />
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <Services />
        <SectionDivider variant="diamond" />
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
