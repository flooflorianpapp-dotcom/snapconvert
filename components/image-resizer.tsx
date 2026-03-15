"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, FileImage, Trash2, Download, AlertCircle, X, Maximize2, Link, Unlink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageFile {
  id: string
  file: File
  preview: string
  width: number
  height: number
}

interface ResizedImage {
  name: string
  url: string
  width: number
  height: number
}

export function ImageResizer() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([])
  const [targetWidth, setTargetWidth] = useState<number>(800)
  const [targetHeight, setTargetHeight] = useState<number>(600)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [aspectRatio, setAspectRatio] = useState(800 / 600)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const preview = URL.createObjectURL(file)
      const dimensions = await getImageDimensions(preview)

      newImages.push({
        id: Math.random().toString(36).substring(7),
        file,
        preview,
        width: dimensions.width,
        height: dimensions.height,
      })
    }

    if (newImages.length > 0) {
      const firstImage = newImages[0]
      setTargetWidth(firstImage.width)
      setTargetHeight(firstImage.height)
      setAspectRatio(firstImage.width / firstImage.height)
    }

    setImages((prev) => [...prev, ...newImages])
    setResizedImages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.src = src
    })
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) URL.revokeObjectURL(img.preview)
      return prev.filter((i) => i.id !== id)
    })
    setResizedImages([])
  }

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    resizedImages.forEach((img) => URL.revokeObjectURL(img.url))
    setImages([])
    setResizedImages([])
    setError(null)
  }

  const handleWidthChange = (value: number) => {
    setTargetWidth(value)
    if (maintainAspect && images.length > 0) {
      setTargetHeight(Math.round(value / aspectRatio))
    }
    setResizedImages([])
  }

  const handleHeightChange = (value: number) => {
    setTargetHeight(value)
    if (maintainAspect && images.length > 0) {
      setTargetWidth(Math.round(value * aspectRatio))
    }
    setResizedImages([])
  }

  useEffect(() => {
    if (images.length > 0) {
      setAspectRatio(images[0].width / images[0].height)
    }
  }, [images])

  const resizeImages = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image to resize")
      return
    }

    if (targetWidth < 1 || targetHeight < 1) {
      setError("Please enter valid dimensions")
      return
    }

    setIsResizing(true)
    setError(null)

    try {
      const resized: ResizedImage[] = []

      for (const img of images) {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const image = new Image()
        image.crossOrigin = "anonymous"

        await new Promise<void>((resolve, reject) => {
          image.onload = () => {
            canvas.width = targetWidth
            canvas.height = targetHeight

            ctx!.fillStyle = "#FFFFFF"
            ctx!.fillRect(0, 0, canvas.width, canvas.height)
            ctx!.drawImage(image, 0, 0, targetWidth, targetHeight)

            const outputType = img.file.type === "image/png" ? "image/png" : "image/jpeg"
            const extension = outputType === "image/png" ? "png" : "jpg"

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const baseName = img.file.name.replace(/\.[^/.]+$/, "")
                  resized.push({
                    name: `${baseName}_${targetWidth}x${targetHeight}.${extension}`,
                    url: URL.createObjectURL(blob),
                    width: targetWidth,
                    height: targetHeight,
                  })
                }
                resolve()
              },
              outputType,
              0.92
            )
          }
          image.onerror = reject
          image.src = img.preview
        })
      }

      setResizedImages(resized)
    } catch {
      setError("An error occurred during resizing. Please try again.")
    } finally {
      setIsResizing(false)
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
    resizedImages.forEach((img) => {
      downloadImage(img.url, img.name)
    })
  }

  const presetSizes = [
    { label: "HD", width: 1280, height: 720 },
    { label: "Full HD", width: 1920, height: 1080 },
    { label: "Instagram", width: 1080, height: 1080 },
    { label: "Twitter", width: 1200, height: 675 },
    { label: "Thumbnail", width: 150, height: 150 },
  ]

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
          <h3 className="mt-4 text-lg font-semibold text-foreground">Upload Images to Resize</h3>
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
                  {img.width}x{img.height}
                </div>
              </div>
            ))}
          </div>

          {/* Dimension Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-foreground">Width (px)</label>
                <input
                  type="number"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  min="1"
                  max="10000"
                />
              </div>
              <button
                onClick={() => setMaintainAspect(!maintainAspect)}
                className={`mt-6 p-2 rounded-lg border transition-colors ${
                  maintainAspect
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
                title={maintainAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
              >
                {maintainAspect ? <Link className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
              </button>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-foreground">Height (px)</label>
                <input
                  type="number"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  min="1"
                  max="10000"
                />
              </div>
            </div>

            {/* Preset Sizes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presetSizes.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setTargetWidth(preset.width)
                      setTargetHeight(preset.height)
                      setMaintainAspect(false)
                      setResizedImages([])
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {preset.label} ({preset.width}x{preset.height})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {resizedImages.length === 0 ? (
            <Button
              className="w-full"
              size="lg"
              onClick={resizeImages}
              disabled={isResizing}
            >
              {isResizing ? (
                <>
                  <Maximize2 className="mr-2 h-4 w-4 animate-pulse" />
                  Resizing...
                </>
              ) : (
                <>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Resize to {targetWidth}x{targetHeight}
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <FileImage className="h-5 w-5" />
                  <span className="font-medium">Resize Complete!</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {resizedImages.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2"
                    >
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm text-foreground truncate">{img.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {img.width}x{img.height} pixels
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
                Download All ({resizedImages.length} files)
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
