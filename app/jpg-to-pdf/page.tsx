import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ImageConverter } from "@/components/image-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Free Online Tool | SnapConvert",
  description: "Convert JPG images to PDF online for free. No sign-up required, no watermarks. Your files stay private in your browser. Fast and easy JPG to PDF conversion.",
  keywords: ["JPG to PDF", "JPEG to PDF", "convert JPG to PDF", "JPG PDF converter", "free JPG converter"],
  openGraph: {
    title: "JPG to PDF Converter - Free Online Tool",
    description: "Convert JPG images to PDF online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function JpgToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              JPG to PDF Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your JPG and JPEG images to PDF format instantly. Perfect for photos, scanned documents, and screenshots.
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
              acceptedFormats={["image/jpeg", "image/jpg"]}
              formatLabel="JPG or JPEG"
            />
          </div>
        </section>

        <HowToConvert formatName="JPG" />

        {/* JPG-specific info section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                About JPG Format
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                JPG (JPEG) is the most widely used image format on the web
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Universal Compatibility</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG files are supported by virtually every device, browser, and application.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Works everywhere
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Default camera format
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Efficient Compression</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG uses lossy compression to create smaller file sizes while maintaining good quality.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Small file sizes
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Fast loading
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Perfect for Photos</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG excels at storing photographic images with millions of colors.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    16.7 million colors
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Photo-optimized
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="JPG" formatExtension=".jpg" />
      </main>
      <UnifiedFooter />
    </div>
  )
}
