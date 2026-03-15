import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { PdfToImageConverter } from "@/components/pdf-to-image-converter"

export const metadata: Metadata = {
  title: "PDF JPG-be Konvertáló - Ingyenes Online Eszköz | SnapConvert",
  description: "Konvertáljon PDF oldalakat JPG képekké online ingyen. Gyors és biztonságos. Regisztráció nélkül, a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/pdf-to-jpg",
    languages: {
      'en': 'https://snapconvert.to/pdf-to-jpg',
      'hu': 'https://snapconvert.to/hu/pdf-to-jpg',
    },
  },
}

export default function PdfToJpgPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              PDF JPG-be Konvertáló
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Konvertálja PDF dokumentumait JPG képekké. Tökéletes előnézetekhez, közösségi médiához és egyszerű megosztáshoz.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Ingyenesen használható</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Regisztráció nélkül</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>A fájlok a böngészőben maradnak</span>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full max-w-3xl">
            <PdfToImageConverter outputFormat="jpeg" outputLabel="JPG" />
          </div>
        </section>

        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Konvertáljon PDF-et JPG-be?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Egyszerű Megosztás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG képeket könnyebb megosztani e-mailben és közösségi médiában, mint PDF dokumentumokat.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Előnézet Létrehozása</h3>
                <p className="mt-2 text-sm text-muted-foreground">Hozzon létre miniatűröket vagy előnézeti képeket PDF dokumentumaiból.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
