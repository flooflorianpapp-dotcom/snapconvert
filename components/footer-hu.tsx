import { FileImage, Globe } from "lucide-react"
import { getToolName } from "@/lib/i18n"

const pdfTools = [
  { name: "Image to PDF", href: "/hu/image-to-pdf" },
  { name: "JPG to PDF", href: "/hu/jpg-to-pdf" },
  { name: "PNG to PDF", href: "/hu/png-to-pdf" },
  { name: "WEBP to PDF", href: "/hu/webp-to-pdf" },
  { name: "HEIC to PDF", href: "/hu/heic-to-pdf" },
  { name: "PDF to JPG", href: "/hu/pdf-to-jpg" },
  { name: "PDF to PNG", href: "/hu/pdf-to-png" },
]

const imageConverters = [
  { name: "Image to JPG", href: "/hu/image-to-jpg" },
  { name: "Image to PNG", href: "/hu/image-to-png" },
  { name: "PNG to JPG", href: "/hu/png-to-jpg" },
  { name: "JPG to PNG", href: "/hu/jpg-to-png" },
  { name: "WEBP to JPG", href: "/hu/webp-to-jpg" },
  { name: "WEBP to PNG", href: "/hu/webp-to-png" },
  { name: "HEIC to JPG", href: "/hu/heic-to-jpg" },
  { name: "HEIC to PNG", href: "/hu/heic-to-png" },
]

const moreConverters = [
  { name: "SVG to PNG", href: "/hu/svg-to-png" },
  { name: "SVG to JPG", href: "/hu/svg-to-jpg" },
  { name: "BMP to JPG", href: "/hu/bmp-to-jpg" },
  { name: "BMP to PNG", href: "/hu/bmp-to-png" },
  { name: "GIF to JPG", href: "/hu/gif-to-jpg" },
  { name: "GIF to PNG", href: "/hu/gif-to-png" },
  { name: "TIFF to JPG", href: "/hu/tiff-to-jpg" },
  { name: "TIFF to PNG", href: "/hu/tiff-to-png" },
  { name: "WEBP to GIF", href: "/hu/webp-to-gif" },
]

const utilityTools = [
  { name: "Image Compressor", href: "/hu/image-compressor" },
  { name: "Image Resizer", href: "/hu/image-resizer" },
]

export function FooterHu() {
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
              Ingyenes online képkonvertáló eszközök. Gyors, biztonságos és privát.
            </p>
            {/* Language Switcher */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a href="/" className="hover:text-foreground transition-colors">EN</a>
              <span>|</span>
              <a href="/hu" className="text-primary font-medium">HU</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">PDF Eszközök</h3>
            <ul className="space-y-2">
              {pdfTools.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {getToolName(tool.name, 'hu')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Képkonvertálók</h3>
            <ul className="space-y-2">
              {imageConverters.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {getToolName(tool.name, 'hu')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">További Konvertálók</h3>
            <ul className="space-y-2">
              {moreConverters.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {getToolName(tool.name, 'hu')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Segédeszközök</h3>
            <ul className="space-y-2">
              {utilityTools.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {getToolName(tool.name, 'hu')}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">Források</h3>
            <ul className="space-y-2">
              <li>
                <a href="/hu#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hogyan Működik
                </a>
              </li>
              <li>
                <a href="/hu#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  GYIK
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {currentYear} SnapConvert. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  )
}
