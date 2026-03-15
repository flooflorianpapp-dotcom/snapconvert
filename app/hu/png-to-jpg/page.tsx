import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { HeaderHu } from "@/components/header-hu"
import { FooterHu } from "@/components/footer-hu"
import { FormatConverter } from "@/components/format-converter"

export const metadata: Metadata = {
  title: "PNG JPG-be Konvertáló - Ingyenes Online Eszköz | SnapConvert",
  description: "Konvertáljon PNG képeket JPG formátumba online ingyen. Csökkentse a fájlméretet akár 90%-kal. Regisztráció nélkül, a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/png-to-jpg",
    languages: {
      'en': 'https://snapconvert.to/png-to-jpg',
      'hu': 'https://snapconvert.to/hu/png-to-jpg',
    },
  },
}

export default function PngToJpgPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeaderHu />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              PNG JPG-be Konvertáló
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Konvertálja PNG képeit JPG formátumba a kisebb fájlméretért. Tökéletes webes használatra, e-mail mellékletekhez és közösségi médiás megosztáshoz.
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
              inputFormats={["image/png"]}
              outputFormat="jpeg"
              inputLabel="PNG"
              outputLabel="JPG"
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
                <h3 className="mt-4 font-semibold text-foreground">PNG Feltöltése</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kattintson a feltöltés gombra vagy húzza be a PNG képeit</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">2</div>
                <h3 className="mt-4 font-semibold text-foreground">Automatikus Konvertálás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A képek automatikusan JPG formátumba konvertálódnak</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">3</div>
                <h3 className="mt-4 font-semibold text-foreground">Letöltés</h3>
                <p className="mt-2 text-sm text-muted-foreground">Töltse le a kisebb méretű JPG képeket</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Konvertáljon PNG-t JPG-be?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Kisebb Fájlméret</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG tömörítés jelentősen csökkenti a fájlméretet, a képek tökéletessé válnak webes és e-mail használatra.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Univerzális Kompatibilitás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG-t gyakorlatilag minden eszköz, böngésző és alkalmazás támogatja világszerte.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Fotókra Optimalizált</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG tömörítés fényképes képekhez készült, ahol a kisebb minőségvesztés észrevehetetlen.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Gyorsabb Betöltés</h3>
                <p className="mt-2 text-sm text-muted-foreground">A kisebb fájlok gyorsabban töltődnek be weboldalakon és e-mailekben.</p>
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
                <h3 className="font-semibold text-foreground">Mi történik az átlátszósággal PNG-ről JPG-re konvertáláskor?</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG nem támogatja az átlátszóságot. A PNG átlátszó területei fehérré alakulnak az eredményül kapott JPG fájlban.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Mennyivel lesz kisebb a fájl?</h3>
                <p className="mt-2 text-sm text-muted-foreground">A fájlméret csökkenése a képtartalomtól függ, de általában 50-90%-os csökkenés várható PNG-ről JPG-re konvertáláskor.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterHu />
    </div>
  )
}
