"use client"

/* 
  Temporarily disabled – will be re-enabled later
  
  This tool is hidden from navigation but the code is preserved.
  To re-enable:
  1. Remove the "Coming Soon" wrapper below
  2. Uncomment the full tool component
  3. Add back to tools-config.ts in the "image-utilities" category:
     { name: "Background Remover", description: "Remove backgrounds from images instantly", href: "/background-remover" }
  4. Add back to sitemap.ts
*/

import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BackgroundRemoverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-24 sm:py-32">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <ImageIcon className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Coming Soon
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI-powered Background Remover is currently being improved to deliver even better results. Check back soon!
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/tools">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Other Tools
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}

/*
  ===========================================
  PRESERVED FULL IMPLEMENTATION BELOW
  Uncomment to re-enable the tool
  ===========================================

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
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

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

        <section id="how-it-works" className="py-16 px-4 border-t border-border">
          ... SEO sections preserved ...
        </section>
      </main>
      <UnifiedFooter />
    </div>
  )
}
*/
