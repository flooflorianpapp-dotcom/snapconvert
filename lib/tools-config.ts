// Shared tools configuration - single source of truth for all tool listings
// Update this file when adding new tools to automatically update header, footer, and tools page

export interface Tool {
  name: string
  description: string
  href: string
}

export interface ToolCategory {
  id: string
  title: string
  shortTitle: string
  description: string
  tools: Tool[]
}

export const toolCategories: ToolCategory[] = [
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    shortTitle: "Image to PDF",
    description: "Convert your images into PDF documents for easy sharing and printing.",
    tools: [
      { name: "Image to PDF", description: "Convert any image format to PDF documents", href: "/image-to-pdf" },
      { name: "JPG to PDF", description: "Convert JPG/JPEG images to PDF files", href: "/jpg-to-pdf" },
      { name: "PNG to PDF", description: "Convert PNG images to PDF documents", href: "/png-to-pdf" },
      { name: "WEBP to PDF", description: "Convert WEBP images to PDF format", href: "/webp-to-pdf" },
      { name: "HEIC to PDF", description: "Convert iPhone HEIC photos to PDF", href: "/heic-to-pdf" },
    ],
  },
  {
    id: "image-converters",
    title: "Image Format Converters",
    shortTitle: "Image Converters",
    description: "Change between image formats while preserving quality.",
    tools: [
      { name: "Image to JPG", description: "Convert any image to JPG format", href: "/image-to-jpg" },
      { name: "Image to PNG", description: "Convert any image to PNG format", href: "/image-to-png" },
      { name: "PNG to JPG", description: "Convert PNG images to compressed JPG", href: "/png-to-jpg" },
      { name: "JPG to PNG", description: "Convert JPG to lossless PNG format", href: "/jpg-to-png" },
      { name: "WEBP to JPG", description: "Convert WEBP to universal JPG format", href: "/webp-to-jpg" },
      { name: "WEBP to PNG", description: "Convert WEBP to PNG for editing", href: "/webp-to-png" },
      { name: "WEBP to GIF", description: "Convert WEBP animations to GIF", href: "/webp-to-gif" },
      { name: "HEIC to JPG", description: "Convert iPhone HEIC to JPG format", href: "/heic-to-jpg" },
      { name: "HEIC to PNG", description: "Convert HEIC to lossless PNG", href: "/heic-to-png" },
      { name: "SVG to PNG", description: "Convert vector SVG to raster PNG", href: "/svg-to-png" },
      { name: "SVG to JPG", description: "Convert vector SVG to JPG format", href: "/svg-to-jpg" },
      { name: "BMP to JPG", description: "Convert BMP bitmaps to compressed JPG", href: "/bmp-to-jpg" },
      { name: "BMP to PNG", description: "Convert BMP to PNG with compression", href: "/bmp-to-png" },
      { name: "GIF to JPG", description: "Convert GIF to static JPG image", href: "/gif-to-jpg" },
      { name: "GIF to PNG", description: "Convert GIF to PNG with full colors", href: "/gif-to-png" },
      { name: "TIFF to JPG", description: "Convert TIFF to web-friendly JPG", href: "/tiff-to-jpg" },
      { name: "TIFF to PNG", description: "Convert TIFF to lossless PNG", href: "/tiff-to-png" },
    ],
  },
  {
    id: "pdf-converters",
    title: "PDF Tools",
    shortTitle: "PDF Tools",
    description: "Convert, merge, compress, and work with PDF documents.",
    tools: [
      { name: "PDF to JPG", description: "Extract PDF pages as JPG images", href: "/pdf-to-jpg" },
      { name: "PDF to PNG", description: "Convert PDF pages to PNG images", href: "/pdf-to-png" },
      { name: "Merge PDF", description: "Combine multiple PDF files into one document", href: "/merge-pdf" },
      { name: "Compress PDF", description: "Reduce PDF file size while maintaining quality", href: "/compress-pdf" },
    ],
  },
  {
    id: "image-utilities",
    title: "Image Utilities",
    shortTitle: "Utilities",
    description: "Optimize, resize, and edit your images for any use case.",
    tools: [
      { name: "Image Compressor", description: "Reduce image file size while maintaining quality", href: "/image-compressor" },
      { name: "Image Resizer", description: "Resize images to custom dimensions", href: "/image-resizer" },
    ],
  },
  {
    id: "text-extraction",
    title: "Text Extraction",
    shortTitle: "OCR Tools",
    description: "Extract text from images using OCR technology.",
    tools: [
      { name: "Image to Text (OCR)", description: "Extract text from images using optical character recognition", href: "/image-to-text" },
    ],
  },
]

// Helper to get all tools as a flat array
export function getAllTools(): Tool[] {
  return toolCategories.flatMap((category) => category.tools)
}

// Helper to get a category by ID
export function getCategoryById(id: string): ToolCategory | undefined {
  return toolCategories.find((category) => category.id === id)
}
