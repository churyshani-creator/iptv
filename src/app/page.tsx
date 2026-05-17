// app/page.tsx
import { HeroBanner } from "./components/HeroBanner";
import { FeaturesSection } from "./components/FeaturesSection";
import { PricingSection } from "./components/PricingSection";
import { InstallationGuide } from "./components/InstallationGuide";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { InstallationProcess } from "./components/installation";

export default function Home() {
  return (
    <main className="bg-black">
      <HeroBanner />
      <FeaturesSection />
      <PricingSection />
      <InstallationProcess />
      <InstallationGuide />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}