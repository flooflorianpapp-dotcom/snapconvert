"use client"

import { useState, useRef } from "react"
import { Upload, FileImage, Trash2, Download, AlertCircle, X, Shield, Zap, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"

interface ImageFile {
  file: File
  preview: string
  id: string
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function Hero() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported format. Please use JPG, PNG, or WEBP.`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" exceeds 10MB limit.`
    }
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError(null)
    const newImages: ImageFile[] = []
    const errors: string[] = []

    Array.from(files).forEach((file) => {
      const validationError = validateFile(file)
      if (validationError) {
        errors.push(validationError)
      } else {
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
          id: crypto.randomUUID(),
        })
      }
    })

    if (errors.length > 0) {
      setError(errors.join(" "))
    }

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages])
    }

    // Reset input so the same file can be selected again
    e.target.value = ""
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prev.filter((img) => img.id !== id)
    })
  }

  const clearAllImages = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    setImages([])
    setError(null)
  }

  const convertToPDF = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image before converting.")
      return
    }

    setIsConverting(true)
    setError(null)

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20

      for (let i = 0; i < images.length; i++) {
        if (i > 0) {
          pdf.addPage()
        }

        const img = images[i]
        const imageData = await loadImage(img.preview)

        // Calculate dimensions to fit image within page margins
        const maxWidth = pageWidth - margin * 2
        const maxHeight = pageHeight - margin * 2

        let width = imageData.width
        let height = imageData.height

        // Scale down if image is larger than available space
        if (width > maxWidth || height > maxHeight) {
          const widthRatio = maxWidth / width
          const heightRatio = maxHeight / height
          const ratio = Math.min(widthRatio, heightRatio)
          width = width * ratio
          height = height * ratio
        }

        // Center the image on the page
        const x = (pageWidth - width) / 2
        const y = (pageHeight - height) / 2

        pdf.addImage(imageData.dataUrl, "JPEG", x, y, width, height)
      }

      pdf.save("snapconvert-images.pdf")
    } catch {
      setError("Failed to convert images to PDF. Please try again.")
    } finally {
      setIsConverting(false)
    }
  }

  const loadImage = (src: string): Promise<{ dataUrl: string; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }
        ctx.drawImage(img, 0, 0)
        resolve({
          dataUrl: canvas.toDataURL("image/jpeg", 0.9),
          width: img.width,
          height: img.height,
        })
      }
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = src
    })
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Image to PDF Converter
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Convert your images to PDF instantly, right in your browser. Fast, free, and completely private - no uploads to any server.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Free to use</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>No sign-up required</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span>Files stay in your browser</span>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload area */}
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            onClick={handleUploadClick}
            className="w-full sm:w-auto gap-2 px-8 py-6 text-base font-medium"
          >
            <Upload className="h-5 w-5" />
            Upload Images
          </Button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Image previews */}
        {images.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {images.length} image{images.length !== 1 ? "s" : ""} selected
              </p>
              <Button variant="ghost" size="sm" onClick={clearAllImages} className="text-muted-foreground">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-2 bg-destructive rounded-full text-destructive-foreground hover:bg-destructive/90 transition-colors"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white font-medium">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Convert and Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={convertToPDF}
                disabled={isConverting}
                className="gap-2 px-8 py-6 text-base font-medium"
              >
                {isConverting ? (
                  <>
                    <FileImage className="h-5 w-5 animate-pulse" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Convert to PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        </div>
    </section>
  )
}
