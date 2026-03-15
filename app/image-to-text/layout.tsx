import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image to Text (OCR) - Free Online Tool | SnapConvert",
  description: "Extract text from images using OCR. Upload JPG, PNG, or WEBP images and get editable text instantly. Free, private, and processed in your browser.",
  keywords: ["image to text", "OCR", "optical character recognition", "extract text from image", "photo to text", "screenshot to text", "text recognition"],
  openGraph: {
    title: "Image to Text (OCR) - Free Online Tool",
    description: "Extract text from images using OCR. Free, secure, and private.",
    type: "website",
  },
}

export default function ImageToTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
