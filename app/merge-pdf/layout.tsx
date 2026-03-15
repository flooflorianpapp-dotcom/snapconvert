import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Merge PDF Files - Combine PDFs Free Online | SnapConvert",
  description:
    "Merge multiple PDF files into one document free online. Combine and reorder PDFs easily. No sign-up required, works in your browser.",
  keywords: ["merge PDF", "combine PDF", "join PDF", "PDF merger", "PDF combiner", "multiple PDFs"],
}

export default function MergePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
