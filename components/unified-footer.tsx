"use client"

import { FileImage } from "lucide-react"
import { toolCategories } from "@/lib/tools-config"

export function UnifiedFooter() {
  const currentYear = new Date().getFullYear()

  // Get specific categories for footer layout
  const imageToPdf = toolCategories.find(c => c.id === "image-to-pdf")
  const pdfConverters = toolCategories.find(c => c.id === "pdf-converters")
  const imageConverters = toolCategories.find(c => c.id === "image-converters")
  const utilities = toolCategories.find(c => c.id === "image-utilities")
  const textExtraction = toolCategories.find(c => c.id === "text-extraction")

  // Combine PDF-related tools
  const pdfTools = [
    ...(imageToPdf?.tools || []),
    ...(pdfConverters?.tools || []),
  ]

  // Split image converters for better layout
  const imageConvertersList = imageConverters?.tools || []
  const firstHalf = imageConvertersList.slice(0, 8)
  const secondHalf = imageConvertersList.slice(8)

  // Combine utilities and OCR
  const utilityAndOcrTools = [
    ...(utilities?.tools || []),
    ...(textExtraction?.tools || []),
  ]

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
                  <a 
                    href={tool.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Image Converters</h3>
            <ul className="space-y-2">
              {firstHalf.map((tool) => (
                <li key={tool.href}>
                  <a 
                    href={tool.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">More Converters</h3>
            <ul className="space-y-2">
              {secondHalf.map((tool) => (
                <li key={tool.href}>
                  <a 
                    href={tool.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Utilities & OCR</h3>
            <ul className="space-y-2">
              {utilityAndOcrTools.map((tool) => (
                <li key={tool.href}>
                  <a 
                    href={tool.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/tools" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Tools
                </a>
              </li>
              <li>
                <a 
                  href="/#how-it-works" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="/#faq" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
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
