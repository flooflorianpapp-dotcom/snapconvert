import { UnifiedHeader } from "@/components/unified-header"
import { HeroHu } from "@/components/hero-hu"
import { HowItWorksHu } from "@/components/how-it-works-hu"
import { SupportedFormatsHu } from "@/components/supported-formats-hu"
import { WhySnapConvertHu } from "@/components/why-snapconvert-hu"
import { FAQHu } from "@/components/faq-hu"
import { UnifiedFooter } from "@/components/unified-footer"

export default function HomeHu() {
  return (
    <main className="min-h-screen bg-background">
      <UnifiedHeader />
      <div className="pt-16">
        <HeroHu />
        <HowItWorksHu />
        <SupportedFormatsHu />
        <WhySnapConvertHu />
        <FAQHu />
      </div>
      <UnifiedFooter />
    </main>
  )
}
