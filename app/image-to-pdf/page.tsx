import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageConverter } from "@/components/image-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { SupportedFormats } from "@/components/supported-formats"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "Image to PDF Converter - Free Online Tool | SnapConvert",
  description: "Convert any image to PDF online for free. Supports JPG, PNG, and WEBP formats. No sign-up required, files never leave your browser. Fast and secure conversion.",
  keywords: ["image to PDF", "convert image to PDF", "online image converter", "free PDF converter", "image PDF tool"],
  openGraph: {
    title: "Image to PDF Converter - Free Online Tool",
    description: "Convert any image to PDF online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function ImageToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Image to PDF Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert any image format to a professional PDF document instantly. Works with JPG, PNG, and WEBP files right in your browser.
            </p>

            {/* Trust indicators */}
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

          {/* Converter Tool */}
          <div className="mt-10 w-full max-w-3xl">
            <ImageConverter />
          </div>
        </section>

        <HowToConvert formatName="Images" />
        <SupportedFormats />
        <FormatFAQ formatName="Image" formatExtension="image" />
      </main>
      <Footer />
    </div>
  )
}
