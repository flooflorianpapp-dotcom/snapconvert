import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormatConverter } from "@/components/format-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "WEBP to PNG Converter - Free Online Tool | SnapConvert",
  description: "Convert WEBP images to PNG format online for free. Get lossless quality and broader compatibility. No sign-up required, your files stay private in your browser.",
  keywords: ["WEBP to PNG", "convert WEBP to PNG", "WEBP converter", "image format converter", "lossless conversion"],
  openGraph: {
    title: "WEBP to PNG Converter - Free Online Tool",
    description: "Convert WEBP images to PNG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function WebpToPngPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              WEBP to PNG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your WEBP images to PNG format for lossless quality and broader software compatibility. Perfect for editing and preserving image quality.
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
              inputFormats={["image/webp"]}
              outputFormat="png"
              inputLabel="WEBP"
              outputLabel="PNG"
            />
          </div>
        </section>

        <HowToConvert formatName="WEBP to PNG" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert WEBP to PNG?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                PNG offers lossless quality and better software support
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Lossless Quality</h3>
                <p className="mt-2 text-sm text-muted-foreground">PNG preserves every pixel without any compression artifacts.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    No quality loss
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Sharp details
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Better Compatibility</h3>
                <p className="mt-2 text-sm text-muted-foreground">PNG works with all image editors while WEBP may not.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    All editors
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Legacy support
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Transparency Preserved</h3>
                <p className="mt-2 text-sm text-muted-foreground">PNG maintains any transparency from your WEBP images.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Alpha channel
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Layer-ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="WEBP to PNG" formatExtension=".webp" />
      </main>
      <Footer />
    </div>
  )
}
