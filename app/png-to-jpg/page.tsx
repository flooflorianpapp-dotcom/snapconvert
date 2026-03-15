import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { FormatConverter } from "@/components/format-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Free Online Tool | SnapConvert",
  description: "Convert PNG images to JPG format online for free. Reduce file sizes while maintaining quality. No sign-up required, your files stay private in your browser.",
  keywords: ["PNG to JPG", "PNG to JPEG", "convert PNG to JPG", "PNG converter", "image format converter"],
  openGraph: {
    title: "PNG to JPG Converter - Free Online Tool",
    description: "Convert PNG images to JPG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function PngToJpgPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              PNG to JPG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your PNG images to JPG format instantly. Perfect for reducing file sizes and improving compatibility across all platforms.
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
              inputFormats={["image/png"]}
              outputFormat="jpeg"
              inputLabel="PNG"
              outputLabel="JPG"
            />
          </div>
        </section>

        <HowToConvert formatName="PNG to JPG" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert PNG to JPG?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                JPG offers smaller file sizes for photos and complex images
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Smaller File Size</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG compression can reduce file sizes by 50-90% compared to PNG.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Faster uploads
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Less storage needed
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Universal Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG is supported by every device, browser, and platform.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Email attachments
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Social media ready
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Ideal for Photos</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG excels at compressing photographs with minimal quality loss.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Great for photos
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Adjustable quality
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="PNG to JPG" formatExtension=".png" />

        {/* SEO Content Section */}
        <section className="px-4 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                Free PNG to JPG Converter Online
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Convert PNG images to JPG format instantly with our free online tool. PNG (Portable Network Graphics) files are great for images with transparency, but they can result in larger file sizes compared to JPG (JPEG). Our PNG to JPG converter helps you reduce file sizes by up to 90% while maintaining excellent visual quality, making your images perfect for web use, email attachments, and social media sharing.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                When to Convert PNG to JPG
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Converting PNG to JPG is ideal when you need smaller file sizes and don't require transparency. JPG format uses lossy compression that works exceptionally well for photographs and complex images with many colors and gradients. While PNG excels at preserving sharp edges in graphics and logos with transparency, JPG is the preferred format for photos, web images, and any situation where file size matters more than preserving transparency.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                How Our PNG to JPG Converter Works
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our browser-based converter processes your PNG files entirely on your device using advanced compression algorithms. Simply drag and drop your PNG images, and our tool will convert them to optimized JPG files in seconds. You can adjust quality settings to find the perfect balance between file size and image quality. Since all processing happens in your browser, your images never leave your computer, ensuring complete privacy and security.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                PNG vs JPG: Understanding the Difference
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                PNG uses lossless compression, meaning no data is lost when saving, but this results in larger files. JPG uses lossy compression, achieving much smaller file sizes by discarding some image data that's less noticeable to the human eye. PNG supports transparency and is ideal for logos, icons, and graphics with text. JPG is optimized for photographs and natural images where the compression artifacts are less visible. Choose PNG when you need transparency or pixel-perfect graphics; choose JPG when you need smaller files for photos and web use.
              </p>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
