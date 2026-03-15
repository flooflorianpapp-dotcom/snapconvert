import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { FormatConverter } from "@/components/format-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "WEBP to GIF Converter - Free Online Tool | SnapConvert",
  description: "Convert WEBP images to GIF format online for free. Create compatible animated images. No sign-up required, your files stay private in your browser.",
  keywords: ["WEBP to GIF", "convert WEBP to GIF", "WEBP converter", "animated WEBP to GIF", "image format converter"],
  openGraph: {
    title: "WEBP to GIF Converter - Free Online Tool",
    description: "Convert WEBP images to GIF format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function WebpToGifPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              WEBP to GIF Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your WEBP images to GIF format for universal animation support. Perfect for sharing on platforms that don't support WEBP animations.
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
              outputLabel="GIF"
            />
          </div>
        </section>

        <HowToConvert formatName="WEBP to GIF" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert WEBP to GIF?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                GIF is universally supported for animations across all platforms
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Universal Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">GIF works everywhere while animated WEBP has limited support.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    All platforms
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Social media
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Animation Compatible</h3>
                <p className="mt-2 text-sm text-muted-foreground">Share animated content where WEBP isn't supported.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Forums & chat
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Email friendly
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Legacy Compatibility</h3>
                <p className="mt-2 text-sm text-muted-foreground">GIF works with older software and devices.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Older browsers
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    All devices
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="WEBP to GIF" formatExtension=".webp" />

        {/* SEO Content Section */}
        <section className="px-4 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                Free WEBP to GIF Converter Online
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Convert WEBP images to GIF format with our free online tool. While animated WEBP offers superior compression, GIF remains the universal standard for animated images with near-total compatibility across all platforms, devices, and applications. Our WEBP to GIF converter helps you share your animations on platforms that don't yet support the WEBP format, ensuring your content displays correctly everywhere.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                When to Convert WEBP to GIF
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Converting WEBP to GIF is essential when sharing animations on platforms with limited WEBP support. While modern web browsers support WEBP, many social media platforms, messaging apps, forum software, and email clients may not display WEBP animations correctly. GIF, despite being an older format, is universally supported and will play correctly virtually anywhere. Convert WEBP to GIF when sharing animations via email, posting on forums or community sites, using in presentations, or any situation where maximum compatibility is required.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                How Our WEBP to GIF Converter Works
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our browser-based converter processes your WEBP files directly on your device. For static WEBP images, the converter creates a single-frame GIF. The conversion happens entirely in your browser, ensuring your files remain private and the process is fast regardless of your internet connection speed. Simply upload your WEBP file, and download the converted GIF in seconds.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                WEBP vs GIF: Understanding Animation Formats
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                WEBP animations offer significantly better compression than GIF, often 50-90% smaller at equivalent quality, with support for millions of colors. GIF is limited to 256 colors per frame and uses an older compression algorithm, resulting in larger files. However, GIF's universal compatibility—it works everywhere, from ancient browsers to modern apps—makes it indispensable for sharing. While WEBP is technically superior, GIF's ubiquity means it remains the safer choice for broad distribution of animated content.
              </p>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
