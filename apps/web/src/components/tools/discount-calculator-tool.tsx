import { useState } from "react"

import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { clamp, formatNumber } from "@/lib/tool-utils"

export function DiscountCalculatorTool() {
  const [rupeesPrice, setRupeesPrice] = useState("5000")
  const [dollarsPrice, setDollarsPrice] = useState("19")
  const [discountRate, setDiscountRate] = useState("15")

  const rupeesAmount = Number(rupeesPrice) || 0
  const dollarsAmount = Number(dollarsPrice) || 0
  const discount = clamp(Number(discountRate) || 0, 0, 100)
  const rupeesSaved = (rupeesAmount * discount) / 100
  const dollarsSaved = (dollarsAmount * discount) / 100
  const finalRupees = rupeesAmount - rupeesSaved
  const finalDollars = dollarsAmount - dollarsSaved

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="Discount Calculator"
      description="Calculate discounted output for both rupees and dollars from one shared discount percentage."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="cnvr-soft-panel space-y-4">
          <Input
            type="number"
            value={rupeesPrice}
            onChange={(event) => setRupeesPrice(event.target.value)}
            placeholder="Original price in rupees"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            type="number"
            value={dollarsPrice}
            onChange={(event) => setDollarsPrice(event.target.value)}
            placeholder="Original price in dollars"
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
        <div className="grid gap-4 md:grid-cols-2">
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Discounted rupees
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              Rs {formatNumber(finalRupees)}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Saved: Rs {formatNumber(rupeesSaved)}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Discounted dollars
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              $ {formatNumber(finalDollars)}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Saved: $ {formatNumber(dollarsSaved)}
            </p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
