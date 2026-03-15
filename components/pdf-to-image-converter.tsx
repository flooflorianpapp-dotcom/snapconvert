"use client"

import { useState, useRef } from "react"
import { Upload, FileImage, Trash2, Download, AlertCircle, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as pdfjsLib from "pdfjs-dist"

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface PDFFile {
  id: string
  file: File
  name: string
  pageCount?: number
}

interface ConvertedPage {
  name: string
  url: string
  pageNum: number
}

interface PdfToImageConverterProps {
  outputFormat: "jpeg" | "png"
  outputLabel: string
}

export function PdfToImageConverter({ outputFormat, outputLabel }: PdfToImageConverterProps) {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedImages, setConvertedImages] = useState<ConvertedPage[]>([])
  const [progress, setProgress] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setError(null)
    const newPdfs: PDFFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.type !== "application/pdf") {
        setError("Please select valid PDF files only")
        continue
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB")
        continue
      }

      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

      newPdfs.push({
        id: Math.random().toString(36).substring(7),
        file,
        name: file.name,
        pageCount: pdf.numPages,
      })
    }

    setPdfFiles((prev) => [...prev, ...newPdfs])
    setConvertedImages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removePdf = (id: string) => {
    setPdfFiles((prev) => prev.filter((p) => p.id !== id))
    setConvertedImages([])
  }

  const clearAll = () => {
    convertedImages.forEach((img) => URL.revokeObjectURL(img.url))
    setPdfFiles([])
    setConvertedImages([])
    setError(null)
  }

  const convertPdfs = async () => {
    if (pdfFiles.length === 0) {
      setError("Please upload at least one PDF file to convert")
      return
    }

    setIsConverting(true)
    setError(null)
    setProgress("Starting conversion...")

    try {
      const converted: ConvertedPage[] = []
      const scale = 2

      for (let pdfIndex = 0; pdfIndex < pdfFiles.length; pdfIndex++) {
        const pdfFile = pdfFiles[pdfIndex]
        setProgress(`Processing ${pdfFile.name}...`)

        const arrayBuffer = await pdfFile.file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          setProgress(`Converting ${pdfFile.name} - Page ${pageNum}/${pdf.numPages}`)

          const page = await pdf.getPage(pageNum)
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")!
          canvas.width = viewport.width
          canvas.height = viewport.height

          if (outputFormat === "jpeg") {
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }

          await page.render({
            canvasContext: ctx,
            viewport,
          }).promise

          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(
              (b) => resolve(b!),
              `image/${outputFormat}`,
              0.92
            )
          })

          const baseName = pdfFile.name.replace(/\.pdf$/i, "")
          const extension = outputFormat === "jpeg" ? "jpg" : "png"
          converted.push({
            name: `${baseName}_page_${pageNum}.${extension}`,
            url: URL.createObjectURL(blob),
            pageNum,
          })
        }
      }

      setConvertedImages(converted)
      setProgress("")
    } catch {
      setError("An error occurred during conversion. Please try again.")
    } finally {
      setIsConverting(false)
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
    convertedImages.forEach((img) => {
      downloadImage(img.url, img.name)
    })
  }

  const totalPages = pdfFiles.reduce((sum, pdf) => sum + (pdf.pageCount || 0), 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        multiple
        className="hidden"
      />

      {pdfFiles.length === 0 ? (
        <div
          onClick={handleUploadClick}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 sm:p-12 cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Upload PDF Files</h3>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Drag and drop or click to select PDF files
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Maximum file size: 50MB</p>
          <Button className="mt-6" size="lg">
            <Upload className="mr-2 h-4 w-4" />
            Select PDFs
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {pdfFiles.length} PDF{pdfFiles.length !== 1 ? "s" : ""} ({totalPages} pages)
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

          <div className="space-y-3">
            {pdfFiles.map((pdf) => (
              <div
                key={pdf.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{pdf.name}</p>
                  <p className="text-xs text-muted-foreground">{pdf.pageCount} pages</p>
                </div>
                <button
                  onClick={() => removePdf(pdf.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {convertedImages.length === 0 ? (
            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={convertPdfs}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <FileImage className="mr-2 h-4 w-4 animate-pulse" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileImage className="mr-2 h-4 w-4" />
                    Convert to {outputLabel}
                  </>
                )}
              </Button>
              {progress && (
                <p className="text-sm text-center text-muted-foreground">{progress}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <FileImage className="h-5 w-5" />
                  <span className="font-medium">
                    Conversion Complete! ({convertedImages.length} images)
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {convertedImages.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm text-foreground truncate flex-1 mr-2">
                        {img.name}
                      </span>
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
                Download All ({convertedImages.length} images)
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
