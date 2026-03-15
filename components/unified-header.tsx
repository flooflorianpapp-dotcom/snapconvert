"use client"

import { ArrowRight, ChevronDown, Globe, Menu, X, FileImage } from "lucide-react"
import { useState } from "react"
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

const imageToolsBase = [
  { name: "Image to JPG", path: "/image-to-jpg" },
  { name: "Image to PNG", path: "/image-to-png" },
  { name: "PNG to JPG", path: "/png-to-jpg" },
  { name: "JPG to PNG", path: "/jpg-to-png" },
  { name: "WEBP to JPG", path: "/webp-to-jpg" },
  { name: "WEBP to PNG", path: "/webp-to-png" },
  { name: "WEBP to GIF", path: "/webp-to-gif" },
  { name: "HEIC to JPG", path: "/heic-to-jpg" },
  { name: "HEIC to PNG", path: "/heic-to-png" },
  { name: "SVG to PNG", path: "/svg-to-png" },
  { name: "SVG to JPG", path: "/svg-to-jpg" },
  { name: "BMP to JPG", path: "/bmp-to-jpg" },
  { name: "BMP to PNG", path: "/bmp-to-png" },
  { name: "GIF to JPG", path: "/gif-to-jpg" },
  { name: "GIF to PNG", path: "/gif-to-png" },
  { name: "TIFF to JPG", path: "/tiff-to-jpg" },
  { name: "TIFF to PNG", path: "/tiff-to-png" },
  { name: "Image Compressor", path: "/image-compressor" },
  { name: "Image Resizer", path: "/image-resizer" },
]

const labels = {
  en: {
    tools: "Tools",
    howItWorks: "How It Works",
    whyUs: "Why Us",
    faq: "FAQ",
    viewAllTools: "View All Tools",
    pdfTools: "PDF Tools",
    imageTools: "Image Tools",
  },
  hu: {
    tools: "Eszközök",
    howItWorks: "Hogyan Működik",
    whyUs: "Miért Mi",
    faq: "GYIK",
    viewAllTools: "Összes Eszköz",
    pdfTools: "PDF Eszközök",
    imageTools: "Kép Eszközök",
  },
}

export function UnifiedHeader() {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { locale, getLocalizedUrl } = useLanguage()
  const pathname = usePathname()
  
  const t = labels[locale]
  const homeUrl = locale === "hu" ? "/hu" : "/"
  const toolsUrl = getLocalizedUrl("/tools")
  
  const enUrl = getAlternateUrl(pathname, "en")
  const huUrl = getAlternateUrl(pathname, "hu")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href={homeUrl} className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <FileImage className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">SnapConvert</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              onBlur={() => setTimeout(() => setIsToolsOpen(false), 150)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.tools}
              <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? "rotate-180" : ""}`} />
            </button>
            
            <a
              href={toolsUrl}
              className="sr-only focus:not-sr-only focus:absolute focus:top-full focus:mt-2 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
            >
              {t.viewAllTools}
            </a>
            
            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-[500px] rounded-lg border border-border bg-card shadow-lg py-2">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <div className="px-1 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t.pdfTools}
                    </div>
                    {pdfToolsBase.map((tool) => (
                      <a
                        key={tool.path}
                        href={getLocalizedUrl(tool.path)}
                        className="block px-1 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {getToolName(tool.name, locale)}
                      </a>
                    ))}
                  </div>
                  <div>
                    <div className="px-1 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t.imageTools}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {imageToolsBase.map((tool) => (
                        <a
                          key={tool.path}
                          href={getLocalizedUrl(tool.path)}
                          className="block px-1 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {getToolName(tool.name, locale)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-border mx-4 pt-3 pb-2">
                  <a
                    href={toolsUrl}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t.viewAllTools}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <a href={`${homeUrl}#how-it-works`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.howItWorks}
          </a>
          <a href={`${homeUrl}#why-snapconvert`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.whyUs}
          </a>
          <a href={`${homeUrl}#faq`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.faq}
          </a>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              onBlur={() => setTimeout(() => setIsLangOpen(false), 150)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              {locale.toUpperCase()}
              <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 rounded-lg border border-border bg-card shadow-lg py-1">
                <a
                  href={enUrl}
                  className={`block px-3 py-2 text-sm hover:bg-secondary transition-colors ${locale === "en" ? "text-primary font-medium" : "text-foreground"}`}
                >
                  EN
                </a>
                <a
                  href={huUrl}
                  className={`block px-3 py-2 text-sm hover:bg-secondary transition-colors ${locale === "hu" ? "text-primary font-medium" : "text-foreground"}`}
                >
                  HU
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-4">
            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a 
                href={enUrl} 
                className={`text-sm ${locale === "en" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href={huUrl} 
                className={`text-sm ${locale === "hu" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                HU
              </a>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {t.pdfTools}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {pdfToolsBase.map((tool) => (
                  <a
                    key={tool.path}
                    href={getLocalizedUrl(tool.path)}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getToolName(tool.name, locale)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {t.imageTools}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {imageToolsBase.map((tool) => (
                  <a
                    key={tool.path}
                    href={getLocalizedUrl(tool.path)}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getToolName(tool.name, locale)}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <a
                href={toolsUrl}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.viewAllTools}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <a
                href={`${homeUrl}#how-it-works`}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.howItWorks}
              </a>
              <a
                href={`${homeUrl}#why-snapconvert`}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.whyUs}
              </a>
              <a
                href={`${homeUrl}#faq`}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.faq}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
