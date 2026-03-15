import { Zap, Shield, Globe, Smartphone, Lock, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Villámgyors",
    description: "A konvertálás azonnal megtörténik a böngészőjében. Nincs várakozás a szerver feldolgozásra.",
  },
  {
    icon: Shield,
    title: "100% Biztonságos",
    description: "A képei soha nem hagyják el az eszközét. Minden helyben kerül feldolgozásra.",
  },
  {
    icon: Globe,
    title: "Telepítés Nélkül",
    description: "Közvetlenül a böngészőjében működik. Nincs szükség szoftver letöltésére.",
  },
  {
    icon: Smartphone,
    title: "Mobilbarát",
    description: "Tökéletesen működik telefonokon és tableteken. Konvertáljon útközben.",
  },
  {
    icon: Lock,
    title: "Fiók Nélkül",
    description: "Kezdjen el azonnal konvertálni. Nincs szükség regisztrációra.",
  },
  {
    icon: RefreshCw,
    title: "Korlátlan Használat",
    description: "Konvertáljon annyi képet, amennyit csak akar. Nincsenek korlátok.",
  },
]

export function WhySnapConvertHu() {
  return (
    <section id="why-snapconvert" className="px-4 py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Miért Válassza a SnapConvert-et?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A legegyszerűbb módja a képek PDF-be konvertálásának, beépített adatvédelemmel
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
