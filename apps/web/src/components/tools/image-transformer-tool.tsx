import { useState } from "react"
import type { ChangeEvent } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { clamp } from "@/lib/tool-utils"

type ImageTransformerToolProps = {
  mode: "jpeg-to-png" | "png-to-jpeg" | "compress" | "resize"
}

const content = {
  "jpeg-to-png": {
    title: "JPEG to PNG Converter",
    description: "Upload a JPEG and export a PNG version directly in the browser.",
    format: "image/png" as const,
  },
  "png-to-jpeg": {
    title: "PNG to JPEG Converter",
    description: "Upload a PNG and convert it into JPEG with quality control.",
    format: "image/jpeg" as const,
  },
  compress: {
    title: "Image Compressor",
    description: "Reduce output size by exporting with lower quality and optional resizing.",
    format: "image/jpeg" as const,
  },
  resize: {
    title: "Image Resizer",
    description: "Set a target width and height and download a resized image.",
    format: "image/png" as const,
  },
}

export function ImageTransformerTool({ mode }: ImageTransformerToolProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [quality, setQuality] = useState("0.82")
  const [status, setStatus] = useState("Upload an image to begin.")

  const config = content[mode]

  async function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setResult(null)
    setStatus("Image ready. Adjust settings and click process.")
  }

  async function processImage() {
    if (!preview) {
      setStatus("Please upload an image first.")
      return
    }

    const image = new Image()
    image.src = preview

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error("Image load failed"))
    })

    const canvas = document.createElement("canvas")
    canvas.width = Number(width) || image.width
    canvas.height = Number(height) || image.height

    const context = canvas.getContext("2d")
    if (!context) {
      setStatus("Canvas processing is not available.")
      return
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    const output = canvas.toDataURL(
      config.format,
      config.format === "image/jpeg"
        ? clamp(Number(quality) || 0.82, 0.1, 1)
        : undefined
    )

    setResult(output)
    setStatus(`Done. Output size is ${canvas.width}x${canvas.height}.`)
  }

  return (
    <ToolPageShell
      badge="Image Tool"
      title={config.title}
      description={config.description}
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={onUpload}
            className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              type="number"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
              placeholder="Width"
              className="bg-white"
            />
            <Input
              type="number"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder="Height"
              className="bg-white"
            />
          </div>
          <Input
            type="number"
            min="0.1"
            max="1"
            step="0.01"
            value={quality}
            onChange={(event) => setQuality(event.target.value)}
            placeholder="JPEG quality"
            className="bg-white"
          />
          <Button onClick={() => void processImage()}>Process image</Button>
          <p className="text-sm leading-7 text-slate-600">{status}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">Source</p>
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-4">
              {preview ? (
                <img src={preview} alt="Source preview" className="max-h-60 rounded-xl" />
              ) : (
                <p className="text-sm text-slate-500">Upload an image to preview it.</p>
              )}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">Output</p>
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-4">
              {result ? (
                <img src={result} alt="Processed output" className="max-h-60 rounded-xl" />
              ) : (
                <p className="text-sm text-slate-500">Processed output will appear here.</p>
              )}
            </div>
            {result ? (
              <a
                href={result}
                download={`${mode}-output${config.format === "image/png" ? ".png" : ".jpg"}`}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white"
              >
                Download image
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
