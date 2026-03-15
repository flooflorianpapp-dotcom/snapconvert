import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { FormatConverter } from "@/components/format-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "WEBP to JPG Converter - Free Online Tool | SnapConvert",
  description: "Convert WEBP images to JPG format online for free. Get universal compatibility for your images. No sign-up required, your files stay private in your browser.",
  keywords: ["WEBP to JPG", "WEBP to JPEG", "convert WEBP to JPG", "WEBP converter", "image format converter"],
  openGraph: {
    title: "WEBP to JPG Converter - Free Online Tool",
    description: "Convert WEBP images to JPG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function WebpToJpgPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              WEBP to JPG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your WEBP images to JPG format for universal compatibility. Perfect when you need to share images that work everywhere.
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
              outputFormat="jpeg"
              inputLabel="WEBP"
              outputLabel="JPG"
            />
          </div>
        </section>

        <HowToConvert formatName="WEBP to JPG" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert WEBP to JPG?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                JPG offers maximum compatibility across all platforms and devices
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Universal Compatibility</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG works everywhere while WEBP may not be supported by older software.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Works everywhere
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Email friendly
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Easy Sharing</h3>
                <p className="mt-2 text-sm text-muted-foreground">Share your images on social media, messaging apps, and more.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Social media ready
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Print compatible
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Software Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG is supported by all image editing software and viewers.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Any editor
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Legacy support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="WEBP to JPG" formatExtension=".webp" />

        {/* SEO Content Section */}
        <section className="px-4 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                Free WEBP to JPG Converter Online
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Convert WEBP images to JPG format instantly with our free online tool. WEBP is Google's modern image format that offers excellent compression, but it's not universally supported by all applications and devices. Our WEBP to JPG converter transforms your WEBP files into the universally compatible JPG format, ensuring your images can be viewed, edited, and shared anywhere without compatibility issues.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                When to Convert WEBP to JPG
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Converting WEBP to JPG is essential when you need maximum compatibility. While modern web browsers support WEBP, many image editing applications, older software, and some devices may not. JPG (JPEG) is the most widely supported image format in existence, guaranteed to work on virtually any device, application, or platform. Convert WEBP to JPG when you need to edit images in software that doesn't support WEBP, share photos via email or messaging apps, print images at photo labs, or use images in documents and presentations.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                How Our WEBP to JPG Converter Works
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our browser-based converter processes your WEBP files entirely on your device using modern web technologies. Simply drag and drop your WEBP images, select your preferred quality setting, and download the converted JPG files instantly. The entire conversion happens locally in your browser, meaning your images are never uploaded to any server, ensuring complete privacy and fast processing speeds regardless of your internet connection.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                WEBP vs JPG: Understanding the Formats
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                WEBP was developed by Google specifically for web use, offering 25-35% smaller file sizes compared to JPG at equivalent quality. It supports both lossy and lossless compression, plus animation and transparency. JPG (JPEG), developed in 1992, remains the universal standard for photographs due to its near-universal support. While WEBP is excellent for web delivery where supported, JPG's unmatched compatibility makes it the safer choice for sharing, printing, and long-term archival.
              </p>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
