import { Check } from "lucide-react"

const formats = [
  {
    name: "JPG / JPEG",
    description: "A leggyakoribb képformátum, tökéletes fényképekhez és képernyőképekhez.",
    features: ["Széles körben támogatott", "Kis fájlméret", "Ideális fotókhoz"],
  },
  {
    name: "PNG",
    description: "Ideális átlátszóságot tartalmazó képekhez vagy logókhoz.",
    features: ["Átlátszóság támogatás", "Veszteségmentes minőség", "Kiváló grafikákhoz"],
  },
  {
    name: "WEBP",
    description: "Modern formátum kiváló tömörítéssel és minőséggel.",
    features: ["Kiváló tömörítés", "Átlátszóság támogatás", "Modern böngészők"],
  },
]

export function SupportedFormatsHu() {
  return (
    <section id="formats" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Támogatott Formátumok
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A SnapConvert a legnépszerűbb képformátumokkal működik
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {formats.map((format) => (
            <div
              key={format.name}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <h3 className="text-xl font-semibold text-foreground">{format.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{format.description}</p>
              <ul className="mt-4 space-y-2">
                {format.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
