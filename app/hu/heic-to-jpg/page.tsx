import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { HeaderHu } from "@/components/header-hu"
import { FooterHu } from "@/components/footer-hu"
import { FormatConverter } from "@/components/format-converter"

export const metadata: Metadata = {
  title: "HEIC JPG-be Konvertáló - Ingyenes Online Eszköz | SnapConvert",
  description: "Konvertálja iPhone HEIC fotóit JPG formátumba online ingyen. Univerzális kompatibilitás minden eszközzel. Regisztráció nélkül, a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/heic-to-jpg",
    languages: {
      'en': 'https://snapconvert.to/heic-to-jpg',
      'hu': 'https://snapconvert.to/hu/heic-to-jpg',
    },
  },
}

export default function HeicToJpgPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeaderHu />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              HEIC JPG-be Konvertáló
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Konvertálja iPhone és iPad HEIC fotóit univerzálisan kompatibilis JPG formátumba. Tökéletes megosztáshoz Windows felhasználókkal és minden eszközzel.
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
              inputFormats={["image/heic", "image/heif"]}
              outputFormat="jpeg"
              inputLabel="HEIC"
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
                <h3 className="mt-4 font-semibold text-foreground">HEIC Feltöltése</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kattintson a feltöltés gombra vagy húzza be az iPhone fotóit</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">2</div>
                <h3 className="mt-4 font-semibold text-foreground">Automatikus Konvertálás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A képek automatikusan JPG formátumba konvertálódnak</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">3</div>
                <h3 className="mt-4 font-semibold text-foreground">Letöltés</h3>
                <p className="mt-2 text-sm text-muted-foreground">Töltse le a mindenhol használható JPG képeket</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Miért Konvertáljon HEIC-et JPG-be?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Univerzális Kompatibilitás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A HEIC csak Apple eszközökön működik, de a JPG Windows-on, Androidon és mindenhol máshol is.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Könnyű Megosztás</h3>
                <p className="mt-2 text-sm text-muted-foreground">Ossza meg iPhone fotóit bárhol anélkül, hogy a címzetteknek speciális szoftverre lenne szükségük.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Szoftver Támogatás</h3>
                <p className="mt-2 text-sm text-muted-foreground">A JPG-t minden képszerkesztő és fotókezelő szoftver támogatja.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Nyomtatásra Kész</h3>
                <p className="mt-2 text-sm text-muted-foreground">A fotólaborok és nyomtatószolgáltatások JPG formátumot várnak.</p>
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
                <h3 className="font-semibold text-foreground">Miért HEIC formátumban vannak az iPhone fotóim?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Az Apple a HEIC-et használja alapértelmezett formátumként iPhone-okon, mert jobb tömörítést biztosít, mint a JPG, miközben megőrzi a minőséget. Ez a formátum azonban nem széles körben támogatott az Apple ökoszisztémán kívül.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Beállíthatom az iPhone-t, hogy JPG-ben mentse a fotókat?</h3>
                <p className="mt-2 text-sm text-muted-foreground">{"Igen, menjen a Beállítások > Kamera > Formátumok menüpontra és válassza a \"Leginkább kompatibilis\" opciót. Ez azonban több tárhelyet foglal az eszközön."}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterHu />
    </div>
  )
}
