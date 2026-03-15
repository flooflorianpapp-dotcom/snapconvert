import { Metadata } from "next"
import { Shield, Zap, Lock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormatConverter } from "@/components/format-converter"
import { HowToConvert } from "@/components/how-to-convert"
import { FormatFAQ } from "@/components/format-faq"

export const metadata: Metadata = {
  title: "GIF to JPG Converter - Free Online Tool | SnapConvert",
  description: "Convert GIF images to JPG format online for free. Extract static images from animated GIFs. No sign-up required, your files stay private in your browser.",
  keywords: ["GIF to JPG", "GIF to JPEG", "convert GIF to JPG", "GIF converter", "animated GIF to static"],
  openGraph: {
    title: "GIF to JPG Converter - Free Online Tool",
    description: "Convert GIF images to JPG format online for free. Fast, secure, and private.",
    type: "website",
  },
}

export default function GifToJpgPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              GIF to JPG Converter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert your GIF images to JPG format for static images with smaller file sizes. Extract the first frame from animated GIFs or convert static GIFs to JPG.
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
              inputFormats={["image/gif"]}
              outputFormat="jpeg"
              inputLabel="GIF"
              outputLabel="JPG"
            />
          </div>
        </section>

        <HowToConvert formatName="GIF to JPG" />

        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Convert GIF to JPG?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                JPG provides smaller files and better photo quality than GIF
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Smaller Files</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG compression creates smaller files than GIF for photos.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Efficient compression
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Faster loading
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">Better Colors</h3>
                <p className="mt-2 text-sm text-muted-foreground">JPG supports millions of colors vs GIF's 256 color limit.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    16 million colors
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Smooth gradients
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-foreground">Static Image</h3>
                <p className="mt-2 text-sm text-muted-foreground">Extract a static image from animated GIFs when needed.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    First frame capture
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Thumbnail ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FormatFAQ formatName="GIF to JPG" formatExtension=".gif" />
      </main>
      <Footer />
    </div>
  )
}
