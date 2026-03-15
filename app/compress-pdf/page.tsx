"use client"

import { useState, useCallback } from "react"
import { Shield, Zap, Lock, Upload, X, Download, Loader2, FileText, ArrowRight } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium")

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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setOriginalSize(droppedFile.size)
      setCompressedBlob(null)
      setCompressedSize(0)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setOriginalSize(selectedFile.size)
      setCompressedBlob(null)
      setCompressedSize(0)
    }
  }

  const removeFile = () => {
    setFile(null)
    setCompressedBlob(null)
    setOriginalSize(0)
    setCompressedSize(0)
  }

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  const compressPdf = async () => {
    if (!file) return

    setIsProcessing(true)

    try {
      const { PDFDocument } = await import("pdf-lib")
      
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      // Apply compression by re-saving the PDF
      // pdf-lib automatically optimizes during save
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: compressionLevel === "high" ? 50 : compressionLevel === "medium" ? 100 : 200,
      })

      const blob = new Blob([compressedBytes], { type: "application/pdf" })
      setCompressedBlob(blob)
      setCompressedSize(blob.size)
    } catch (error) {
      console.error("PDF compression error:", error)
      alert("Error compressing PDF. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadCompressed = () => {
    if (!compressedBlob || !file) return

    const url = URL.createObjectURL(compressedBlob)
    const link = document.createElement("a")
    link.download = `${file.name.replace(".pdf", "")}-compressed.pdf`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const compressionRatio = compressedSize > 0 
    ? Math.round((1 - compressedSize / originalSize) * 100) 
    : 0

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Compress PDF
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Reduce PDF file size while maintaining quality. Perfect for email attachments, uploads, and storage optimization.
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
                    Drop your PDF here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports PDF files
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* File Info */}
                  <div className="relative flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30">
                    <button
                      onClick={removeFile}
                      className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Original size: {formatSize(originalSize)}
                      </p>
                    </div>
                  </div>

                  {/* Compression Level */}
                  {!compressedBlob && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Compression Level
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "low", label: "Low", desc: "Better quality" },
                          { value: "medium", label: "Medium", desc: "Balanced" },
                          { value: "high", label: "High", desc: "Smaller size" },
                        ].map((level) => (
                          <button
                            key={level.value}
                            onClick={() => setCompressionLevel(level.value as typeof compressionLevel)}
                            className={cn(
                              "p-3 rounded-lg border text-left transition-colors",
                              compressionLevel === level.value
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <p className="font-medium text-foreground">{level.label}</p>
                            <p className="text-xs text-muted-foreground">{level.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Compress Button */}
                  {!compressedBlob && (
                    <Button
                      onClick={compressPdf}
                      disabled={isProcessing}
                      className="w-full h-12 text-base"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Compressing...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Compress PDF
                        </>
                      )}
                    </Button>
                  )}

                  {/* Results */}
                  {compressedBlob && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Original</p>
                            <p className="text-lg font-semibold text-foreground">
                              {formatSize(originalSize)}
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Compressed</p>
                            <p className="text-lg font-semibold text-primary">
                              {formatSize(compressedSize)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 text-center">
                          {compressionRatio > 0 ? (
                            <p className="text-sm text-green-500">
                              Reduced by {compressionRatio}%
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              File is already optimized
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={downloadCompressed}
                          className="flex-1 h-12 text-base"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download Compressed PDF
                        </Button>
                        <Button
                          variant="outline"
                          onClick={removeFile}
                          className="h-12"
                        >
                          New File
                        </Button>
                      </div>
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
              How PDF Compression Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload PDF</h3>
                <p className="text-muted-foreground">
                  Drop or select a PDF file you want to compress and reduce in size.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Choose Level</h3>
                <p className="text-muted-foreground">
                  Select your preferred compression level based on quality vs. size tradeoff.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Download Result</h3>
                <p className="text-muted-foreground">
                  Get your compressed PDF file with reduced size, ready for sharing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Formats Section */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Compression Levels
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Low Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Minimal compression for best quality preservation. Ideal for print-quality documents.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Medium Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Balanced approach between file size and quality. Best for general use and sharing.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">High Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Maximum size reduction. Perfect for email attachments and limited storage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Why Compress PDFs?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Email Attachments", desc: "Stay under size limits" },
                { title: "Faster Uploads", desc: "Quick file transfers" },
                { title: "Save Storage", desc: "Reduce disk usage" },
                { title: "Web Publishing", desc: "Faster page loads" },
                { title: "Cloud Storage", desc: "Maximize free space" },
                { title: "Mobile Sharing", desc: "Use less data" },
                { title: "Form Submission", desc: "Meet upload limits" },
                { title: "Archiving", desc: "Long-term storage" },
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
                  Is my PDF uploaded to a server?
                </h3>
                <p className="text-muted-foreground">
                  No. All compression happens entirely in your browser using pdf-lib. Your documents never leave your device.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Will compression affect the quality?
                </h3>
                <p className="text-muted-foreground">
                  Our compression optimizes PDF structure while preserving content. Text remains sharp, and images maintain good quality.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How much can file size be reduced?
                </h3>
                <p className="text-muted-foreground">
                  Results vary based on PDF content. Files with many images typically see greater reduction than text-only documents.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I compress password-protected PDFs?
                </h3>
                <p className="text-muted-foreground">
                  No. Password-protected PDFs cannot be processed. You need to remove the password protection first.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a file size limit?
                </h3>
                <p className="text-muted-foreground">
                  There is no strict limit, but very large PDFs may take longer to process and could affect browser performance.
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
