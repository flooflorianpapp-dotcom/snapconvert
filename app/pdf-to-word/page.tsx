"use client"

import { useState, useCallback } from "react"
import { Shield, Zap, Lock, Upload, X, Download, Loader2, FileText } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PdfToWordPage() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setExtractedText("")
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setExtractedText("")
    }
  }

  const removeFile = () => {
    setFile(null)
    setExtractedText("")
  }

  const convertToWord = async () => {
    if (!file) return

    setIsProcessing(true)

    try {
      // Load PDF.js dynamically
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

      let fullText = ""

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ")
        fullText += pageText + "\n\n"
      }

      setExtractedText(fullText.trim())
    } catch (error) {
      console.error("PDF conversion error:", error)
      setExtractedText("Error processing PDF. Please try again with a different file.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadAsDoc = () => {
    if (!extractedText || !file) return

    // Create a simple HTML document that Word can open
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${file.name.replace(".pdf", "")}</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; white-space: pre-wrap;">
${extractedText}
  </div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `${file.name.replace(".pdf", "")}.doc`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              PDF to Word
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Convert PDF documents to editable Word format. Extract text from PDFs and download as a document you can edit in Microsoft Word or Google Docs.
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
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  {/* Convert Button */}
                  {!extractedText && (
                    <Button
                      onClick={convertToWord}
                      disabled={isProcessing}
                      className="w-full h-12 text-base"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Convert to Word
                        </>
                      )}
                    </Button>
                  )}

                  {/* Extracted Text Preview */}
                  {extractedText && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground">
                          Extracted Content Preview
                        </h3>
                      </div>
                      <div className="rounded-lg border border-border bg-background p-4 max-h-[300px] overflow-y-auto">
                        <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                          {extractedText.slice(0, 2000)}
                          {extractedText.length > 2000 && "..."}
                        </pre>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={downloadAsDoc}
                          className="flex-1 h-12 text-base"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download as Word
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
              How PDF to Word Conversion Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload PDF</h3>
                <p className="text-muted-foreground">
                  Drop or select a PDF document you want to convert to an editable Word format.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Text Extraction</h3>
                <p className="text-muted-foreground">
                  Our tool extracts all text content from your PDF while preserving paragraphs.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Download Word</h3>
                <p className="text-muted-foreground">
                  Download your document as a Word file that you can edit in any word processor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Formats Section */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Supported Formats
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Input: PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Upload any PDF document containing text. Works best with text-based PDFs rather than scanned documents.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Output: DOC</h3>
                <p className="text-sm text-muted-foreground">
                  Download as a DOC file compatible with Microsoft Word, Google Docs, LibreOffice, and other word processors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Common Use Cases
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Edit Documents", desc: "Make changes to PDF content" },
                { title: "Extract Text", desc: "Copy text from locked PDFs" },
                { title: "Reformat Content", desc: "Change layouts and styling" },
                { title: "Collaboration", desc: "Share editable documents" },
                { title: "Reports", desc: "Edit and update old reports" },
                { title: "Contracts", desc: "Modify contract templates" },
                { title: "Research", desc: "Work with academic papers" },
                { title: "Archives", desc: "Convert old documents" },
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
                  No. All processing happens entirely in your browser using PDF.js. Your documents never leave your device.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Will the formatting be preserved?
                </h3>
                <p className="text-muted-foreground">
                  The text content is extracted and basic paragraph structure is preserved. Complex formatting like tables and columns may need manual adjustment.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Does it work with scanned PDFs?
                </h3>
                <p className="text-muted-foreground">
                  This tool works best with text-based PDFs. For scanned documents (images in PDF), use our Image to Text (OCR) tool first.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I convert password-protected PDFs?
                </h3>
                <p className="text-muted-foreground">
                  No. Password-protected PDFs cannot be processed. You need to remove the password protection first.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a page limit?
                </h3>
                <p className="text-muted-foreground">
                  There is no strict page limit, but very large PDFs may take longer to process and could affect browser performance.
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
