"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "A SnapConvert valóban ingyenes?",
    answer: "Igen, a SnapConvert teljesen ingyenesen használható. Nincsenek rejtett díjak, előfizetések vagy prémium funkciók. Annyi képet konvertálhat, amennyit csak szeretne, mindenféle költség nélkül.",
  },
  {
    question: "Biztonságosak a képeim?",
    answer: "Természetesen. A képei soha nem hagyják el az eszközét. Minden feldolgozás helyben történik a böngészőjében JavaScript segítségével. Nem töltünk fel, nem tárolunk és nem férünk hozzá a fájljaihoz.",
  },
  {
    question: "Milyen képformátumokat támogat?",
    answer: "A SnapConvert támogatja a JPG, JPEG, PNG és WEBP képformátumokat. Ezek lefedik a webes és kamerákból származó képek túlnyomó többségét.",
  },
  {
    question: "Van fájlméret korlát?",
    answer: "Minden egyes kép legfeljebb 10MB méretű lehet. Nincs korlát arra, hogy hány képet kombinálhat egyetlen PDF-be.",
  },
  {
    question: "Használhatom a SnapConvert-et a telefonomon?",
    answer: "Igen! A SnapConvert teljesen reszponzív és kiválóan működik mobil eszközökön. Közvetlenül a telefonjáról vagy tabletjéről konvertálhat képeket PDF-be.",
  },
  {
    question: "Létre kell hoznom fiókot?",
    answer: "Nincs szükség fiókra. Egyszerűen nyissa meg a SnapConvert-et a böngészőjében és kezdjen el konvertálni. Nem kérünk regisztrációt, e-mail megerősítést vagy személyes adatokat.",
  },
]

export function FAQHu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Gyakran Ismételt Kérdések
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Kérdései vannak? Válaszolunk.
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
