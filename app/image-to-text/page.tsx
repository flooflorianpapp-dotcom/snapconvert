"use client"

import { useState, useCallback } from "react"
import { Metadata } from "next"
import { Shield, Zap, Lock, Upload, X, FileText, Copy, Check, Loader2 } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Note: Metadata needs to be in a separate file for client components
// We'll create a layout file for this

export default function ImageToTextPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressStatus, setProgressStatus] = useState("")
  const [copied, setCopied] = useState(false)
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
    setExtractedText("")
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
    setExtractedText("")
    setProgress(0)
    setProgressStatus("")
  }

  const extractText = async () => {
    if (!file || !preview) return

    setIsProcessing(true)
    setProgress(0)
    setProgressStatus("Initializing OCR engine...")

    try {
      const Tesseract = await import("tesseract.js")
      
      const result = await Tesseract.recognize(preview, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100))
            setProgressStatus("Recognizing text...")
          } else if (m.status === "loading language traineddata") {
            setProgressStatus("Loading language data...")
          } else if (m.status === "initializing tesseract") {
            setProgressStatus("Initializing OCR engine...")
          } else if (m.status === "loading tesseract core") {
            setProgressStatus("Loading OCR core...")
          }
        },
      })

      setExtractedText(result.data.text)
    } catch (error) {
      console.error("OCR error:", error)
      setExtractedText("Error extracting text. Please try again with a different image.")
    } finally {
      setIsProcessing(false)
      setProgress(0)
      setProgressStatus("")
    }
  }

  const copyToClipboard = async () => {
    if (!extractedText) return
    
    try {
      await navigator.clipboard.writeText(extractedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Image to Text (OCR)
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Extract text from images using optical character recognition. Upload a photo of any document, screenshot, or image with text and get editable text instantly.
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
                    <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full max-h-[400px] object-contain"
                        />
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground text-center">
                      {file.name}
                    </p>
                  </div>

                  {/* Extract Button */}
                  {!extractedText && (
                    <Button
                      onClick={extractText}
                      disabled={isProcessing}
                      className="w-full h-12 text-base"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {progressStatus} {progress > 0 && `(${progress}%)`}
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Extract Text
                        </>
                      )}
                    </Button>
                  )}

                  {/* Progress Bar */}
                  {isProcessing && progress > 0 && (
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Extracted Text */}
                  {extractedText && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground">
                          Extracted Text
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy Text
                            </>
                          )}
                        </Button>
                      </div>
                      <textarea
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        className="w-full min-h-[200px] rounded-lg border border-border bg-background p-4 text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Extracted text will appear here..."
                      />
                      <Button
                        variant="outline"
                        onClick={removeFile}
                        className="w-full"
                      >
                        Extract from Another Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How Image to Text Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload Image</h3>
                <p className="text-muted-foreground">
                  Drop or select an image containing text. We support JPG, PNG, and WEBP formats.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">OCR Processing</h3>
                <p className="text-muted-foreground">
                  Our OCR engine analyzes your image and recognizes all text characters using Tesseract.js.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Copy & Use</h3>
                <p className="text-muted-foreground">
                  Copy the extracted text to your clipboard or edit it directly in the text box.
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
                  The most common image format. Works great for photos of documents, receipts, and printed text.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">PNG</h3>
                <p className="text-sm text-muted-foreground">
                  Ideal for screenshots and images with sharp text. Lossless format preserves text clarity.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">WEBP</h3>
                <p className="text-sm text-muted-foreground">
                  Modern format used by many websites. Full support for extracting text from WEBP images.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              What You Can Extract Text From
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Screenshots", desc: "Extract text from any screenshot" },
                { title: "Documents", desc: "Digitize printed documents" },
                { title: "Receipts", desc: "Convert receipts to text" },
                { title: "Business Cards", desc: "Extract contact information" },
                { title: "Handwritten Notes", desc: "Convert handwriting to text" },
                { title: "Book Pages", desc: "Digitize book content" },
                { title: "Signs & Labels", desc: "Extract text from photos" },
                { title: "Whiteboards", desc: "Capture meeting notes" },
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
                  Is my image data sent to a server?
                </h3>
                <p className="text-muted-foreground">
                  No. All OCR processing happens entirely in your browser using Tesseract.js. Your images never leave your device, ensuring complete privacy.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What languages are supported?
                </h3>
                <p className="text-muted-foreground">
                  Currently, we support English text recognition. The OCR engine works best with clear, well-lit images with printed text.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How accurate is the text extraction?
                </h3>
                <p className="text-muted-foreground">
                  Accuracy depends on image quality. Clear images with good contrast and legible text typically achieve 90%+ accuracy. Blurry or low-resolution images may have lower accuracy.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I extract text from handwritten notes?
                </h3>
                <p className="text-muted-foreground">
                  Yes, but accuracy varies based on handwriting legibility. Neat, consistent handwriting works better than cursive or messy writing.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a file size limit?
                </h3>
                <p className="text-muted-foreground">
                  There is no strict file size limit, but larger images take longer to process. For best performance, we recommend images under 5MB.
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
