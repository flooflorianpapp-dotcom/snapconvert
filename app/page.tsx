import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { SupportedFormats } from "@/components/supported-formats"
import { WhySnapConvert } from "@/components/why-snapconvert"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <Hero />
        <HowItWorks />
        <SupportedFormats />
        <WhySnapConvert />
        <FAQ />
      </div>
      <Footer />
    </main>
  )
}
