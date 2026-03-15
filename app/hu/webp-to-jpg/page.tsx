import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { HeaderHu } from "@/components/header-hu"
import { FooterHu } from "@/components/footer-hu"
import { FormatConverter } from "@/components/format-converter"

export const metadata: Metadata = {
  title: "WEBP JPG-be Konvertáló - Ingyenes Online Eszköz | SnapConvert",
  description: "Konvertáljon WEBP képeket JPG formátumba online ingyen. Univerzális kompatibilitás minden szoftverrel. Regisztráció nélkül.",
  alternates: {
    canonical: "https://snapconvert.to/hu/webp-to-jpg",
    languages: {
      'en': 'https://snapconvert.to/webp-to-jpg',
      'hu': 'https://snapconvert.to/hu/webp-to-jpg',
    },
  },
}

export default function WebpToJpgPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeaderHu />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              WEBP JPG-be Konvertáló
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Konvertálja a weboldalakról letöltött WEBP képeket univerzálisan kompatibilis JPG formátumba.
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
              inputFormats={["image/webp"]}
              outputFormat="jpeg"
              inputLabel="WEBP"
              outputLabel="JPG"
            />
          </div>
        </section>

        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Konvertáljon WEBP-et JPG-be?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Maximális Kompatibilitás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG minden képnézegetővel, szerkesztővel és platformmal működik, míg a WEBP támogatás még korlátozott.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Könnyű Szerkesztés</h3>
                <p className="mt-2 text-sm text-muted-foreground">Nyissa meg és szerkessze képeit bármilyen szoftverben WEBP kompatibilitási problémák nélkül.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterHu />
    </div>
  )
}
