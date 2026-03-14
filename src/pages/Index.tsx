import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load: tudo abaixo do fold carrega sob demanda
const ClientsCarousel = React.lazy(() => import("@/components/ClientsCarousel"));
const ProblemsSection = React.lazy(() => import("@/components/ProblemsSection"));
const PlatformsSection = React.lazy(() => import("@/components/PlatformsSection"));
const BeforeAfterSection = React.lazy(() => import("@/components/BeforeAfterSection"));
const SolutionsSection = React.lazy(() => import("@/components/SolutionsSection"));
const TestimonialsSection = React.lazy(() => import("@/components/TestimonialsSection"));
const TeamSection = React.lazy(() => import("@/components/TeamSection"));
const TimelineSection = React.lazy(() => import("@/components/TimelineSection"));
const QuoteSection = React.lazy(() => import("@/components/QuoteSection"));
const DiagnosticForm = React.lazy(() => import("@/components/DiagnosticForm"));
const CTASection = React.lazy(() => import("@/components/CTASection"));
const Footer = React.lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <>
      <div className="noise-overlay" />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection />
        <Suspense fallback={null}>
          <ClientsCarousel />
          <ProblemsSection />
          <BeforeAfterSection />
          <PlatformsSection />
          <SolutionsSection />
          <TimelineSection />
          <TestimonialsSection />
          <TeamSection />
          <DiagnosticForm />
          <CTASection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
