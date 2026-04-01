import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { API_BASE_URL } from "@/lib/api"

export function QrCodeTool() {
  const [text, setText] = useState("https://www.cnvrtool.com/")
  const [svg, setSvg] = useState("")
  const [status, setStatus] = useState("Generate a QR code from text or a URL.")

  async function generate() {
    setStatus("Generating QR code...")

    try {
      const response = await fetch(`${API_BASE_URL}/api/tools/qr-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, size: 320 }),
      })

      const payload = (await response.json()) as { svg: string }
      setSvg(payload.svg)
      setStatus("QR code ready.")
    } catch {
      setStatus("QR generation failed. Start the server and try again.")
    }
  }

  return (
    <ToolPageShell
      badge="Website Tool"
      title="QR Code Generator"
      description="Generate QR codes from a URL or text using the Express backend."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="bg-white"
            placeholder="Enter URL or text"
          />
          <Button onClick={() => void generate()}>Generate QR code</Button>
          <p className="text-sm leading-7 text-slate-600">{status}</p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-900">Preview</p>
          <div className="mt-5 flex min-h-80 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-4">
            {svg ? (
              <div
                className="overflow-hidden rounded-xl"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <p className="text-sm text-slate-500">The generated QR code will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
