import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ImageCompressor } from "@/components/image-compressor"

export const metadata: Metadata = {
  title: "Képtömörítő - Ingyenes Online Eszköz | SnapConvert",
  description: "Tömörítse képeit online ingyen a fájlméret csökkentéséhez a minőség megőrzése mellett. Regisztráció nélkül, a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/image-compressor",
    languages: {
      'en': 'https://snapconvert.to/image-compressor',
      'hu': 'https://snapconvert.to/hu/image-compressor',
    },
  },
}

export default function ImageCompressorPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Képtömörítő
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Csökkentse képei fájlméretét a minőség megőrzése mellett. Tökéletes webes használatra és gyorsabb betöltési időkhöz.
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
            <ImageCompressor />
          </div>
        </section>

        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Tömörítse a Képeit?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Gyorsabb Weboldalak</h3>
                <p className="mt-2 text-sm text-muted-foreground">A kisebb képek gyorsabban töltődnek be, javítva a felhasználói élményt és SEO-t.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Tárhely Megtakarítás</h3>
                <p className="mt-2 text-sm text-muted-foreground">Csökkentse a tárhelyigényt anélkül, hogy feláldozná a képminőséget.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
