
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsCarousel from "@/components/ClientsCarousel";
import PlatformsSection from "@/components/PlatformsSection";
import ProblemsSection from "@/components/ProblemsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import SolutionsSection from "@/components/SolutionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import TimelineSection from "@/components/TimelineSection";
import QuoteSection from "@/components/QuoteSection";
import DiagnosticForm from "@/components/DiagnosticForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <div className="noise-overlay" />
      
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection />
        <ClientsCarousel />
        <ProblemsSection />
        <PlatformsSection />
        <BeforeAfterSection />
        <SolutionsSection />
        <TestimonialsSection />
        <TeamSection />
        <TimelineSection />
        <QuoteSection />
        <DiagnosticForm />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
