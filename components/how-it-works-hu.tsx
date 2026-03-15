import { Upload, FileImage, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Képek Feltöltése",
    description: "Kattintson a feltöltés gombra vagy húzza be a képeket. JPG, PNG és WEBP formátumokat támogatunk.",
  },
  {
    icon: FileImage,
    title: "Rendezés és Előnézet",
    description: "Tekintse meg a képek előnézetét és rendezze őket a kívánt sorrendbe a PDF-ben.",
  },
  {
    icon: Download,
    title: "PDF Letöltése",
    description: "Kattintson a konvertálásra és a PDF azonnal elkészül. Töltse le közvetlenül az eszközére.",
  },
]

export function HowItWorksHu() {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hogyan Működik
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Konvertálja képeit PDF-be három egyszerű lépésben
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
