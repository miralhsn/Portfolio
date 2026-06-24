import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Systems from "@/components/sections/Systems";
import Philosophy from "@/components/sections/Philosophy";
import TechStack from "@/components/sections/TechStack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Metrics />
      <Systems />
      <Philosophy />
      <TechStack />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
