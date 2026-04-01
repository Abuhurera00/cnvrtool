import { useState } from "react"

import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { clamp, formatNumber } from "@/lib/tool-utils"

export function DiscountCalculatorTool() {
  const [price, setPrice] = useState("199")
  const [discountRate, setDiscountRate] = useState("15")

  const amount = Number(price) || 0
  const discount = clamp(Number(discountRate) || 0, 0, 100)
  const saved = (amount * discount) / 100
  const finalPrice = amount - saved

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="Discount Calculator"
      description="Calculate promotional savings and final pricing with clearer spacing and more readable result cards."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="cnvr-soft-panel space-y-4">
          <Input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Original price"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            type="number"
            value={discountRate}
            onChange={(event) => setDiscountRate(event.target.value)}
            placeholder="Discount percent"
            className="bg-white dark:bg-slate-950"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Original</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              ${formatNumber(amount)}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Saved</p>
            <p className="mt-3 text-4xl font-semibold text-orange-700">
              ${formatNumber(saved)}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Final</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              ${formatNumber(finalPrice)}
            </p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
