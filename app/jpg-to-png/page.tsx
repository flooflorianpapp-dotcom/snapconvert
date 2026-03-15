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

const config = converterConfigs["jpg-to-png"]

export const metadata: Metadata = {
  title: "JPG to PNG Converter - Free Online Tool | SnapConvert",
  description: "Convert JPG images to PNG format online for free. Get lossless quality and transparency support. No sign-up required, your files stay private in your browser.",
  keywords: ["JPG to PNG", "JPEG to PNG", "convert JPG to PNG", "JPG converter", "image format converter", "add transparency"],
  openGraph: {
    title: "JPG to PNG Converter - Free Online Tool",
    description: "Convert JPG images to PNG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function JpgToPngPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              JPG to PNG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your JPG images to PNG format for lossless quality and future editing. Perfect for graphics, logos, and images that need transparency support.
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
              inputFormats={["image/jpeg", "image/jpg"]}
              outputFormat="png"
              inputLabel="JPG"
              outputLabel="PNG"
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
