"use client"

import { useState } from "react"
import { Upload, Settings, Download, ChevronDown, Check, Shield, Zap, Lock, Globe, Smartphone, RefreshCw } from "lucide-react"

// Types for converter configuration
export interface ConverterConfig {
  fromFormat: string
  toFormat: string
  fromExtension: string
  toExtension: string
  fromDescription: string
  toDescription: string
  conversionType: "image-to-image" | "image-to-pdf" | "pdf-to-image"
  benefits: {
    title: string
    description: string
    points: string[]
  }[]
  supportedInputFormats: string[]
  outputInfo: string
  uniqueContent: {
    whyTitle: string
    whyDescription: string
    faqExtra?: { question: string; answer: string }[]
  }
}

// How It Works Section
export function HowItWorksSection({ config }: { config: ConverterConfig }) {
  const steps = config.conversionType === "pdf-to-image" ? [
    {
      icon: Upload,
      title: "Upload Your PDF",
      description: `Select your PDF file by clicking the upload area or dragging and dropping. Each page will be converted to a separate ${config.toFormat} image.`,
    },
    {
      icon: Settings,
      title: "Configure Settings",
      description: `Choose your preferred output quality and resolution. Higher quality means larger file sizes but clearer ${config.toFormat} images.`,
    },
    {
      icon: Download,
      title: "Download Images",
      description: `Click convert and your ${config.toFormat} images will be generated instantly. Download them individually or as a ZIP file.`,
    },
  ] : config.conversionType === "image-to-pdf" ? [
    {
      icon: Upload,
      title: "Upload Your Images",
      description: `Click the upload area or drag and drop your ${config.fromFormat} files. You can select multiple images to combine into one PDF.`,
    },
    {
      icon: Settings,
      title: "Arrange & Preview",
      description: "Review your images in the preview grid. Drag to reorder them or remove any unwanted images before conversion.",
    },
    {
      icon: Download,
      title: "Download Your PDF",
      description: "Click convert and your PDF will be generated instantly with one image per page. The download starts automatically.",
    },
  ] : [
    {
      icon: Upload,
      title: `Upload Your ${config.fromFormat} Files`,
      description: `Click the upload area or drag and drop your ${config.fromExtension} files. You can convert multiple images at once for batch processing.`,
    },
    {
      icon: Settings,
      title: "Preview & Adjust",
      description: `Review your images before conversion. Each ${config.fromFormat} file will be converted to high-quality ${config.toFormat} format.`,
    },
    {
      icon: Download,
      title: `Download ${config.toFormat} Files`,
      description: `Click convert and your ${config.toFormat} files will be ready instantly. Download them individually or all at once.`,
    },
  ]

  return (
    <section id="how-it-works" className="px-4 py-16 sm:py-24 bg-card/50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Convert {config.fromFormat} to {config.toFormat}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Converting your {config.fromFormat.toLowerCase()} files to {config.toFormat} takes just a few seconds with our free online tool
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

// Supported Formats Section
export function SupportedFormatsSection({ config }: { config: ConverterConfig }) {
  return (
    <section id="formats" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Supported Formats
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our {config.fromFormat} to {config.toFormat} converter supports various input formats
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Input Formats</h3>
            <p className="text-sm text-muted-foreground mb-4">{config.fromDescription}</p>
            <div className="flex flex-wrap gap-2">
              {config.supportedInputFormats.map((format) => (
                <span
                  key={format}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Output Format</h3>
            <p className="text-sm text-muted-foreground mb-4">{config.toDescription}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {config.toExtension}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{config.outputInfo}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Why Use SnapConvert Section
export function WhySnapConvertSection({ config }: { config: ConverterConfig }) {
  const generalBenefits = [
    {
      icon: Shield,
      title: "100% Private & Secure",
      description: "Your files never leave your device. All conversion happens locally in your browser using JavaScript.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "No server uploads means instant conversions. Convert files in seconds, not minutes.",
    },
    {
      icon: Lock,
      title: "No Registration Required",
      description: "Start converting immediately. No sign-up, no email, no personal information needed.",
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Use on any device with a modern browser. Windows, Mac, Linux, iOS, or Android.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Fully responsive design works perfectly on smartphones and tablets.",
    },
    {
      icon: RefreshCw,
      title: "Unlimited Conversions",
      description: "Convert as many files as you need. No daily limits, no file size restrictions.",
    },
  ]

  return (
    <section id="why-snapconvert" className="px-4 py-16 sm:py-24 bg-card/50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.uniqueContent.whyTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {config.uniqueContent.whyDescription}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {generalBenefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl border border-border bg-card p-6">
              <benefit.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Format Benefits Section (Why convert from X to Y)
export function FormatBenefitsSection({ config }: { config: ConverterConfig }) {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Convert {config.fromFormat} to {config.toFormat}?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the benefits of {config.toFormat} format for your files
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className={`rounded-xl border border-border bg-card p-6 ${
                config.benefits.length === 2 && index === 1 ? "sm:col-span-1" : 
                config.benefits.length % 3 !== 0 && index === config.benefits.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              <ul className="mt-4 space-y-2">
                {benefit.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {point}
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

// FAQ Section
export function FAQSection({ config }: { config: ConverterConfig }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const baseFaqs = [
    {
      question: `How do I convert ${config.fromFormat} to ${config.toFormat}?`,
      answer: `Simply click the upload area or drag and drop your ${config.fromExtension} files, then click the "Convert" button. Your ${config.toFormat} files will be generated instantly and ready to download.`,
    },
    {
      question: `Is the ${config.fromFormat} to ${config.toFormat} converter free?`,
      answer: `Yes, SnapConvert is completely free to use. There are no hidden fees, watermarks, or limits on the number of conversions you can perform.`,
    },
    {
      question: `Are my ${config.fromFormat} files uploaded to a server?`,
      answer: `No, your files never leave your device. All conversion happens locally in your browser using JavaScript, ensuring complete privacy and security for your files.`,
    },
    {
      question: `Can I convert multiple ${config.fromFormat} files at once?`,
      answer: `Yes! You can select multiple ${config.fromExtension} files for batch conversion. All files will be converted to ${config.toFormat} format simultaneously.`,
    },
    {
      question: `What is the maximum file size I can convert?`,
      answer: `Each individual file can be up to 50MB. Since processing happens in your browser, larger files may take slightly longer depending on your device's performance.`,
    },
    {
      question: `Does the converter work on mobile devices?`,
      answer: `Yes, SnapConvert works perfectly on smartphones and tablets. You can convert ${config.fromFormat} to ${config.toFormat} directly from your mobile browser without installing any apps.`,
    },
    {
      question: `Will the conversion affect image quality?`,
      answer: config.conversionType === "image-to-pdf" 
        ? `No, your images are embedded in the PDF at their original quality. The conversion preserves the full resolution of your ${config.fromFormat} files.`
        : config.toFormat === "JPG" || config.toFormat === "JPEG"
        ? `JPG uses lossy compression, but we use high quality settings (92%) to minimize any quality loss while keeping file sizes reasonable.`
        : `${config.toFormat} uses lossless compression, so your converted images will maintain their original quality without any degradation.`,
    },
  ]

  const faqs = config.uniqueContent.faqExtra 
    ? [...baseFaqs, ...config.uniqueContent.faqExtra]
    : baseFaqs

  return (
    <section id="faq" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.fromFormat} to {config.toFormat} FAQ
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Common questions about converting {config.fromFormat} to {config.toFormat}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
