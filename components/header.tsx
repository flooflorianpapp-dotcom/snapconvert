"use client"

import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const converterTools = [
  { name: "Image to PDF", href: "/image-to-pdf" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "PNG to PDF", href: "/png-to-pdf" },
  { name: "WEBP to PDF", href: "/webp-to-pdf" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "PDF to PNG", href: "/pdf-to-png" },
  { name: "PNG to JPG", href: "/png-to-jpg" },
  { name: "JPG to PNG", href: "/jpg-to-png" },
  { name: "WEBP to JPG", href: "/webp-to-jpg" },
  { name: "Image Compressor", href: "/image-compressor" },
  { name: "Image Resizer", href: "/image-resizer" },
]

export function Header() {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.jpg" 
            alt="SnapConvert" 
            width={28} 
            height={28} 
            className="rounded"
          />
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
              <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg py-2">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  PDF Tools
                </div>
                {converterTools.slice(0, 6).map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    {tool.name}
                  </a>
                ))}
                <div className="border-t border-border my-2" />
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Image Tools
                </div>
                {converterTools.slice(6).map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    {tool.name}
                  </a>
                ))}
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
                {converterTools.slice(0, 6).map((tool) => (
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
                {converterTools.slice(6).map((tool) => (
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
