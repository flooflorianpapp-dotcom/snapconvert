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
]

const imageConverters = [
  { name: "PNG JPG-be", href: "/hu/png-to-jpg", description: "Konvertáljon PNG képeket JPG formátumba" },
  { name: "JPG PNG-be", href: "/hu/jpg-to-png", description: "Konvertáljon JPG képeket PNG formátumba" },
  { name: "WEBP JPG-be", href: "/hu/webp-to-jpg", description: "Konvertáljon WEBP képeket JPG formátumba" },
  { name: "HEIC JPG-be", href: "/hu/heic-to-jpg", description: "Konvertáljon iPhone fotókat JPG formátumba" },
]

const pdfConverters = [
  { name: "PDF JPG-be", href: "/hu/pdf-to-jpg", description: "Konvertáljon PDF oldalakat JPG képekké" },
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
