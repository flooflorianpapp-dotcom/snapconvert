"use client"

import { useState, useCallback } from "react"
import { Shield, Zap, Lock, Upload, X, Download, Loader2, FileText, GripVertical, Plus } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PdfFile {
  id: string
  file: File
  name: string
  size: number
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<PdfFile[]>([])
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

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    )
    addFiles(droppedFiles)
  }, [])

  const addFiles = (newFiles: File[]) => {
    const pdfFiles: PdfFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
    }))
    setFiles((prev) => [...prev, ...pdfFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(
      (file) => file.type === "application/pdf"
    )
    addFiles(selectedFiles)
    e.target.value = ""
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      const [movedFile] = newFiles.splice(fromIndex, 1)
      newFiles.splice(toIndex, 0, movedFile)
      return newFiles
    })
  }

  const clearAll = () => {
    setFiles([])
  }

  const mergePdfs = async () => {
    if (files.length < 2) return

    setIsProcessing(true)

    try {
      const { PDFDocument } = await import("pdf-lib")
      
      const mergedPdf = await PDFDocument.create()

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.download = "merged.pdf"
      link.href = url
      link.click()
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("PDF merge error:", error)
      alert("Error merging PDFs. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Merge PDF Files
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Combine multiple PDF documents into a single file. Drag and drop to reorder pages, then download your merged PDF instantly.
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
              {/* Upload Area */}
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-base font-medium text-foreground mb-1">
                  Drop PDF files here
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  or click to browse
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <p className="text-xs text-muted-foreground">
                  Select multiple PDFs to merge
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">
                      {files.length} file{files.length !== 1 ? "s" : ""} selected
                    </h3>
                    <Button variant="ghost" size="sm" onClick={clearAll}>
                      Clear all
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {files.map((pdfFile, index) => (
                      <div
                        key={pdfFile.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GripVertical className="h-4 w-4 cursor-grab" />
                          <span className="text-sm font-medium w-6">{index + 1}.</span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {pdfFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveFile(index, index - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Move up</span>
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </Button>
                          )}
                          {index < files.length - 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveFile(index, index + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Move down</span>
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(pdfFile.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <span className="sr-only">Remove</span>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Button */}
                  <label className="relative flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer transition-colors">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add more PDFs</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={handleFileSelect}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </label>

                  {/* Merge Button */}
                  <Button
                    onClick={mergePdfs}
                    disabled={files.length < 2 || isProcessing}
                    className="w-full h-12 text-base"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Merging PDFs...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Merge & Download PDF
                      </>
                    )}
                  </Button>

                  {files.length < 2 && (
                    <p className="text-sm text-muted-foreground text-center">
                      Add at least 2 PDFs to merge
                    </p>
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
              How PDF Merging Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload PDFs</h3>
                <p className="text-muted-foreground">
                  Drop or select multiple PDF files you want to combine into one document.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Arrange Order</h3>
                <p className="text-muted-foreground">
                  Reorder your PDF files by using the up/down arrows to get the sequence you want.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Download Merged</h3>
                <p className="text-muted-foreground">
                  Click merge and download your combined PDF file instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Formats Section */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Supported Format
            </h2>
            <div className="max-w-md mx-auto">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">PDF Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Upload any number of PDF files and merge them into a single document. All pages from each PDF are preserved in the final output.
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
                { title: "Reports", desc: "Combine multiple report sections" },
                { title: "Invoices", desc: "Merge invoices for filing" },
                { title: "Contracts", desc: "Combine contract pages" },
                { title: "Portfolios", desc: "Create portfolio documents" },
                { title: "Presentations", desc: "Combine slide decks" },
                { title: "Research", desc: "Merge research papers" },
                { title: "Applications", desc: "Combine application forms" },
                { title: "Archives", desc: "Consolidate document archives" },
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
                  Are my PDFs uploaded to a server?
                </h3>
                <p className="text-muted-foreground">
                  No. All processing happens entirely in your browser using pdf-lib. Your documents never leave your device.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How many PDFs can I merge at once?
                </h3>
                <p className="text-muted-foreground">
                  There is no strict limit on the number of PDFs. However, merging many large files may affect browser performance.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Will the formatting be preserved?
                </h3>
                <p className="text-muted-foreground">
                  Yes. All pages are copied exactly as they appear in the original PDFs, including images, fonts, and formatting.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I merge password-protected PDFs?
                </h3>
                <p className="text-muted-foreground">
                  No. Password-protected PDFs cannot be processed. You need to remove the password protection first.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I change the order of PDFs?
                </h3>
                <p className="text-muted-foreground">
                  Yes. Use the up/down arrows next to each file to reorder them before merging. The final PDF will follow your arranged order.
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
