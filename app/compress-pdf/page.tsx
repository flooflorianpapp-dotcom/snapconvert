"use client"

import { useState, useCallback } from "react"
import { Shield, Zap, Lock, Upload, X, Download, Loader2, FileText, ArrowRight, CheckCircle } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CompressionLevel = "low" | "medium" | "high"

interface CompressionSettings {
  imageQuality: number
  maxImageWidth: number
  maxImageHeight: number
  removeMetadata: boolean
}

const compressionSettings: Record<CompressionLevel, CompressionSettings> = {
  low: {
    imageQuality: 0.85,
    maxImageWidth: 2400,
    maxImageHeight: 2400,
    removeMetadata: false,
  },
  medium: {
    imageQuality: 0.7,
    maxImageWidth: 1600,
    maxImageHeight: 1600,
    removeMetadata: true,
  },
  high: {
    imageQuality: 0.5,
    maxImageWidth: 1200,
    maxImageHeight: 1200,
    removeMetadata: true,
  },
}

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium")
  const [progress, setProgress] = useState<string>("")

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
    setProgress("")
  }

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  const compressImage = async (
    imageData: Uint8Array,
    mimeType: string,
    settings: CompressionSettings
  ): Promise<Uint8Array | null> => {
    return new Promise((resolve) => {
      const blob = new Blob([imageData], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const img = new Image()
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        
        let { width, height } = img
        const { maxImageWidth, maxImageHeight, imageQuality } = settings
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxImageWidth || height > maxImageHeight) {
          const ratio = Math.min(maxImageWidth / width, maxImageHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve(null)
          return
        }
        
        // Use better image smoothing for quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const arrayBuffer = await blob.arrayBuffer()
              resolve(new Uint8Array(arrayBuffer))
            } else {
              resolve(null)
            }
          },
          "image/jpeg",
          imageQuality
        )
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(null)
      }
      
      img.src = url
    })
  }

  const compressPdf = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress("Loading PDF...")

    try {
      const { PDFDocument, PDFName, PDFRawStream } = await import("pdf-lib")
      const pako = await import("pako")
      
      const settings = compressionSettings[compressionLevel]
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true,
        updateMetadata: !settings.removeMetadata 
      })

      setProgress("Analyzing document structure...")

      // Get all pages
      const pages = pdfDoc.getPages()
      let imagesProcessed = 0
      let totalImages = 0

      // First pass: count images
      for (const page of pages) {
        const resources = page.node.Resources()
        if (resources) {
          const xObject = resources.get(PDFName.of("XObject"))
          if (xObject) {
            const xObjectDict = pdfDoc.context.lookup(xObject)
            if (xObjectDict && typeof xObjectDict.entries === "function") {
              totalImages += Array.from(xObjectDict.entries()).length
            }
          }
        }
      }

      setProgress(`Found ${totalImages} embedded objects...`)

      // Process each page and compress images
      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const page = pages[pageIndex]
        setProgress(`Processing page ${pageIndex + 1} of ${pages.length}...`)

        try {
          const resources = page.node.Resources()
          if (!resources) continue

          const xObject = resources.get(PDFName.of("XObject"))
          if (!xObject) continue

          const xObjectDict = pdfDoc.context.lookup(xObject)
          if (!xObjectDict || typeof xObjectDict.entries !== "function") continue

          const entries = Array.from(xObjectDict.entries()) as [PDFName, unknown][]

          for (const [name, ref] of entries) {
            try {
              const obj = pdfDoc.context.lookup(ref as any)
              if (!obj) continue

              // Check if it's an image
              const dict = obj as any
              if (!dict.dict) continue

              const subtype = dict.dict.get(PDFName.of("Subtype"))
              if (!subtype || subtype.toString() !== "/Image") continue

              // Get image data
              const width = dict.dict.get(PDFName.of("Width"))?.numberValue || 0
              const height = dict.dict.get(PDFName.of("Height"))?.numberValue || 0

              // Skip small images
              if (width < 100 || height < 100) continue

              // Try to extract and recompress the image
              if (dict.contents && dict.contents instanceof Uint8Array) {
                // Decompress if needed
                let imageData = dict.contents
                const filter = dict.dict.get(PDFName.of("Filter"))
                
                if (filter) {
                  const filterStr = filter.toString()
                  if (filterStr === "/FlateDecode") {
                    try {
                      imageData = pako.inflate(dict.contents)
                    } catch {
                      // Skip if decompression fails
                      continue
                    }
                  } else if (filterStr === "/DCTDecode") {
                    // Already JPEG, try to recompress with lower quality
                    const compressed = await compressImage(dict.contents, "image/jpeg", settings)
                    if (compressed && compressed.length < dict.contents.length) {
                      // Replace with compressed version
                      const newStream = PDFRawStream.of(dict.dict.clone(pdfDoc.context), compressed)
                      pdfDoc.context.assign(ref as any, newStream)
                    }
                    imagesProcessed++
                    continue
                  }
                }

                // For raw image data, convert to JPEG
                const colorSpace = dict.dict.get(PDFName.of("ColorSpace"))?.toString() || "/DeviceRGB"
                const bitsPerComponent = dict.dict.get(PDFName.of("BitsPerComponent"))?.numberValue || 8

                if (colorSpace.includes("RGB") && bitsPerComponent === 8) {
                  // Create image from raw RGB data
                  const canvas = document.createElement("canvas")
                  canvas.width = width
                  canvas.height = height
                  const ctx = canvas.getContext("2d")
                  
                  if (ctx && imageData.length >= width * height * 3) {
                    const imgData = ctx.createImageData(width, height)
                    for (let i = 0, j = 0; i < width * height * 4; i += 4, j += 3) {
                      imgData.data[i] = imageData[j]
                      imgData.data[i + 1] = imageData[j + 1]
                      imgData.data[i + 2] = imageData[j + 2]
                      imgData.data[i + 3] = 255
                    }
                    ctx.putImageData(imgData, 0, 0)

                    const compressedBlob = await new Promise<Blob | null>((resolve) => {
                      canvas.toBlob(resolve, "image/jpeg", settings.imageQuality)
                    })

                    if (compressedBlob) {
                      const compressedData = new Uint8Array(await compressedBlob.arrayBuffer())
                      if (compressedData.length < imageData.length) {
                        // Update the stream
                        const newDict = dict.dict.clone(pdfDoc.context)
                        newDict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"))
                        newDict.delete(PDFName.of("DecodeParms"))
                        newDict.set(PDFName.of("Length"), pdfDoc.context.obj(compressedData.length))
                        
                        const newStream = PDFRawStream.of(newDict, compressedData)
                        pdfDoc.context.assign(ref as any, newStream)
                      }
                    }
                  }
                }

                imagesProcessed++
              }
            } catch {
              // Skip problematic objects
              continue
            }
          }
        } catch {
          // Skip problematic pages
          continue
        }
      }

      setProgress("Optimizing PDF structure...")

      // Remove metadata if high compression
      if (settings.removeMetadata) {
        pdfDoc.setTitle("")
        pdfDoc.setAuthor("")
        pdfDoc.setSubject("")
        pdfDoc.setKeywords([])
        pdfDoc.setProducer("")
        pdfDoc.setCreator("")
      }

      setProgress("Generating compressed PDF...")

      // Save with optimization options
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 20,
      })

      const blob = new Blob([compressedBytes], { type: "application/pdf" })
      setCompressedBlob(blob)
      setCompressedSize(blob.size)
      setProgress("")
    } catch (error) {
      console.error("PDF compression error:", error)
      alert("Error compressing PDF. The file may be encrypted or corrupted.")
      setProgress("")
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

  const savedBytes = originalSize - compressedSize

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
              Reduce PDF file size by compressing embedded images and optimizing document structure. Perfect for email attachments and uploads.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Real image compression</span>
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
                    Supports PDF files up to 100MB
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* File Info */}
                  <div className="relative flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30">
                    <button
                      onClick={removeFile}
                      disabled={isProcessing}
                      className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
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
                          { value: "low" as const, label: "Low", desc: "85% quality", reduction: "10-20%" },
                          { value: "medium" as const, label: "Medium", desc: "70% quality", reduction: "30-50%" },
                          { value: "high" as const, label: "High", desc: "50% quality", reduction: "50-70%" },
                        ].map((level) => (
                          <button
                            key={level.value}
                            onClick={() => setCompressionLevel(level.value)}
                            disabled={isProcessing}
                            className={cn(
                              "p-3 rounded-lg border text-left transition-colors disabled:opacity-50",
                              compressionLevel === level.value
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <p className="font-medium text-foreground">{level.label}</p>
                            <p className="text-xs text-muted-foreground">{level.desc}</p>
                            <p className="text-xs text-primary mt-1">~{level.reduction} smaller</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progress indicator */}
                  {isProcessing && progress && (
                    <div className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">{progress}</p>
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
                        <div className="flex items-center justify-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Original</p>
                            <p className="text-xl font-semibold text-foreground">
                              {formatSize(originalSize)}
                            </p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-muted-foreground" />
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Compressed</p>
                            <p className="text-xl font-semibold text-primary">
                              {formatSize(compressedSize)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          {compressionRatio > 0 ? (
                            <div className="flex items-center justify-center gap-2 text-green-500">
                              <CheckCircle className="h-5 w-5" />
                              <span className="font-medium">
                                Reduced by {compressionRatio}% ({formatSize(savedBytes)} saved)
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground text-center">
                              File is already well optimized. Try a higher compression level for more reduction.
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
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload PDF</h3>
                <p className="text-muted-foreground text-sm">
                  Drop or select a PDF file you want to compress.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Analyze Content</h3>
                <p className="text-muted-foreground text-sm">
                  We scan for embedded images and document structure.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Compress Images</h3>
                <p className="text-muted-foreground text-sm">
                  Images are resized and recompressed based on your settings.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Download Result</h3>
                <p className="text-muted-foreground text-sm">
                  Get your optimized PDF with reduced file size.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compression Levels Section */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Compression Levels Explained
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">Low Compression</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>85% image quality retained</li>
                  <li>Max 2400px image dimensions</li>
                  <li>Metadata preserved</li>
                  <li>Best for archival & printing</li>
                  <li>Typical reduction: 10-20%</li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <h3 className="text-lg font-semibold text-foreground">Medium Compression</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>70% image quality retained</li>
                  <li>Max 1600px image dimensions</li>
                  <li>Metadata removed</li>
                  <li>Best for email & sharing</li>
                  <li>Typical reduction: 30-50%</li>
                </ul>
                <p className="mt-3 text-xs text-primary font-medium">Recommended</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <h3 className="text-lg font-semibold text-foreground">High Compression</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>50% image quality retained</li>
                  <li>Max 1200px image dimensions</li>
                  <li>Metadata removed</li>
                  <li>Best for web & small files</li>
                  <li>Typical reduction: 50-70%</li>
                </ul>
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
                { title: "Email Attachments", desc: "Stay under 25MB limits" },
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
                  No. All compression happens entirely in your browser. Your documents never leave your device, ensuring complete privacy.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How does the compression work?
                </h3>
                <p className="text-muted-foreground">
                  We analyze embedded images in your PDF, resize them if needed, and recompress them using JPEG compression. We also optimize the PDF structure and optionally remove metadata.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Will compression affect quality?
                </h3>
                <p className="text-muted-foreground">
                  Text remains perfectly sharp as it is not affected. Images may show some quality loss depending on the compression level chosen. Low compression maintains near-original quality.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Why is my file not getting smaller?
                </h3>
                <p className="text-muted-foreground">
                  PDFs with mostly text or already-compressed images may not reduce much. Try a higher compression level, or the file may already be well optimized.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I compress password-protected PDFs?
                </h3>
                <p className="text-muted-foreground">
                  No. Encrypted or password-protected PDFs cannot be processed. You need to remove the protection first.
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
