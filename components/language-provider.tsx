"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"

export type Locale = "en" | "hu"

// Pages that exist in Hungarian
const huPages = new Set([
  "/hu",
  "/hu/tools",
  "/hu/image-to-pdf",
  "/hu/jpg-to-png",
  "/hu/png-to-jpg",
  "/hu/heic-to-jpg",
  "/hu/webp-to-jpg",
  "/hu/pdf-to-jpg",
  "/hu/image-compressor",
  "/hu/image-resizer",
])

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  getLocalizedUrl: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [locale, setLocaleState] = useState<Locale>("en")

  // Detect locale from URL
  useEffect(() => {
    const isHungarian = pathname.startsWith("/hu")
    const detectedLocale = isHungarian ? "hu" : "en"
    setLocaleState(detectedLocale)
    
    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("snapconvert-locale", detectedLocale)
    }
  }, [pathname])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("snapconvert-locale", newLocale)
    }
  }

  // Get the localized URL for a given path
  const getLocalizedUrl = (path: string): string => {
    // Remove any existing locale prefix
    const cleanPath = path.replace(/^\/hu/, "")
    const normalizedPath = cleanPath || "/"
    
    if (locale === "en") {
      return normalizedPath
    }
    
    // For Hungarian, check if the HU page exists
    const huPath = `/hu${normalizedPath === "/" ? "" : normalizedPath}`
    if (huPages.has(huPath)) {
      return huPath
    }
    
    // Fall back to English page if HU version doesn't exist
    return normalizedPath
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, getLocalizedUrl }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Get the equivalent URL in the other language
export function getAlternateUrl(pathname: string, targetLocale: Locale): string {
  const cleanPath = pathname.replace(/^\/hu/, "") || "/"
  
  if (targetLocale === "en") {
    return cleanPath
  }
  
  // For Hungarian
  const huPath = `/hu${cleanPath === "/" ? "" : cleanPath}`
  if (huPages.has(huPath)) {
    return huPath
  }
  
  // If HU page doesn't exist, go to HU homepage
  return "/hu"
}
