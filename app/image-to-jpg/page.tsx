import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormatConverter } from "@/components/format-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "Image to JPG Converter - Free Online Tool | SnapConvert",
  description: "Convert any image to JPG format online for free. Support for PNG, WEBP, GIF, BMP, TIFF and more. No sign-up required, your files stay private in your browser.",
  keywords: ["image to JPG", "convert to JPG", "PNG to JPG", "WEBP to JPG", "any image to JPEG", "universal image converter"],
  openGraph: {
    title: "Image to JPG Converter - Free Online Tool",
    description: "Convert any image to JPG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function ImageToJpgPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Image to JPG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert any image format to JPG. Support for PNG, WEBP, GIF, BMP, TIFF, and more. Get universally compatible images with optimal file sizes.
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
              inputFormats={["image/png", "image/webp", "image/gif", "image/bmp", "image/tiff", "image/tif", "image/svg+xml"]}
              outputFormat="jpeg"
              inputLabel="Image"
              outputLabel="JPG"
            />
          </div>
        </section>

        <HowToConvert formatName="Image to JPG" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert to JPG?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                JPG is the most widely supported image format
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Universal Format</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG works on every device, browser, and application.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    100% compatible
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    No plugins needed
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Smaller Files</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG compression creates compact files for easy sharing.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Fast uploads
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Email friendly
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Multi-Format Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">Convert from PNG, WEBP, GIF, BMP, TIFF, SVG and more.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Any format
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    One tool
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="Image to JPG" formatExtension="any image" />
      </main>
      <Footer />
    </div>
  )
}
