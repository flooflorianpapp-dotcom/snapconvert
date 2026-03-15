import { FileImage } from "lucide-react"

const pdfTools = [
  { name: "Image to PDF", href: "/image-to-pdf" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "PNG to PDF", href: "/png-to-pdf" },
  { name: "WEBP to PDF", href: "/webp-to-pdf" },
  { name: "HEIC to PDF", href: "/heic-to-pdf" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "PDF to PNG", href: "/pdf-to-png" },
]

const imageConverters = [
  { name: "Image to JPG", href: "/image-to-jpg" },
  { name: "Image to PNG", href: "/image-to-png" },
  { name: "PNG to JPG", href: "/png-to-jpg" },
  { name: "JPG to PNG", href: "/jpg-to-png" },
  { name: "WEBP to JPG", href: "/webp-to-jpg" },
  { name: "WEBP to PNG", href: "/webp-to-png" },
  { name: "HEIC to JPG", href: "/heic-to-jpg" },
  { name: "HEIC to PNG", href: "/heic-to-png" },
]

const moreConverters = [
  { name: "SVG to PNG", href: "/svg-to-png" },
  { name: "SVG to JPG", href: "/svg-to-jpg" },
  { name: "BMP to JPG", href: "/bmp-to-jpg" },
  { name: "BMP to PNG", href: "/bmp-to-png" },
  { name: "GIF to JPG", href: "/gif-to-jpg" },
  { name: "GIF to PNG", href: "/gif-to-png" },
  { name: "TIFF to JPG", href: "/tiff-to-jpg" },
  { name: "TIFF to PNG", href: "/tiff-to-png" },
  { name: "WEBP to GIF", href: "/webp-to-gif" },
]

const utilityTools = [
  { name: "Image Compressor", href: "/image-compressor" },
  { name: "Image Resizer", href: "/image-resizer" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <FileImage className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">SnapConvert</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free online image converter tools. Fast, secure, and private.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">PDF Tools</h3>
            <ul className="space-y-2">
              {pdfTools.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Image Converters</h3>
            <ul className="space-y-2">
              {imageConverters.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">More Converters</h3>
            <ul className="space-y-2">
              {moreConverters.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Utilities</h3>
            <ul className="space-y-2">
              {utilityTools.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {currentYear} SnapConvert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
