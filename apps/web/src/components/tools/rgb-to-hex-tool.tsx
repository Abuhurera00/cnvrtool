import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { rgbToHex } from "@/lib/tool-utils"

export function RgbToHexTool() {
  const [rgb, setRgb] = useState({ red: "255", green: "102", blue: "24" })
  const hex = rgbToHex(
    Number(rgb.red) || 0,
    Number(rgb.green) || 0,
    Number(rgb.blue) || 0
  )

  return (
    <ToolPageShell
      badge="Website Tool"
      title="RGB to HEX Generator"
      description="Convert RGB color values into HEX with a clearer visual preview."
    >
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="cnvr-soft-panel grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <Input
            type="number"
            value={rgb.red}
            onChange={(event) => setRgb((current) => ({ ...current, red: event.target.value }))}
            placeholder="Red"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            type="number"
            value={rgb.green}
            onChange={(event) =>
              setRgb((current) => ({ ...current, green: event.target.value }))
            }
            placeholder="Green"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            type="number"
            value={rgb.blue}
            onChange={(event) => setRgb((current) => ({ ...current, blue: event.target.value }))}
            placeholder="Blue"
            className="bg-white dark:bg-slate-950"
          />
        </div>
        <div className="cnvr-panel p-6">
          <p className="text-sm font-semibold text-slate-900">Hex output</p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="size-24 rounded-[1.75rem] border border-slate-200"
              style={{ backgroundColor: hex }}
            />
            <div className="space-y-3">
              <p className="text-4xl font-semibold text-slate-950">{hex}</p>
              <Button variant="outline" onClick={() => void navigator.clipboard.writeText(hex)}>
                Copy HEX
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
