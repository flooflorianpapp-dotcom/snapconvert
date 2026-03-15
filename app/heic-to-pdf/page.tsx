import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ImageConverter } from "@/components/image-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "HEIC to PDF Converter - Free Online Tool | SnapConvert",
  description: "Convert HEIC images to PDF format online for free. Create professional documents from your iPhone photos. No sign-up required, your files stay private in your browser.",
  keywords: ["HEIC to PDF", "convert HEIC to PDF", "iPhone photo to PDF", "Apple HEIC to PDF", "HEIC PDF converter"],
  openGraph: {
    title: "HEIC to PDF Converter - Free Online Tool",
    description: "Convert HEIC images to PDF format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function HeicToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              HEIC to PDF Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your iPhone HEIC photos to PDF documents. Perfect for creating portfolios, reports, or sharing multiple photos in a single file.
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
            <ImageConverter
              acceptedFormats={["image/heic", "image/heif"]}
              formatLabel="HEIC"
            />
          </div>
        </section>

        <HowToConvert formatName="HEIC to PDF" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert HEIC to PDF?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                PDF is the universal document format for sharing and printing
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Professional Documents</h3>
                <p className="mt-2 text-sm text-muted-foreground">Create professional-looking documents from your iPhone photos.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Portfolio ready
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Report friendly
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Easy Sharing</h3>
                <p className="mt-2 text-sm text-muted-foreground">Share multiple photos in a single PDF file.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Single file
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Email friendly
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Print Ready</h3>
                <p className="mt-2 text-sm text-muted-foreground">PDF maintains quality for professional printing.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    High quality
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Print shop ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="HEIC to PDF" formatExtension=".heic" />

        {/* SEO Content Section */}
        <section className="px-4 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                Free HEIC to PDF Converter Online
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Convert your iPhone and iPad HEIC photos to PDF documents with our free online converter. HEIC (High Efficiency Image Container) is Apple's default image format that offers excellent compression while maintaining high quality. However, when you need to share photos as documents or create portfolios, converting HEIC to PDF is the perfect solution. Our tool creates professional-quality PDF files from your Apple device photos.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Why Convert HEIC Photos to PDF
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                PDF is the universal standard for document sharing, making it ideal for professional presentations, portfolios, and reports. Converting HEIC to PDF allows you to combine multiple photos into a single, organized document that anyone can view regardless of their device or software. PDFs are perfect for sharing photo collections via email, creating photo albums for printing, or archiving images in a document format that will remain accessible for years to come.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                How Our HEIC to PDF Converter Works
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our converter processes your HEIC files directly in your browser, ensuring your private photos never leave your device. Simply upload your HEIC images, and our tool will convert them to a high-quality PDF document while preserving the original image resolution and color accuracy. You can convert single images or batch process multiple HEIC files into one PDF. The resulting PDF maintains excellent quality suitable for both screen viewing and professional printing.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                About HEIC Format
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                HEIC (also known as HEIF) is Apple's advanced image format introduced in iOS 11 and macOS High Sierra. It uses the HEVC (H.265) video codec for image compression, achieving files roughly half the size of JPG while maintaining better image quality. While HEIC is excellent for storage efficiency on Apple devices, its limited compatibility with non-Apple platforms and applications makes conversion to more universal formats like PDF essential for sharing and professional use.
              </p>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
