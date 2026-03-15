"use client"

import { useState, useCallback, useRef } from "react"
import { Shield, Zap, Lock, Upload, X, Download, Loader2, ImageIcon } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function BackgroundRemoverPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidImageType(droppedFile.type)) {
      processFile(droppedFile)
    }
  }, [])

  const isValidImageType = (type: string) => {
    return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(type)
  }

  const processFile = (selectedFile: File) => {
    setFile(selectedFile)
    setProcessedImage(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isValidImageType(selectedFile.type)) {
      processFile(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    setProcessedImage(null)
  }

  const removeBackground = async () => {
    if (!preview || !canvasRef.current) return

    setIsProcessing(true)

    try {
      const img = new Image()
      img.crossOrigin = "anonymous"
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = preview
      })

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Simple background removal based on edge detection and color similarity
      // Sample background color from corners
      const bgColors = [
        { r: data[0], g: data[1], b: data[2] },
        { r: data[(canvas.width - 1) * 4], g: data[(canvas.width - 1) * 4 + 1], b: data[(canvas.width - 1) * 4 + 2] },
        { r: data[(canvas.height - 1) * canvas.width * 4], g: data[(canvas.height - 1) * canvas.width * 4 + 1], b: data[(canvas.height - 1) * canvas.width * 4 + 2] },
        { r: data[data.length - 4], g: data[data.length - 3], b: data[data.length - 2] },
      ]

      // Average background color
      const avgBg = {
        r: Math.round(bgColors.reduce((sum, c) => sum + c.r, 0) / 4),
        g: Math.round(bgColors.reduce((sum, c) => sum + c.g, 0) / 4),
        b: Math.round(bgColors.reduce((sum, c) => sum + c.b, 0) / 4),
      }

      // Color distance threshold
      const threshold = 50

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Calculate color distance from background
        const distance = Math.sqrt(
          Math.pow(r - avgBg.r, 2) +
          Math.pow(g - avgBg.g, 2) +
          Math.pow(b - avgBg.b, 2)
        )

        // Make pixel transparent if close to background color
        if (distance < threshold) {
          data[i + 3] = 0 // Set alpha to 0
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setProcessedImage(canvas.toDataURL("image/png"))
    } catch (error) {
      console.error("Background removal error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage || !file) return

    const link = document.createElement("a")
    link.download = `${file.name.replace(/\.[^/.]+$/, "")}-no-bg.png`
    link.href = processedImage
    link.click()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Background Remover
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Remove backgrounds from images instantly. Perfect for product photos, portraits, and graphics. Get transparent PNG images in seconds.
            </p>

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
          </div>

          <div className="mt-10 w-full max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-6">
              <canvas ref={canvasRef} className="hidden" />
              
              {!file ? (
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors",
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop your image here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, WEBP
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative">
                    <button
                      onClick={removeFile}
                      className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2 text-center">Original</p>
                        <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
                          {preview && (
                            <img
                              src={preview}
                              alt="Original"
                              className="w-full max-h-[300px] object-contain"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2 text-center">Result</p>
                        <div 
                          className="rounded-lg border border-border overflow-hidden min-h-[200px] flex items-center justify-center"
                          style={{
                            backgroundImage: processedImage ? "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\"><rect width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23444\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23444\"/></svg>')" : "none",
                            backgroundSize: "20px 20px",
                            backgroundColor: processedImage ? "transparent" : "hsl(var(--muted)/0.3)"
                          }}
                        >
                          {processedImage ? (
                            <img
                              src={processedImage}
                              alt="Result"
                              className="w-full max-h-[300px] object-contain"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Result will appear here</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground text-center">
                      {file.name}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {!processedImage ? (
                      <Button
                        onClick={removeBackground}
                        disabled={isProcessing}
                        className="flex-1 h-12 text-base"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <ImageIcon className="mr-2 h-5 w-5" />
                            Remove Background
                          </>
                        )}
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={downloadImage}
                          className="flex-1 h-12 text-base"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download PNG
                        </Button>
                        <Button
                          variant="outline"
                          onClick={removeFile}
                          className="h-12"
                        >
                          New Image
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How Background Removal Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload Image</h3>
                <p className="text-muted-foreground">
                  Drop or select an image with a subject you want to isolate from the background.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Auto Detection</h3>
                <p className="text-muted-foreground">
                  Our algorithm analyzes the image and detects the background based on color patterns.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Download Result</h3>
                <p className="text-muted-foreground">
                  Download your image with a transparent background as a PNG file.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Formats Section */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Supported Image Formats
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">JPG / JPEG</h3>
                <p className="text-sm text-muted-foreground">
                  Remove backgrounds from photos, portraits, and product images in JPG format.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">PNG</h3>
                <p className="text-sm text-muted-foreground">
                  Process PNG images and output transparent backgrounds in the same format.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">WEBP</h3>
                <p className="text-sm text-muted-foreground">
                  Full support for modern WEBP images with high-quality background removal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Perfect For
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Product Photos", desc: "Clean backgrounds for e-commerce" },
                { title: "Profile Pictures", desc: "Professional headshots" },
                { title: "Social Media", desc: "Eye-catching graphics" },
                { title: "Presentations", desc: "Clean visuals for slides" },
                { title: "Marketing", desc: "Banner and ad images" },
                { title: "Logos", desc: "Transparent logo backgrounds" },
                { title: "Photo Editing", desc: "Composite multiple images" },
                { title: "Design Projects", desc: "Isolated elements for design" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How does background removal work?
                </h3>
                <p className="text-muted-foreground">
                  Our tool analyzes the colors in your image, detects the background based on color patterns from the edges, and makes those pixels transparent.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What type of backgrounds work best?
                </h3>
                <p className="text-muted-foreground">
                  Solid, uniform backgrounds (like white, green screen, or plain colors) work best. Complex or gradient backgrounds may require manual editing.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is my image uploaded to a server?
                </h3>
                <p className="text-muted-foreground">
                  No. All processing happens locally in your browser. Your images never leave your device, ensuring complete privacy.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What format is the output?
                </h3>
                <p className="text-muted-foreground">
                  The output is always a PNG file, which supports transparency. This allows you to use the image on any background.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a file size limit?
                </h3>
                <p className="text-muted-foreground">
                  There is no strict limit, but larger images may take longer to process. For best performance, images under 10MB are recommended.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
