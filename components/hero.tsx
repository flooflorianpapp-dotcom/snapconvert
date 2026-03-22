"use client"

import { FileImage, ArrowRight, Image, Minimize, Crop, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredTools = [
  {
    name: "Image Compressor",
    description: "Reduce image file size while keeping quality",
    href: "/image-compressor",
    icon: Minimize,
  },
  {
    name: "Image Resizer",
    description: "Resize images to custom dimensions",
    href: "/image-resizer",
    icon: Image,
  },
  {
    name: "Image to JPG",
    description: "Convert any image to JPG format",
    href: "/image-to-jpg",
    icon: Image,
  },
  {
    name: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    href: "/jpg-to-pdf",
    icon: FileImage,
  },
  {
    name: "PDF to JPG",
    description: "Extract PDF pages as JPG images",
    href: "/pdf-to-jpg",
    icon: FileText,
  },
  {
    name: "Crop Image",
    description: "Visually crop and trim your images",
    href: "/crop-image",
    icon: Crop,
  },
]

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-5xl">
        {/* Hero Text */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Free Online File Converter
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Convert images, PDFs and documents instantly in your browser. Fast, simple and private.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2 px-8 py-6 text-base font-medium">
            <a href="/tools">
              Start Converting
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 px-8 py-6 text-base font-medium">
            <a href="/tools">
              View All Tools
            </a>
          </Button>
        </div>

        {/* Featured Tools Grid */}
        <div className="mt-16">
          <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-8">
            Popular Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
