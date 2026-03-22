import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crop Image Online - Free Image Cropper | SnapConvert",
  description: "Crop images online for free. Visually select any part of your image with our easy-to-use cropper. Supports JPG, PNG, and WEBP formats.",
  keywords: ["crop image", "image cropper", "photo cropper", "cut image", "trim image", "crop online"],
}

export default function CropImageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
