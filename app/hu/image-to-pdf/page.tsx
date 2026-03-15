import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ImageConverter } from "@/components/image-converter"

export const metadata: Metadata = {
  title: "Kép PDF-be Konvertáló - Ingyenes Online Eszköz | SnapConvert",
  description: "Konvertáljon JPG, PNG és WEBP képeket PDF-be azonnal a böngészőjében. Ingyenes, gyors és biztonságos - a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/image-to-pdf",
    languages: {
      'en': 'https://snapconvert.to/image-to-pdf',
      'hu': 'https://snapconvert.to/hu/image-to-pdf',
    },
  },
}

export default function ImageToPdfPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Kép PDF-be Konvertáló
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Konvertálja képeit PDF formátumba azonnal, közvetlenül a böngészőjében. Gyors, ingyenes és teljesen biztonságos - nincs feltöltés semmilyen szerverre.
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
            <ImageConverter />
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
              Hogyan Működik
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">1</div>
                <h3 className="mt-4 font-semibold text-foreground">Képek Feltöltése</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kattintson a feltöltés gombra vagy húzza be a képeit</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">2</div>
                <h3 className="mt-4 font-semibold text-foreground">Rendezés</h3>
                <p className="mt-2 text-sm text-muted-foreground">Rendezze a képeket a kívánt sorrendbe a PDF-ben</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">3</div>
                <h3 className="mt-4 font-semibold text-foreground">Letöltés</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kattintson a konvertálásra és töltse le a PDF-et</p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported formats */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Támogatott Formátumok
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="font-semibold text-foreground">JPG / JPEG</div>
                <p className="mt-1 text-sm text-muted-foreground">A leggyakoribb képformátum</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="font-semibold text-foreground">PNG</div>
                <p className="mt-1 text-sm text-muted-foreground">Átlátszóság támogatással</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="font-semibold text-foreground">WEBP</div>
                <p className="mt-1 text-sm text-muted-foreground">Modern webes formátum</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why use SnapConvert */}
        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Válassza a SnapConvert-et?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">100% Biztonságos</h3>
                <p className="mt-2 text-sm text-muted-foreground">A képei soha nem hagyják el az eszközét. Minden helyben kerül feldolgozásra.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Villámgyors</h3>
                <p className="mt-2 text-sm text-muted-foreground">A konvertálás azonnal megtörténik a böngészőjében.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Regisztráció Nélkül</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kezdjen el azonnal konvertálni. Nincs szükség fiókra.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Korlátlan Használat</h3>
                <p className="mt-2 text-sm text-muted-foreground">Konvertáljon annyi képet, amennyit csak akar.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
