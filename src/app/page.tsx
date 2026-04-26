import { Header } from "@/components/landing/Header";
import { Hero }   from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { DreiSaeulen } from "@/components/landing/DreiSaeulen";
import { WieLaeuftsAb } from "@/components/landing/WieLaeuftsAb";
import { ScrollZoomWindow } from "@/components/landing/ScrollZoomWindow";
import { StatsSection } from "@/components/landing/StatsSection";
import { Referenzen } from "@/components/landing/Referenzen";
import { FAQSection } from "@/components/landing/FAQSection";
import { LokalCTA } from "@/components/landing/LokalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <DreiSaeulen />
        <WieLaeuftsAb />
        <ScrollZoomWindow />
        <StatsSection />
        <Referenzen />
        <FAQSection />
        <LokalCTA />
      </main>
      <Footer />
    </>
  );
}
