import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { FormatConverter } from "@/components/format-converter"

export const metadata: Metadata = {
  title: "JPG PNG-be Konvertáló - Ingyenes Online Eszköz | SnapConvert",
  description: "Konvertáljon JPG képeket PNG formátumba online ingyen. Veszteségmentes minőség és átlátszóság támogatás. Regisztráció nélkül, a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/jpg-to-png",
    languages: {
      'en': 'https://snapconvert.to/jpg-to-png',
      'hu': 'https://snapconvert.to/hu/jpg-to-png',
    },
  },
}

export default function JpgToPngPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              JPG PNG-be Konvertáló
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Konvertálja JPG képeit PNG formátumba a veszteségmentes minőségért. Tökéletes grafikákhoz, logókhoz és képekhez, amelyeknek átlátszóság támogatásra van szükségük.
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
            <FormatConverter
              inputFormats={["image/jpeg", "image/jpg"]}
              outputFormat="png"
              inputLabel="JPG"
              outputLabel="PNG"
            />
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
                <h3 className="mt-4 font-semibold text-foreground">JPG Feltöltése</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kattintson a feltöltés gombra vagy húzza be a JPG képeit</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">2</div>
                <h3 className="mt-4 font-semibold text-foreground">Automatikus Konvertálás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A képek automatikusan PNG formátumba konvertálódnak</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">3</div>
                <h3 className="mt-4 font-semibold text-foreground">Letöltés</h3>
                <p className="mt-2 text-sm text-muted-foreground">Töltse le a konvertált PNG képeket</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Konvertáljon JPG-t PNG-be?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Veszteségmentes Minőség</h3>
                <p className="mt-2 text-sm text-muted-foreground">A PNG megőrzi minden pixelt tömörítési műtermékek nélkül, tökéletes grafikákhoz és képernyőképekhez.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Átlátszóság Támogatás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A PNG támogatja az alfa csatornát átlátszó hátterekhez, elengedhetetlen logókhoz és átfedésekhez.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Tökéletes Grafikákhoz</h3>
                <p className="mt-2 text-sm text-muted-foreground">A PNG kiváló szöveges, éles vonalú és egyszínű képekhez, ahol a JPG műtermékeket mutatna.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Szerkesztésre Kész</h3>
                <p className="mt-2 text-sm text-muted-foreground">A PNG ideális további szerkesztéshez, mivel nem romlik minden mentéssel.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Gyakran Ismételt Kérdések
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Miért nagyobb a PNG fájlom, mint az eredeti JPG?</h3>
                <p className="mt-2 text-sm text-muted-foreground">A PNG veszteségmentes tömörítést használ, míg a JPG veszteséges tömörítést. Ez azt jelenti, hogy a PNG fájlok általában nagyobbak, de megőrzik a pontos minőséget.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Megőrződik a JPG átlátszósága?</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG nem támogatja az átlátszóságot, így a konvertált PNG-nek átlátszatlan háttere lesz. Ha átlátszóságra van szüksége, a konvertálás után szerkesztenie kell a PNG-t.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
