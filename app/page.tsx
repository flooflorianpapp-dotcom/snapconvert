import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ArrowRight, Upload, Zap, Download, Lock, Clock, UserX, Gift, FileImage, FileText, Image, ScanText } from "lucide-react"

const featuredTools = [
  {
    name: "Image to PDF",
    description: "Convert images to PDF documents",
    href: "/image-to-pdf",
    icon: FileImage,
  },
  {
    name: "PNG to JPG",
    description: "Convert PNG images to JPG format",
    href: "/png-to-jpg",
    icon: Image,
  },
  {
    name: "JPG to PNG",
    description: "Convert JPG images to PNG format",
    href: "/jpg-to-png",
    icon: Image,
  },
  {
    name: "WEBP to JPG",
    description: "Convert WEBP images to JPG",
    href: "/webp-to-jpg",
    icon: Image,
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDFs into one",
    href: "/merge-pdf",
    icon: FileText,
  },
  {
    name: "Image to Text",
    description: "Extract text from images with OCR",
    href: "/image-to-text",
    icon: ScanText,
  },
]

const steps = [
  {
    icon: Upload,
    title: "Upload your file",
    description: "Drag and drop or click to select your file",
  },
  {
    icon: Zap,
    title: "Convert instantly",
    description: "Processing happens right in your browser",
  },
  {
    icon: Download,
    title: "Download the result",
    description: "Get your converted file immediately",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Fast conversion",
    description: "Convert files in seconds with optimized processing",
  },
  {
    icon: Lock,
    title: "Private",
    description: "Files stay in your browser and are never uploaded to servers",
  },
  {
    icon: UserX,
    title: "No signup required",
    description: "Start converting immediately without creating an account",
  },
  {
    icon: Gift,
    title: "Free to use",
    description: "All tools are completely free with no hidden fees",
  },
]

const formats = ["JPG", "PNG", "WEBP", "PDF", "HEIC", "SVG", "GIF", "BMP", "TIFF"]

const faqs = [
  {
    question: "Is SnapConvert really free?",
    answer: "Yes, all our conversion tools are completely free to use with no hidden fees or limitations.",
  },
  {
    question: "Are my files secure?",
    answer: "Absolutely. All file processing happens directly in your browser. Your files are never uploaded to our servers, ensuring complete privacy.",
  },
  {
    question: "What file formats are supported?",
    answer: "We support a wide range of formats including JPG, PNG, WEBP, PDF, HEIC, SVG, GIF, BMP, and TIFF.",
  },
  {
    question: "Is there a file size limit?",
    answer: "Since processing happens in your browser, the limit depends on your device. Most modern devices can handle files up to 50MB without issues.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required. You can start using all our tools immediately without signing up.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <UnifiedHeader />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Free Online File Converter
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert images, PDFs and documents instantly in your browser. Fast, simple and private.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/tools"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Converting
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/tools"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                View All Tools
              </a>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Popular Tools</h2>
              <p className="mt-3 text-muted-foreground">Our most used conversion tools</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTools.map((tool) => {
                const IconComponent = tool.icon
                return (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <a
                href="/tools"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all tools
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How It Works</h2>
              <p className="mt-3 text-muted-foreground">Convert files in three simple steps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why SnapConvert Section */}
        <section id="why-snapconvert" className="py-20 px-4 bg-muted/30">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why SnapConvert</h2>
              <p className="mt-3 text-muted-foreground">The smart choice for file conversion</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="p-5 rounded-xl border border-border bg-card">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Supported Formats Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Supported Formats</h2>
              <p className="mt-3 text-muted-foreground">Convert between all popular image and document formats</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {formats.map((format) => (
                <div
                  key={format}
                  className="px-5 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground"
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 bg-muted/30">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="mt-3 text-muted-foreground">Everything you need to know about SnapConvert</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <UnifiedFooter />
    </main>
  )
}
