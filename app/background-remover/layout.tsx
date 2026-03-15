import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Background Remover - Remove Image Backgrounds Free | SnapConvert",
  description:
    "Remove backgrounds from images instantly and free. Get transparent PNG images from product photos, portraits, and graphics. No sign-up required, works in your browser.",
  keywords: ["background remover", "remove background", "transparent background", "PNG", "image editing", "photo editing"],
}

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
