"use client"

import { ArrowRight, ChevronDown, Menu, X, FileImage, Sparkles, Image, FileText, ScanText } from "lucide-react"
import { useState } from "react"

// Curated tools for the header dropdown - only show the most important tools
// Full list remains on /tools page via tools-config.ts
const curatedTools = {
  popular: {
    title: "Popular",
    icon: Sparkles,
    tools: [
      { name: "Image to PDF", href: "/image-to-pdf" },
      { name: "PDF to JPG", href: "/pdf-to-jpg" },
      { name: "PNG to JPG", href: "/png-to-jpg" },
      { name: "Compress PDF", href: "/compress-pdf" },
    ],
  },
  image: {
    title: "Image Tools",
    icon: Image,
    tools: [
      { name: "Image Compressor", href: "/image-compressor" },
      { name: "Image Resizer", href: "/image-resizer" },
      { name: "JPG to PNG", href: "/jpg-to-png" },
      { name: "HEIC to JPG", href: "/heic-to-jpg" },
    ],
  },
  pdf: {
    title: "PDF Tools",
    icon: FileText,
    tools: [
      { name: "Merge PDF", href: "/merge-pdf" },
      { name: "PDF to PNG", href: "/pdf-to-png" },
      { name: "JPG to PDF", href: "/jpg-to-pdf" },
      { name: "PNG to PDF", href: "/png-to-pdf" },
    ],
  },
  ocr: {
    title: "OCR Tools",
    icon: ScanText,
    tools: [
      { name: "Image to Text", href: "/image-to-text" },
    ],
  },
}

export function UnifiedHeader() {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = Object.values(curatedTools)

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
            
            {isToolsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] rounded-lg border border-border bg-card shadow-lg p-4">
                <div className="grid grid-cols-4 gap-6">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <div key={category.title}>
                        <div className="flex items-center gap-1.5 mb-3">
                          <IconComponent className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                            {category.title}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {category.tools.map((tool) => (
                            <a
                              key={tool.href}
                              href={tool.href}
                              className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {tool.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t border-border mt-4 pt-3">
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
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-5">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.title}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <IconComponent className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      {category.title}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {category.tools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
            
            <div className="border-t border-border pt-4">
              <a
                href="/tools"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
