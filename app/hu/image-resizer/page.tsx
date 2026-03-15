import { Metadata } from "next"
import { Shield, Zap, Lock } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ImageResizer } from "@/components/image-resizer"

export const metadata: Metadata = {
  title: "Képátméretező - Ingyenes Online Eszköz | SnapConvert",
  description: "Méretezze át képeit egyedi méretekre online ingyen. Regisztráció nélkül, a fájlok a böngészőben maradnak.",
  alternates: {
    canonical: "https://snapconvert.to/hu/image-resizer",
    languages: {
      'en': 'https://snapconvert.to/image-resizer',
      'hu': 'https://snapconvert.to/hu/image-resizer',
    },
  },
}

export default function ImageResizerPageHu() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Képátméretező
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Méretezze át képeit egyedi méretekre. Tökéletes közösségi médiához, profilképekhez és webes használatra.
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
            <ImageResizer />
          </div>
        </section>

        <section className="px-4 py-16 sm:py-24 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
              Mikor Érdemes Átméretezni?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Közösségi Média</h3>
                <p className="mt-2 text-sm text-muted-foreground">Méretezze át képeit az Instagram, Facebook vagy Twitter optimális méreteire.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Profilképek</h3>
                <p className="mt-2 text-sm text-muted-foreground">Hozzon létre tökéletes méretű profilképeket bármilyen platformhoz.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
