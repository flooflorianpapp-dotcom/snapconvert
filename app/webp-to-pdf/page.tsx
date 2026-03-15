import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageConverter } from "@/components/image-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "WEBP to PDF Converter - Free Online Tool | SnapConvert",
  description: "Convert WEBP images to PDF online for free. Modern format, perfect quality. No sign-up required, files stay private in your browser.",
  keywords: ["WEBP to PDF", "convert WEBP to PDF", "WEBP PDF converter", "free WEBP converter", "WEBP image converter"],
  openGraph: {
    title: "WEBP to PDF Converter - Free Online Tool",
    description: "Convert WEBP images to PDF online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function WebpToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              WEBP to PDF Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert modern WEBP images to PDF format instantly. WEBP offers superior compression while maintaining excellent quality.
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
              acceptedFormats={["image/webp"]}
              formatLabel="WEBP"
            />
          </div>
        </section>

        <HowToConvert formatName="WEBP" />

        {/* WEBP-specific info section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                About WEBP Format
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                WEBP is a modern image format developed by Google for the web
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Superior Compression</h3>
                <p className="mt-2 text-sm text-muted-foreground">WEBP files are typically 25-35% smaller than equivalent JPG or PNG files.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Smaller file sizes
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Same visual quality
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Best of Both Worlds</h3>
                <p className="mt-2 text-sm text-muted-foreground">WEBP supports both lossy and lossless compression, plus transparency.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Transparency support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Animation support
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Modern Web Standard</h3>
                <p className="mt-2 text-sm text-muted-foreground">WEBP is supported by all major browsers and is becoming the default for web images.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Browser native support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Web-optimized
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="WEBP" formatExtension=".webp" />

        {/* SEO Content Section */}
        <section className="px-4 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                Free WEBP to PDF Converter Online
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Convert WEBP images to PDF documents with our free online tool. WEBP is Google's modern image format optimized for web delivery, but when you need to create professional documents, share images as attachments, or archive your photos in a universal format, PDF is the ideal choice. Our converter transforms your WEBP images into high-quality PDF documents that can be viewed, printed, and shared on any device.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Why Convert WEBP to PDF
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                PDF is the universal standard for document sharing, offering guaranteed compatibility across all operating systems, devices, and applications. Converting WEBP images to PDF is perfect for creating professional portfolios, preparing images for printing, combining multiple images into a single document, or archiving photos in a format that will remain accessible for decades. PDF documents maintain consistent appearance regardless of the viewing device, making them ideal for professional and formal use cases.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                How Our WEBP to PDF Converter Works
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our converter processes your WEBP files directly in your browser, ensuring your images remain private and secure. Upload single or multiple WEBP images, and our tool will convert them into a well-formatted PDF document while preserving the original image quality and resolution. The resulting PDF is optimized for both screen viewing and high-quality printing. All processing happens locally on your device, so your files are never uploaded to any server.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                About WEBP Format
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                WEBP was developed by Google as a modern image format specifically designed for the web. It uses advanced compression techniques that can reduce image file sizes by 25-35% compared to JPG and PNG at equivalent visual quality. WEBP supports both lossy and lossless compression, transparency (alpha channel), and even animation. While WEBP is excellent for web delivery and is supported by all major browsers, its limited support in traditional applications and print workflows makes conversion to PDF valuable for professional and archival use.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
