import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
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
      <UnifiedHeader />
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

        {/* SEO Content Section */}
        <section className="px-4 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                Free WEBP to PNG Converter Online
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Convert WEBP images to PNG format with our free online converter. While WEBP offers excellent compression for web use, PNG remains the preferred format for lossless quality and broad software compatibility. Our WEBP to PNG converter preserves every detail of your images, including any transparency, while converting them to a format that works with virtually all image editing software and applications.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                When to Convert WEBP to PNG
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Converting WEBP to PNG is ideal when you need lossless quality for editing or when working with software that doesn't support WEBP. PNG preserves transparency perfectly and doesn't introduce compression artifacts, making it the best choice for graphics, logos, screenshots, and images that need to maintain pixel-perfect quality. If you've downloaded images from websites in WEBP format and need to edit them in applications like older versions of Photoshop, Illustrator, or other design tools, converting to PNG ensures full compatibility.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                How Our WEBP to PNG Converter Works
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our converter processes your WEBP files directly in your browser using advanced web technologies. Upload your WEBP images, and our tool will convert them to high-quality PNG files while preserving all transparency and image detail. The conversion happens entirely on your device, so your images never leave your computer. This ensures both privacy and fast processing, even for large files or batch conversions.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                WEBP vs PNG: Choosing the Right Format
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                WEBP uses advanced compression to create smaller files for web delivery, supporting both lossy and lossless compression. PNG uses lossless compression only, meaning no image data is ever lost, but files are typically larger. While WEBP files can be 25-30% smaller than PNG at equivalent quality, PNG's universal compatibility and guaranteed lossless quality make it the better choice for archival, editing, and professional workflows. Both formats support transparency, but PNG's alpha channel handling is more widely supported across applications.
              </p>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
