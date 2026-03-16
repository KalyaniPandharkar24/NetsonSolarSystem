import { useEffect } from "react";
import HeroSection from "../components/home/Hero";
import AboutSection from "../components/home/AboutIntro";
import WhyChooseUsSection from "../components/home/WhyChooseUs";
import TestimonialsSection from "../components/home/ReviewsSection";
import TimelineSection from "../components/home/TimelineSection";
import SkillsSection from "../components/home/SkillsSection";
import SolarCalculatorSection from "../components/home/SolarCalculatorSection";
import FAQSection from "../components/home/FAQSection";
import SolarCTASection from "../components/home/SolarCTASection";

const HomePage = () => {
  useEffect(() => {
    document.title =
      "Netson Solar System | Rooftop Solar Installation Experts";
  }, []);  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <div id="services">
        <AboutSection />
        <WhyChooseUsSection />
        <SkillsSection />
      </div>
      <div id="projects">
        <TestimonialsSection />
        <TimelineSection />
      </div>
      <div id="contact">
        <SolarCTASection />
        <SolarCalculatorSection />
        <FAQSection />
      </div>
    </>
  );
};

export default HomePage;
