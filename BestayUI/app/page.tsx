import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HowWorksSection } from "./components/how-works-section";
import { InterestingPlacesSection } from "./components/interesting-places-section";
import { MainSection } from "./components/main-section";
import { FeaturesSection } from "./components/features-section";
import { UseCasesSection } from "./components/use-cases-section";
import { CtaSection } from "./components/cta-section";
import "./landing-motion.css";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <MainSection />
        <HowWorksSection />
        <FeaturesSection />
        <InterestingPlacesSection />
        <UseCasesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
