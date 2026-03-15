import { Zap, Shield, Globe, Smartphone, Lock, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Conversion happens instantly in your browser. No waiting for server processing.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "Your images never leave your device. Everything is processed locally.",
  },
  {
    icon: Globe,
    title: "No Installation",
    description: "Works directly in your browser. No software to download or install.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on phones and tablets. Convert on the go.",
  },
  {
    icon: Lock,
    title: "No Account Needed",
    description: "Start converting immediately. No sign-up or login required.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Use",
    description: "Convert as many images as you want. No limits or restrictions.",
  },
]

export function WhySnapConvert() {
  return (
    <section id="why-snapconvert" className="px-4 py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Use SnapConvert?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The simplest way to convert images to PDF, with privacy built in
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
