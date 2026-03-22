"use client"

import { useState, useCallback } from "react"
import { Shield, Zap, Lock, Upload, X, Download, Loader2, ImageIcon, AlertCircle } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function BackgroundRemoverPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

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
    setError(null)
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
    setError(null)
  }

  const removeBackground = async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove background")
      }

      setProcessedImage(data.image)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
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
              Remove backgrounds from images instantly with AI. Perfect for product photos, portraits, and graphics. Get transparent PNG images in seconds.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>High Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Secure Processing</span>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-6">
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
                    Supports JPG, PNG, WEBP (max 12MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

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
                          {isProcessing ? (
                            <div className="text-center p-4">
                              <Loader2 className="h-12 w-12 text-primary mx-auto mb-2 animate-spin" />
                              <p className="text-sm text-muted-foreground">Removing background...</p>
                            </div>
                          ) : processedImage ? (
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
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
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
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Processing</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes the image, detects the subject, and precisely removes the background.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Download Result</h3>
                <p className="text-muted-foreground">
                  Download your image with a transparent background as a high-quality PNG file.
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
                  Our tool uses advanced AI technology to analyze your image, detect the main subject, and precisely remove the background while preserving fine details like hair and edges.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What quality can I expect?
                </h3>
                <p className="text-muted-foreground">
                  The AI produces professional-quality results with clean edges, even for complex subjects like hair, fur, or transparent objects.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a file size limit?
                </h3>
                <p className="text-muted-foreground">
                  Yes, the maximum file size is 12MB. For best results, we recommend images under 10MB.
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
                  Is my image secure?
                </h3>
                <p className="text-muted-foreground">
                  Your images are processed securely and are not stored after processing. We take your privacy seriously.
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
