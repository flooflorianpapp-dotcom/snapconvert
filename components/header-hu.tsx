"use client"

import { ArrowRight, ChevronDown, Menu, X, Globe, FileImage } from "lucide-react"
import { useState } from "react"
import { getToolName } from "@/lib/i18n"

const pdfTools = [
  { name: "Image to PDF", href: "/hu/image-to-pdf" },
  { name: "PDF to JPG", href: "/hu/pdf-to-jpg" },
]

const imageTools = [
  { name: "PNG to JPG", href: "/hu/png-to-jpg" },
  { name: "JPG to PNG", href: "/hu/jpg-to-png" },
  { name: "WEBP to JPG", href: "/hu/webp-to-jpg" },
  { name: "HEIC to JPG", href: "/hu/heic-to-jpg" },
  { name: "Image Compressor", href: "/hu/image-compressor" },
  { name: "Image Resizer", href: "/hu/image-resizer" },
]

export function HeaderHu() {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/hu" className="flex items-center gap-2">
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
              Eszközök
              <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? "rotate-180" : ""}`} />
            </button>
            
            <a
              href="/hu/tools"
              className="sr-only focus:not-sr-only focus:absolute focus:top-full focus:mt-2 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
            >
              Összes Eszköz
            </a>
            
            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-[500px] rounded-lg border border-border bg-card shadow-lg py-2">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <div className="px-1 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      PDF Eszközök
                    </div>
                    {pdfTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="block px-1 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {getToolName(tool.name, 'hu')}
                      </a>
                    ))}
                  </div>
                  <div>
                    <div className="px-1 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Kép Eszközök
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {imageTools.map((tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className="block px-1 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {getToolName(tool.name, 'hu')}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-border mx-4 pt-3 pb-2">
                  <a
                    href="/hu/tools"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Összes Eszköz
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <a href="/hu#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Hogyan Működik
          </a>
          <a href="/hu#why-snapconvert" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Miért Mi
          </a>
          <a href="/hu#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            GYIK
          </a>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              onBlur={() => setTimeout(() => setIsLangOpen(false), 150)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              HU
              <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 rounded-lg border border-border bg-card shadow-lg py-1">
                <a
                  href="/"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  EN
                </a>
                <a
                  href="/hu"
                  className="block px-3 py-2 text-sm text-primary font-medium hover:bg-secondary transition-colors"
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
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">EN</a>
              <span className="text-muted-foreground">|</span>
              <a href="/hu" className="text-sm text-primary font-medium">HU</a>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                PDF Eszközök
              </div>
              <div className="grid grid-cols-2 gap-2">
                {pdfTools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getToolName(tool.name, 'hu')}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Kép Eszközök
              </div>
              <div className="grid grid-cols-2 gap-2">
                {imageTools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getToolName(tool.name, 'hu')}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <a
                href="/hu/tools"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Összes Eszköz
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <a
                href="/hu#how-it-works"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hogyan Működik
              </a>
              <a
                href="/hu#why-snapconvert"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Miért Mi
              </a>
              <a
                href="/hu#faq"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GYIK
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
