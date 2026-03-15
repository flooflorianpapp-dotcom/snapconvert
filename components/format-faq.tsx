"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FormatFAQProps {
  formatName: string
  formatExtension: string
}

export function FormatFAQ({ formatName, formatExtension }: FormatFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: `How do I convert ${formatName} to PDF?`,
      answer: `Simply click the "Upload Images" button, select your ${formatExtension} files, and click "Convert to PDF". Your PDF will download automatically.`,
    },
    {
      question: `Is this ${formatName} to PDF converter free?`,
      answer: `Yes, SnapConvert is completely free to use. There are no hidden fees, watermarks, or limits on conversions.`,
    },
    {
      question: `Will my ${formatName} files be uploaded to a server?`,
      answer: `No, your files never leave your device. All conversion happens locally in your browser using JavaScript, ensuring complete privacy.`,
    },
    {
      question: `Can I convert multiple ${formatName} files at once?`,
      answer: `Yes! You can select multiple ${formatExtension} files and they will all be combined into a single PDF document, one image per page.`,
    },
    {
      question: `What is the maximum file size for ${formatName} images?`,
      answer: `Each individual image can be up to 10MB. There's no limit to how many images you can combine into a single PDF.`,
    },
    {
      question: `Does the conversion work on mobile devices?`,
      answer: `Yes, SnapConvert works perfectly on smartphones and tablets. You can convert ${formatName} images to PDF directly from your mobile browser.`,
    },
  ]

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {formatName} to PDF FAQ
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Common questions about converting {formatName} to PDF
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
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ml-4 ${
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
