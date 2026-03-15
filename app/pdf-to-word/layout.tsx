import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF to Word Converter - Convert PDF to DOC Free | SnapConvert",
  description:
    "Convert PDF documents to editable Word format free online. Extract text from PDFs and download as DOC files. No sign-up required, works in your browser.",
  keywords: ["PDF to Word", "PDF to DOC", "convert PDF", "PDF converter", "extract text from PDF", "editable PDF"],
}

export default function PdfToWordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
