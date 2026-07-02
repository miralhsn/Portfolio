"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  return (
    <>
      <IntroLoader onComplete={() => setIntroFinished(true)} />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
      >
        <Navbar />
        <Hero />
        <About />
        <Projects activeCapability={activeCapability} />
        <TechStack activeCapability={activeCapability} setActiveCapability={setActiveCapability} />
        <Journey />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
