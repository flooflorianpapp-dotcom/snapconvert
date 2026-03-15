"use client"

import { ArrowRight, ChevronDown, Menu, X, FileImage } from "lucide-react"
import { useState } from "react"

const pdfTools = [
  { name: "Image to PDF", href: "/image-to-pdf" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "PNG to PDF", href: "/png-to-pdf" },
  { name: "WEBP to PDF", href: "/webp-to-pdf" },
  { name: "HEIC to PDF", href: "/heic-to-pdf" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "PDF to PNG", href: "/pdf-to-png" },
]

const imageTools = [
  { name: "Image to JPG", href: "/image-to-jpg" },
  { name: "Image to PNG", href: "/image-to-png" },
  { name: "Image to Text (OCR)", href: "/image-to-text" },
  { name: "PNG to JPG", href: "/png-to-jpg" },
  { name: "JPG to PNG", href: "/jpg-to-png" },
  { name: "WEBP to JPG", href: "/webp-to-jpg" },
  { name: "WEBP to PNG", href: "/webp-to-png" },
  { name: "WEBP to GIF", href: "/webp-to-gif" },
  { name: "HEIC to JPG", href: "/heic-to-jpg" },
  { name: "HEIC to PNG", href: "/heic-to-png" },
  { name: "SVG to PNG", href: "/svg-to-png" },
  { name: "SVG to JPG", href: "/svg-to-jpg" },
  { name: "BMP to JPG", href: "/bmp-to-jpg" },
  { name: "BMP to PNG", href: "/bmp-to-png" },
  { name: "GIF to JPG", href: "/gif-to-jpg" },
  { name: "GIF to PNG", href: "/gif-to-png" },
  { name: "TIFF to JPG", href: "/tiff-to-jpg" },
  { name: "TIFF to PNG", href: "/tiff-to-png" },
  { name: "Image Compressor", href: "/image-compressor" },
  { name: "Image Resizer", href: "/image-resizer" },
]

export function UnifiedHeader() {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
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
              Tools
              <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? "rotate-180" : ""}`} />
            </button>
            
            <a
              href="/tools"
              className="sr-only focus:not-sr-only focus:absolute focus:top-full focus:mt-2 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
            >
              View All Tools
            </a>
            
            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-[500px] rounded-lg border border-border bg-card shadow-lg py-2">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <div className="px-1 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      PDF Tools
                    </div>
                    {pdfTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="block px-1 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                  <div>
                    <div className="px-1 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Image Tools
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {imageTools.map((tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className="block px-1 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {tool.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-border mx-4 pt-3 pb-2">
                  <a
                    href="/tools"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View All Tools
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="/#why-snapconvert" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Why Us
          </a>
          <a href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
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
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                PDF Tools
              </div>
              <div className="grid grid-cols-2 gap-2">
                {pdfTools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tool.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Image Tools
              </div>
              <div className="grid grid-cols-2 gap-2">
                {imageTools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tool.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <a
                href="/tools"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View All Tools
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <a
                href="/#how-it-works"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="/#why-snapconvert"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why Us
              </a>
              <a
                href="/#faq"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
