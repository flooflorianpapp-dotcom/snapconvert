import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set REMOVE_BG_API_KEY environment variable." },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const imageFile = formData.get("image") as File | null

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Supported formats: JPG, PNG, WEBP" },
        { status: 400 }
      )
    }

    // Validate file size (remove.bg has a 12MB limit for free accounts)
    const maxSize = 12 * 1024 * 1024 // 12MB
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 12MB." },
        { status: 400 }
      )
    }

    // Prepare form data for remove.bg API
    const removeBgFormData = new FormData()
    removeBgFormData.append("image_file", imageFile)
    removeBgFormData.append("size", "auto")
    removeBgFormData.append("format", "png")

    // Call remove.bg API
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: removeBgFormData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      if (response.status === 402) {
        return NextResponse.json(
          { error: "API credits exhausted. Please check your remove.bg account." },
          { status: 402 }
        )
      }
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your REMOVE_BG_API_KEY." },
          { status: 403 }
        )
      }

      return NextResponse.json(
        { error: errorData.errors?.[0]?.title || "Failed to remove background" },
        { status: response.status }
      )
    }

    // Get the processed image as a buffer
    const imageBuffer = await response.arrayBuffer()
    
    // Convert to base64 for client-side display
    const base64Image = Buffer.from(imageBuffer).toString("base64")
    const dataUrl = `data:image/png;base64,${base64Image}`

    return NextResponse.json({
      success: true,
      image: dataUrl,
      creditsCharged: response.headers.get("X-Credits-Charged") || "1",
    })

  } catch (error) {
    console.error("Background removal error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
