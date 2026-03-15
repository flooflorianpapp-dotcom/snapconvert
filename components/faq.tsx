"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is SnapConvert really free?",
    answer: "Yes, SnapConvert is completely free to use. There are no hidden fees, subscriptions, or premium features. You can convert as many images as you want without any cost.",
  },
  {
    question: "Are my images secure?",
    answer: "Absolutely. Your images never leave your device. All processing happens locally in your browser using JavaScript. We don't upload, store, or have access to any of your files.",
  },
  {
    question: "What image formats are supported?",
    answer: "SnapConvert supports JPG, JPEG, PNG, and WEBP image formats. These cover the vast majority of images you'll encounter on the web and from cameras.",
  },
  {
    question: "Is there a file size limit?",
    answer: "Each individual image can be up to 10MB in size. There's no limit to the number of images you can combine into a single PDF.",
  },
  {
    question: "Can I use SnapConvert on my phone?",
    answer: "Yes! SnapConvert is fully responsive and works great on mobile devices. You can convert images to PDF directly from your phone or tablet.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is needed. Simply open SnapConvert in your browser and start converting. We don't require registration, email verification, or any personal information.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions? We have answers.
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
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
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
