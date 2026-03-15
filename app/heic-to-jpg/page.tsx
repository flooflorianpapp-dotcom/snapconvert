import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormatConverter } from "@/components/format-converter"
import { 
  HowItWorksSection, 
  SupportedFormatsSection, 
  WhySnapConvertSection, 
  FormatBenefitsSection, 
  FAQSection 
} from "@/components/converter-seo-sections"
import { converterConfigs } from "@/lib/converter-configs"

const config = converterConfigs["heic-to-jpg"]

export const metadata: Metadata = {
  title: "HEIC to JPG Converter - Free Online Tool | SnapConvert",
  description: "Convert HEIC images to JPG format online for free. Make your iPhone photos compatible everywhere. No sign-up required, your files stay private in your browser.",
  keywords: ["HEIC to JPG", "HEIC to JPEG", "convert HEIC to JPG", "iPhone photo converter", "Apple HEIC converter"],
  openGraph: {
    title: "HEIC to JPG Converter - Free Online Tool",
    description: "Convert HEIC images to JPG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function HeicToJpgPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              HEIC to JPG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your iPhone HEIC photos to JPG format for universal compatibility. Share your Apple photos anywhere without format issues.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>No sign-up required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Files stay in your browser</span>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full max-w-3xl">
            <FormatConverter
              inputFormats={["image/heic", "image/heif"]}
              outputFormat="jpeg"
              inputLabel="HEIC"
              outputLabel="JPG"
            />
          </div>
        </section>

        <HowItWorksSection config={config} />
        <FormatBenefitsSection config={config} />
        <SupportedFormatsSection config={config} />
        <WhySnapConvertSection config={config} />
        <FAQSection config={config} />
      </main>
      <Footer />
    </div>
  )
}
