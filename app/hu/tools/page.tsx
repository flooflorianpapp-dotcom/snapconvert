import type { Metadata } from "next"
import { HeaderHu } from "@/components/header-hu"
import { FooterHu } from "@/components/footer-hu"
import { ArrowRight, FileImage, Image, FileText, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Összes Konvertáló Eszköz - SnapConvert",
  description: "Válasszon ingyenes képkonvertáló eszközeink teljes gyűjteményéből. Konvertáljon képeket PDF-be, JPG-be, PNG-be és sok más formátumba.",
  alternates: {
    canonical: "https://snapconvert.to/hu/tools",
    languages: {
      'en': 'https://snapconvert.to/tools',
      'hu': 'https://snapconvert.to/hu/tools',
    },
  },
}

const imageToPdfTools = [
  { name: "Kép PDF-be", href: "/hu/image-to-pdf", description: "Konvertáljon bármilyen képet PDF dokumentummá" },
  { name: "JPG PDF-be", href: "/hu/jpg-to-pdf", description: "Konvertáljon JPG képeket PDF formátumba" },
  { name: "PNG PDF-be", href: "/hu/png-to-pdf", description: "Konvertáljon PNG képeket PDF formátumba" },
  { name: "WEBP PDF-be", href: "/hu/webp-to-pdf", description: "Konvertáljon WEBP képeket PDF formátumba" },
  { name: "HEIC PDF-be", href: "/hu/heic-to-pdf", description: "Konvertáljon iPhone HEIC fotókat PDF-be" },
]

const imageConverters = [
  { name: "Kép JPG-be", href: "/hu/image-to-jpg", description: "Konvertáljon bármilyen képet JPG formátumba" },
  { name: "Kép PNG-be", href: "/hu/image-to-png", description: "Konvertáljon bármilyen képet PNG formátumba" },
  { name: "PNG JPG-be", href: "/hu/png-to-jpg", description: "Konvertáljon PNG képeket JPG formátumba" },
  { name: "JPG PNG-be", href: "/hu/jpg-to-png", description: "Konvertáljon JPG képeket PNG formátumba" },
  { name: "WEBP JPG-be", href: "/hu/webp-to-jpg", description: "Konvertáljon WEBP képeket JPG formátumba" },
  { name: "WEBP PNG-be", href: "/hu/webp-to-png", description: "Konvertáljon WEBP képeket PNG formátumba" },
  { name: "WEBP GIF-be", href: "/hu/webp-to-gif", description: "Konvertáljon WEBP képeket GIF formátumba" },
  { name: "HEIC JPG-be", href: "/hu/heic-to-jpg", description: "Konvertáljon iPhone fotókat JPG formátumba" },
  { name: "HEIC PNG-be", href: "/hu/heic-to-png", description: "Konvertáljon HEIC képeket PNG formátumba" },
  { name: "SVG PNG-be", href: "/hu/svg-to-png", description: "Konvertáljon SVG vektorokat PNG-be" },
  { name: "SVG JPG-be", href: "/hu/svg-to-jpg", description: "Konvertáljon SVG vektorokat JPG-be" },
  { name: "BMP JPG-be", href: "/hu/bmp-to-jpg", description: "Konvertáljon BMP képeket JPG formátumba" },
  { name: "BMP PNG-be", href: "/hu/bmp-to-png", description: "Konvertáljon BMP képeket PNG formátumba" },
  { name: "GIF JPG-be", href: "/hu/gif-to-jpg", description: "Konvertáljon GIF képeket JPG formátumba" },
  { name: "GIF PNG-be", href: "/hu/gif-to-png", description: "Konvertáljon GIF képeket PNG formátumba" },
  { name: "TIFF JPG-be", href: "/hu/tiff-to-jpg", description: "Konvertáljon TIFF képeket JPG formátumba" },
  { name: "TIFF PNG-be", href: "/hu/tiff-to-png", description: "Konvertáljon TIFF képeket PNG formátumba" },
]

const pdfConverters = [
  { name: "PDF JPG-be", href: "/hu/pdf-to-jpg", description: "Konvertáljon PDF oldalakat JPG képekké" },
  { name: "PDF PNG-be", href: "/hu/pdf-to-png", description: "Konvertáljon PDF oldalakat PNG képekké" },
]

const utilities = [
  { name: "Képtömörítő", href: "/hu/image-compressor", description: "Csökkentse a képek fájlméretét a minőség megőrzése mellett" },
  { name: "Képátméretező", href: "/hu/image-resizer", description: "Méretezze át a képeket egyedi méretekre" },
]

interface ToolCategory {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tools: { name: string; href: string; description: string }[]
}

const categories: ToolCategory[] = [
  {
    title: "Kép PDF-be Eszközök",
    description: "Képek konvertálása PDF dokumentummá",
    icon: FileText,
    tools: imageToPdfTools,
  },
  {
    title: "Képformátum Konvertálók",
    description: "Konvertálás különböző képformátumok között",
    icon: Image,
    tools: imageConverters,
  },
  {
    title: "PDF Konvertálók",
    description: "PDF fájlok konvertálása képekké",
    icon: FileImage,
    tools: pdfConverters,
  },
  {
    title: "Kép Segédeszközök",
    description: "Képek optimalizálása és átméretezése",
    icon: Settings,
    tools: utilities,
  },
]

export default function ToolsPageHu() {
  return (
    <main className="min-h-screen bg-background">
      <HeaderHu />
      <div className="pt-16">
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Összes Konvertáló Eszköz
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Válasszon ingyenes képkonvertáló eszközeink teljes gyűjteményéből
              </p>
            </div>

            <div className="mt-16 space-y-16">
              {categories.map((category) => (
                <div key={category.title}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <category.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.tools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground flex-grow">
                          {tool.description}
                        </p>
                        <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Használat
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <FooterHu />
    </main>
  )
}
