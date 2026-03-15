import { Upload, FileImage, Download } from "lucide-react"

interface HowToConvertProps {
  formatName: string
}

export function HowToConvert({ formatName }: HowToConvertProps) {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Images",
      description: `Click the upload button and select your ${formatName} files. You can select multiple images at once.`,
    },
    {
      icon: FileImage,
      title: "Preview & Arrange",
      description: "Review your images in the preview grid. Remove any unwanted images before conversion.",
    },
    {
      icon: Download,
      title: "Download Your PDF",
      description: "Click convert and your PDF will be generated instantly. The download starts automatically.",
    },
  ]

  return (
    <section className="px-4 py-16 sm:py-24 bg-card/50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Convert {formatName} to PDF
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Converting your {formatName.toLowerCase()} images to PDF is simple and takes just seconds
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="absolute -top-2 -left-2 sm:left-auto sm:-top-2 sm:-right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
