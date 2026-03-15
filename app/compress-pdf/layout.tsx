import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compress PDF - Reduce PDF File Size Free | SnapConvert",
  description:
    "Compress PDF files and reduce file size while maintaining quality. Perfect for email attachments and uploads. Free, no sign-up required.",
  keywords: ["compress PDF", "PDF compressor", "reduce PDF size", "shrink PDF", "PDF optimizer", "smaller PDF"],
}

export default function CompressPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
