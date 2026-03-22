"use client"

import { useState, useRef, useCallback } from "react"
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Upload, Crop as CropIcon, Download, RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export default function CropImagePage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aspectOptions = [
    { label: "Free", value: undefined },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
    { label: "3:2", value: 3 / 2 },
    { label: "2:3", value: 2 / 3 },
  ]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG, or WEBP image")
      return
    }

    setFileName(file.name)
    setCroppedImageUrl(null)
    setCompletedCrop(undefined)

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget
      const initialCrop = aspect
        ? centerAspectCrop(width, height, aspect)
        : {
            unit: "%" as const,
            x: 10,
            y: 10,
            width: 80,
            height: 80,
          }
      setCrop(initialCrop)
    },
    [aspect]
  )

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect)
    if (imgRef.current && newAspect) {
      const { width, height } = imgRef.current
      setCrop(centerAspectCrop(width, height, newAspect))
    } else if (!newAspect && crop) {
      // Keep current crop when switching to free
      setCrop({ ...crop })
    }
  }

  const getCroppedImage = useCallback(async () => {
    if (!imgRef.current || !completedCrop) return

    setIsProcessing(true)

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      setIsProcessing(false)
      return
    }

    // Calculate the scale factor between displayed and natural size
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    // Set canvas size to the cropped dimensions at natural resolution
    canvas.width = completedCrop.width * scaleX
    canvas.height = completedCrop.height * scaleY

    // Draw the cropped portion
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    )

    // Convert to blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          if (croppedImageUrl) {
            URL.revokeObjectURL(croppedImageUrl)
          }
          setCroppedImageUrl(URL.createObjectURL(blob))
        }
        setIsProcessing(false)
      },
      "image/png",
      1
    )
  }, [completedCrop, croppedImageUrl])

  const downloadCroppedImage = () => {
    if (!croppedImageUrl) return
    const link = document.createElement("a")
    link.href = croppedImageUrl
    const baseName = fileName.replace(/\.[^/.]+$/, "")
    link.download = `${baseName}_cropped.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetCrop = () => {
    setCroppedImageUrl(null)
    setCompletedCrop(undefined)
    if (imgRef.current) {
      const { width, height } = imgRef.current
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect))
      } else {
        setCrop({
          unit: "%",
          x: 10,
          y: 10,
          width: 80,
          height: 80,
        })
      }
    }
  }

  const startOver = () => {
    setImageSrc(null)
    setCrop(undefined)
    setCompletedCrop(undefined)
    setCroppedImageUrl(null)
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <UnifiedHeader />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
              <CropIcon className="h-4 w-4" />
              Crop Image
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Crop Image Online
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Visually select and crop any part of your image. Perfect for removing unwanted areas or adjusting composition.
            </p>
          </div>

          {/* Main Tool Area */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />

            {!imageSrc ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 sm:p-12 cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Upload Image to Crop
                </h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Supports JPG, PNG, and WEBP formats
                </p>
                <Button className="mt-6" size="lg">
                  <Upload className="mr-2 h-4 w-4" />
                  Select Image
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Aspect Ratio Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-muted-foreground">Aspect Ratio:</span>
                  <div className="flex flex-wrap gap-2">
                    {aspectOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleAspectChange(option.value)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          aspect === option.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crop Area */}
                {!croppedImageUrl ? (
                  <div className="relative bg-secondary/20 rounded-xl p-4 flex items-center justify-center min-h-[400px]">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      className="max-h-[500px]"
                    >
                      <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="Upload"
                        onLoad={onImageLoad}
                        className="max-h-[500px] max-w-full object-contain"
                        crossOrigin="anonymous"
                      />
                    </ReactCrop>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Check className="h-4 w-4" />
                      Image cropped successfully
                    </div>
                    <div className="relative bg-secondary/20 rounded-xl p-4 flex items-center justify-center min-h-[300px]">
                      <img
                        src={croppedImageUrl}
                        alt="Cropped"
                        className="max-h-[400px] max-w-full object-contain rounded-lg border border-border"
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {!croppedImageUrl ? (
                    <>
                      <Button
                        onClick={getCroppedImage}
                        disabled={!completedCrop || isProcessing}
                        size="lg"
                        className="flex-1 sm:flex-none"
                      >
                        {isProcessing ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CropIcon className="mr-2 h-4 w-4" />
                            Crop Image
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={startOver}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Start Over
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={downloadCroppedImage} size="lg" className="flex-1 sm:flex-none">
                        <Download className="mr-2 h-4 w-4" />
                        Download PNG
                      </Button>
                      <Button variant="outline" onClick={resetCrop}>
                        <CropIcon className="mr-2 h-4 w-4" />
                        Crop Again
                      </Button>
                      <Button variant="outline" onClick={startOver}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        New Image
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* How It Works */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Upload Image",
                  description: "Select a JPG, PNG, or WEBP image from your device.",
                },
                {
                  step: "2",
                  title: "Select Area",
                  description: "Drag the crop box to select the portion you want to keep.",
                },
                {
                  step: "3",
                  title: "Download",
                  description: "Click Crop and download your perfectly cropped image.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="text-center p-6 rounded-xl bg-secondary/30 border border-border"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Supported Formats */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Supported Formats
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["JPG", "JPEG", "PNG", "WEBP"].map((format) => (
                <span
                  key={format}
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium text-foreground"
                >
                  {format}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                {
                  q: "How do I crop an image?",
                  a: "Upload your image, then drag the corners or edges of the crop box to select the area you want to keep. Click 'Crop Image' when you're done.",
                },
                {
                  q: "Can I crop to a specific aspect ratio?",
                  a: "Yes! Choose from preset ratios like 1:1 (square), 4:3, 16:9, or use 'Free' mode for custom proportions.",
                },
                {
                  q: "What happens to the image quality?",
                  a: "Your cropped image maintains the original resolution of the selected area. We don't compress or reduce quality.",
                },
                {
                  q: "Is my image uploaded to a server?",
                  a: "No. All cropping happens directly in your browser. Your images never leave your device.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-secondary/30 border border-border"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <UnifiedFooter />
    </main>
  )
}
