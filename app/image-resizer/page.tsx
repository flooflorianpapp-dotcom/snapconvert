import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageResizer } from "@/components/image-resizer"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "Image Resizer - Free Online Tool | SnapConvert",
  description: "Resize images online for free. Change dimensions to any size with presets for social media. No sign-up required, your files stay private in your browser.",
  keywords: ["image resizer", "resize images", "change image size", "image dimensions", "resize for social media", "bulk resize"],
  openGraph: {
    title: "Image Resizer - Free Online Tool",
    description: "Resize images online for free. Change dimensions to any size you need.",
    type: "website",
  },
}

export default function ImageResizerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Image Resizer
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Resize your images to any dimension you need. Use presets for social media or enter custom sizes. Perfect for profile pictures, thumbnails, and more.
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
            <ImageResizer />
          </div>
        </section>

        <HowToConvert formatName="Resize Images" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Resize Your Images?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get the perfect dimensions for any platform or use case
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Social Media Ready</h3>
                <p className="mt-2 text-sm text-muted-foreground">Use presets for Instagram, Twitter, Facebook, and more.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Instagram squares
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Twitter headers
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Aspect Ratio Control</h3>
                <p className="mt-2 text-sm text-muted-foreground">Lock or unlock aspect ratio for precise control over dimensions.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Maintain proportions
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Custom cropping
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Batch Processing</h3>
                <p className="mt-2 text-sm text-muted-foreground">Resize multiple images at once to the same dimensions.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Multiple files
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Consistent output
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="Image Resizing" formatExtension="images" />
      </main>
      <Footer />
    </div>
  )
}
