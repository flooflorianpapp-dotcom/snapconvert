import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ImageConverter } from "@/components/image-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "PNG to PDF Converter - Free Online Tool | SnapConvert",
  description: "Convert PNG images to PDF online for free. Preserve transparency and quality. No sign-up required, files stay private in your browser.",
  keywords: ["PNG to PDF", "convert PNG to PDF", "PNG PDF converter", "free PNG converter", "PNG transparent PDF"],
  openGraph: {
    title: "PNG to PDF Converter - Free Online Tool",
    description: "Convert PNG images to PDF online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function PngToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              PNG to PDF Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your PNG images to PDF with perfect quality. Ideal for logos, graphics, screenshots, and images with transparent backgrounds.
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
            <ImageConverter
              acceptedFormats={["image/png"]}
              formatLabel="PNG"
            />
          </div>
        </section>

        <HowToConvert formatName="PNG" />

        {/* PNG-specific info section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                About PNG Format
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                PNG is the preferred format for graphics, logos, and images requiring transparency
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Transparency Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">PNG supports alpha transparency, making it perfect for logos and overlays.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Alpha channel support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Perfect for logos
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Lossless Quality</h3>
                <p className="mt-2 text-sm text-muted-foreground">PNG uses lossless compression, preserving every pixel of your original image.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    No quality loss
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Sharp edges preserved
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Screenshots & Graphics</h3>
                <p className="mt-2 text-sm text-muted-foreground">PNG is the ideal format for screenshots, diagrams, and digital graphics.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Text stays crisp
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    UI/UX screenshots
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="PNG" formatExtension=".png" />
      </main>
      <UnifiedFooter />
    </div>
  )
}
