import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ArrowRight, FileImage, FileType, Image, Maximize, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Tools - Free Image & PDF Converters | SnapConvert",
  description:
    "Browse all SnapConvert tools. Convert images to PDF, change image formats, compress images, and more. Free, fast, and secure online converters.",
  keywords: [
    "image converter",
    "pdf converter",
    "image to pdf",
    "jpg to png",
    "image compressor",
    "image resizer",
    "free converter",
  ],
}

const imageToPdfTools = [
  {
    name: "Image to PDF",
    description: "Convert any image format to PDF documents",
    href: "/image-to-pdf",
  },
  {
    name: "JPG to PDF",
    description: "Convert JPG/JPEG images to PDF files",
    href: "/jpg-to-pdf",
  },
  {
    name: "PNG to PDF",
    description: "Convert PNG images to PDF documents",
    href: "/png-to-pdf",
  },
  {
    name: "WEBP to PDF",
    description: "Convert WEBP images to PDF format",
    href: "/webp-to-pdf",
  },
  {
    name: "HEIC to PDF",
    description: "Convert iPhone HEIC photos to PDF",
    href: "/heic-to-pdf",
  },
]

const imageFormatConverters = [
  {
    name: "Image to JPG",
    description: "Convert any image to JPG format",
    href: "/image-to-jpg",
  },
  {
    name: "Image to PNG",
    description: "Convert any image to PNG format",
    href: "/image-to-png",
  },
  {
    name: "PNG to JPG",
    description: "Convert PNG images to compressed JPG",
    href: "/png-to-jpg",
  },
  {
    name: "JPG to PNG",
    description: "Convert JPG to lossless PNG format",
    href: "/jpg-to-png",
  },
  {
    name: "WEBP to JPG",
    description: "Convert WEBP to universal JPG format",
    href: "/webp-to-jpg",
  },
  {
    name: "WEBP to PNG",
    description: "Convert WEBP to PNG for editing",
    href: "/webp-to-png",
  },
  {
    name: "WEBP to GIF",
    description: "Convert WEBP animations to GIF",
    href: "/webp-to-gif",
  },
  {
    name: "HEIC to JPG",
    description: "Convert iPhone HEIC to JPG format",
    href: "/heic-to-jpg",
  },
  {
    name: "HEIC to PNG",
    description: "Convert HEIC to lossless PNG",
    href: "/heic-to-png",
  },
  {
    name: "SVG to PNG",
    description: "Convert vector SVG to raster PNG",
    href: "/svg-to-png",
  },
  {
    name: "SVG to JPG",
    description: "Convert vector SVG to JPG format",
    href: "/svg-to-jpg",
  },
  {
    name: "BMP to JPG",
    description: "Convert BMP bitmaps to compressed JPG",
    href: "/bmp-to-jpg",
  },
  {
    name: "BMP to PNG",
    description: "Convert BMP to PNG with compression",
    href: "/bmp-to-png",
  },
  {
    name: "GIF to JPG",
    description: "Convert GIF to static JPG image",
    href: "/gif-to-jpg",
  },
  {
    name: "GIF to PNG",
    description: "Convert GIF to PNG with full colors",
    href: "/gif-to-png",
  },
  {
    name: "TIFF to JPG",
    description: "Convert TIFF to web-friendly JPG",
    href: "/tiff-to-jpg",
  },
  {
    name: "TIFF to PNG",
    description: "Convert TIFF to lossless PNG",
    href: "/tiff-to-png",
  },
]

const pdfConverters = [
  {
    name: "PDF to JPG",
    description: "Extract PDF pages as JPG images",
    href: "/pdf-to-jpg",
  },
  {
    name: "PDF to PNG",
    description: "Convert PDF pages to PNG images",
    href: "/pdf-to-png",
  },
]

const imageUtilities = [
  {
    name: "Image Compressor",
    description: "Reduce image file size while maintaining quality",
    href: "/image-compressor",
  },
  {
    name: "Image Resizer",
    description: "Resize images to custom dimensions",
    href: "/image-resizer",
  },
]

const textTools = [
  {
    name: "Image to Text (OCR)",
    description: "Extract text from images using optical character recognition",
    href: "/image-to-text",
  },
]

interface ToolCardProps {
  name: string
  description: string
  href: string
}

function ToolCard({ name, description, href }: ToolCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Use Tool
        <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </a>
  )
}

interface ToolSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  tools: ToolCardProps[]
}

function ToolSection({ title, description, icon, tools }: ToolSectionProps) {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-muted-foreground mb-6 ml-13">{description}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </section>
  )
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background">
      <UnifiedHeader />
      <div className="pt-16">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              All Tools
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of free image and PDF conversion tools. 
              Fast, secure, and processed entirely in your browser.
            </p>
          </div>

          <ToolSection
            title="Image to PDF"
            description="Convert your images into PDF documents for easy sharing and printing."
            icon={<FileType className="h-5 w-5" />}
            tools={imageToPdfTools}
          />

          <div className="border-t border-border" />

          <ToolSection
            title="Image Format Converters"
            description="Change between image formats while preserving quality."
            icon={<Image className="h-5 w-5" />}
            tools={imageFormatConverters}
          />

          <div className="border-t border-border" />

          <ToolSection
            title="PDF Converters"
            description="Extract images from PDF documents in various formats."
            icon={<FileImage className="h-5 w-5" />}
            tools={pdfConverters}
          />

          <div className="border-t border-border" />

          <ToolSection
            title="Image Utilities"
            description="Optimize and resize your images for any use case."
            icon={<Maximize className="h-5 w-5" />}
            tools={imageUtilities}
          />

          <div className="border-t border-border" />

          <ToolSection
            title="Text Extraction"
            description="Extract text from images using OCR technology."
            icon={<FileText className="h-5 w-5" />}
            tools={textTools}
          />
        </div>
      </div>
      <UnifiedFooter />
    </main>
  )
}
