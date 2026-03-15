"use client"

import { FileImage, Globe } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLanguage, getAlternateUrl } from "./language-provider"
import { getToolName } from "@/lib/i18n"

const pdfToolsBase = [
  { name: "Image to PDF", path: "/image-to-pdf" },
  { name: "JPG to PDF", path: "/jpg-to-pdf" },
  { name: "PNG to PDF", path: "/png-to-pdf" },
  { name: "WEBP to PDF", path: "/webp-to-pdf" },
  { name: "HEIC to PDF", path: "/heic-to-pdf" },
  { name: "PDF to JPG", path: "/pdf-to-jpg" },
  { name: "PDF to PNG", path: "/pdf-to-png" },
]

const imageConvertersBase = [
  { name: "Image to JPG", path: "/image-to-jpg" },
  { name: "Image to PNG", path: "/image-to-png" },
  { name: "PNG to JPG", path: "/png-to-jpg" },
  { name: "JPG to PNG", path: "/jpg-to-png" },
  { name: "WEBP to JPG", path: "/webp-to-jpg" },
  { name: "WEBP to PNG", path: "/webp-to-png" },
  { name: "HEIC to JPG", path: "/heic-to-jpg" },
  { name: "HEIC to PNG", path: "/heic-to-png" },
]

const moreConvertersBase = [
  { name: "SVG to PNG", path: "/svg-to-png" },
  { name: "SVG to JPG", path: "/svg-to-jpg" },
  { name: "BMP to JPG", path: "/bmp-to-jpg" },
  { name: "BMP to PNG", path: "/bmp-to-png" },
  { name: "GIF to JPG", path: "/gif-to-jpg" },
  { name: "GIF to PNG", path: "/gif-to-png" },
  { name: "TIFF to JPG", path: "/tiff-to-jpg" },
  { name: "TIFF to PNG", path: "/tiff-to-png" },
  { name: "WEBP to GIF", path: "/webp-to-gif" },
]

const utilityToolsBase = [
  { name: "Image Compressor", path: "/image-compressor" },
  { name: "Image Resizer", path: "/image-resizer" },
]

const labels = {
  en: {
    tagline: "Free online image converter tools. Fast, secure, and private.",
    pdfTools: "PDF Tools",
    imageConverters: "Image Converters",
    moreConverters: "More Converters",
    utilities: "Utilities",
    resources: "Resources",
    howItWorks: "How It Works",
    faq: "FAQ",
    allRightsReserved: "All rights reserved.",
  },
  hu: {
    tagline: "Ingyenes online képkonvertáló eszközök. Gyors, biztonságos és privát.",
    pdfTools: "PDF Eszközök",
    imageConverters: "Képkonvertálók",
    moreConverters: "További Konvertálók",
    utilities: "Segédeszközök",
    resources: "Források",
    howItWorks: "Hogyan Működik",
    faq: "GYIK",
    allRightsReserved: "Minden jog fenntartva.",
  },
}

export function UnifiedFooter() {
  const currentYear = new Date().getFullYear()
  const { locale, getLocalizedUrl } = useLanguage()
  const pathname = usePathname()
  
  const t = labels[locale]
  const homeUrl = locale === "hu" ? "/hu" : "/"
  
  const enUrl = getAlternateUrl(pathname, "en")
  const huUrl = getAlternateUrl(pathname, "hu")

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
              {t.tagline}
            </p>
            {/* Language Switcher */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a 
                href={enUrl} 
                className={locale === "en" ? "text-primary font-medium" : "hover:text-foreground transition-colors"}
              >
                EN
              </a>
              <span>|</span>
              <a 
                href={huUrl} 
                className={locale === "hu" ? "text-primary font-medium" : "hover:text-foreground transition-colors"}
              >
                HU
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.pdfTools}</h3>
            <ul className="space-y-2">
              {pdfToolsBase.map((tool) => (
                <li key={tool.path}>
                  <a 
                    href={getLocalizedUrl(tool.path)} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getToolName(tool.name, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.imageConverters}</h3>
            <ul className="space-y-2">
              {imageConvertersBase.map((tool) => (
                <li key={tool.path}>
                  <a 
                    href={getLocalizedUrl(tool.path)} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getToolName(tool.name, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.moreConverters}</h3>
            <ul className="space-y-2">
              {moreConvertersBase.map((tool) => (
                <li key={tool.path}>
                  <a 
                    href={getLocalizedUrl(tool.path)} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getToolName(tool.name, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.utilities}</h3>
            <ul className="space-y-2">
              {utilityToolsBase.map((tool) => (
                <li key={tool.path}>
                  <a 
                    href={getLocalizedUrl(tool.path)} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getToolName(tool.name, locale)}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">{t.resources}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`${homeUrl}#how-it-works`} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.howItWorks}
                </a>
              </li>
              <li>
                <a 
                  href={`${homeUrl}#faq`} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.faq}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {currentYear} SnapConvert. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
