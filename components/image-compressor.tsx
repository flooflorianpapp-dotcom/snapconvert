"use client"

import { useState, useRef } from "react"
import { Upload, FileImage, Trash2, Download, AlertCircle, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageFile {
  id: string
  file: File
  preview: string
  originalSize: number
}

interface CompressedImage {
  name: string
  url: string
  originalSize: number
  compressedSize: number
}

export function ImageCompressor() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([])
  const [quality, setQuality] = useState(0.7)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setError(null)
    const newImages: ImageFile[] = []
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!allowedTypes.includes(file.type)) {
        setError("Please select JPG, PNG, or WEBP files only")
        continue
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB")
        continue
      }

      newImages.push({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
        originalSize: file.size,
      })
    }

    setImages((prev) => [...prev, ...newImages])
    setCompressedImages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) URL.revokeObjectURL(img.preview)
      return prev.filter((i) => i.id !== id)
    })
    setCompressedImages([])
  }

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    compressedImages.forEach((img) => URL.revokeObjectURL(img.url))
    setImages([])
    setCompressedImages([])
    setError(null)
  }

  const compressImages = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image to compress")
      return
    }

    setIsCompressing(true)
    setError(null)

    try {
      const compressed: CompressedImage[] = []

      for (const img of images) {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const image = new Image()
        image.crossOrigin = "anonymous"

        await new Promise<void>((resolve, reject) => {
          image.onload = () => {
            canvas.width = image.naturalWidth
            canvas.height = image.naturalHeight

            ctx!.fillStyle = "#FFFFFF"
            ctx!.fillRect(0, 0, canvas.width, canvas.height)
            ctx!.drawImage(image, 0, 0)

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const baseName = img.file.name.replace(/\.[^/.]+$/, "")
                  compressed.push({
                    name: `${baseName}_compressed.jpg`,
                    url: URL.createObjectURL(blob),
                    originalSize: img.originalSize,
                    compressedSize: blob.size,
                  })
                }
                resolve()
              },
              "image/jpeg",
              quality
            )
          }
          image.onerror = reject
          image.src = img.preview
        })
      }

      setCompressedImages(compressed)
    } catch {
      setError("An error occurred during compression. Please try again.")
    } finally {
      setIsCompressing(false)
    }
  }

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAll = () => {
    compressedImages.forEach((img) => {
      downloadImage(img.url, img.name)
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const totalSaved = compressedImages.reduce(
    (sum, img) => sum + (img.originalSize - img.compressedSize),
    0
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
      />

      {images.length === 0 ? (
        <div
          onClick={handleUploadClick}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 sm:p-12 cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Upload Images to Compress</h3>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Supports JPG, PNG, and WEBP formats
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Maximum file size: 50MB</p>
          <Button className="mt-6" size="lg">
            <Upload className="mr-2 h-4 w-4" />
            Select Images
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {images.length} image{images.length !== 1 ? "s" : ""} selected
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Add More
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={img.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-border bg-secondary/50">
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-foreground">
                  {formatSize(img.originalSize)}
                </div>
              </div>
            ))}
          </div>

          {/* Quality Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Compression Quality</label>
              <span className="text-sm text-muted-foreground">{Math.round(quality * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => {
                setQuality(parseFloat(e.target.value))
                setCompressedImages([])
              }}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>

          {compressedImages.length === 0 ? (
            <Button
              className="w-full"
              size="lg"
              onClick={compressImages}
              disabled={isCompressing}
            >
              {isCompressing ? (
                <>
                  <Minimize2 className="mr-2 h-4 w-4 animate-pulse" />
                  Compressing...
                </>
              ) : (
                <>
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Compress Images
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-primary">
                    <FileImage className="h-5 w-5" />
                    <span className="font-medium">Compression Complete!</span>
                  </div>
                  <span className="text-sm text-primary font-medium">
                    Saved {formatSize(totalSaved)}
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {compressedImages.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2"
                    >
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm text-foreground truncate">{img.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatSize(img.originalSize)} → {formatSize(img.compressedSize)}
                          <span className="text-primary ml-2">
                            (-{Math.round((1 - img.compressedSize / img.originalSize) * 100)}%)
                          </span>
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadImage(img.url, img.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={downloadAll}>
                <Download className="mr-2 h-4 w-4" />
                Download All ({compressedImages.length} files)
              </Button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
