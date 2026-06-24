import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HowWorksSection } from "./components/how-works-section";
import { InterestingPlacesSection } from "./components/interesting-places-section";
import { MainSection } from "./components/main-section";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <MainSection />
        <HowWorksSection />
        <InterestingPlacesSection />
      </main>
      <Footer />
    </>
  );
}
