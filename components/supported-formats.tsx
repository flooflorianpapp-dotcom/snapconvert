import { Check } from "lucide-react"

const formats = [
  {
    name: "JPG / JPEG",
    description: "The most common image format, perfect for photos and screenshots.",
    features: ["Widely supported", "Small file sizes", "Good for photos"],
  },
  {
    name: "PNG",
    description: "Ideal for images with transparency or sharp edges like logos.",
    features: ["Supports transparency", "Lossless quality", "Great for graphics"],
  },
  {
    name: "WEBP",
    description: "Modern format with excellent compression and quality.",
    features: ["Superior compression", "Supports transparency", "Modern browsers"],
  },
]

export function SupportedFormats() {
  return (
    <section id="formats" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Supported Formats
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            SnapConvert works with the most popular image formats
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
