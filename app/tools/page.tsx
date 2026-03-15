import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ArrowRight, FileImage, FileType, Image, Maximize, FileText } from "lucide-react"
import type { Metadata } from "next"
import { toolCategories, type Tool } from "@/lib/tools-config"

export const metadata: Metadata = {
  title: "All Tools - Free Image & PDF Converters | SnapConvert",
  description:
    "Browse all SnapConvert tools. Convert images to PDF, change image formats, compress images, and more. Free, fast, and secure online converters.",
  keywords: [
    "image converter",
    "pdf converter",
    "image to pdf",
    "jpg to png",
    "image compressor",
    "image resizer",
    "free converter",
  ],
}

// Map category IDs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "image-to-pdf": <FileType className="h-5 w-5" />,
  "image-converters": <Image className="h-5 w-5" />,
  "pdf-converters": <FileImage className="h-5 w-5" />,
  "image-utilities": <Maximize className="h-5 w-5" />,
  "text-extraction": <FileText className="h-5 w-5" />,
}

function ToolCard({ name, description, href }: Tool) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Use Tool
        <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </a>
  )
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background">
      <UnifiedHeader />
      <div className="pt-16">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              All Tools
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of free image and PDF conversion tools. 
              Fast, secure, and processed entirely in your browser.
            </p>
          </div>

          {toolCategories.map((category, index) => (
            <div key={category.id}>
              {index > 0 && <div className="border-t border-border" />}
              <section className="py-12">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {categoryIcons[category.id]}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                </div>
                <p className="text-muted-foreground mb-6 ml-13">{category.description}</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.href} {...tool} />
                  ))}
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
      <UnifiedFooter />
    </main>
  )
}
