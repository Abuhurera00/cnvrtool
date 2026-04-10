import { useState } from "react"

import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { formatNumber } from "@/lib/tool-utils"

const currencyConfig = {
  USD: { fixed: 0.49, symbol: "$" },
  EUR: { fixed: 0.35, symbol: "EUR " },
  GBP: { fixed: 0.39, symbol: "GBP " },
} as const

type Currency = keyof typeof currencyConfig

export function PaypalFeeConverterTool() {
  const [amount, setAmount] = useState("100")
  const [currency, setCurrency] = useState<Currency>("USD")

  const gross = Number(amount) || 0
  const percentage = 3.49
  const fixed = currencyConfig[currency].fixed
  const symbol = currencyConfig[currency].symbol
  const fee = gross * (percentage / 100) + fixed
  const net = gross - fee
  const requiredToReceive = (gross + fixed) / (1 - percentage / 100 || 1)

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="PayPal Fee Converter"
      description="Estimate PayPal fees from just an amount and currency, then view the resulting fee breakdown."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="cnvr-soft-panel space-y-4">
          <Input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount"
            className="bg-white dark:bg-slate-950"
          />
          <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
            <SelectTrigger className="h-11 w-full bg-white dark:bg-slate-950">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-orange-500/20 dark:bg-slate-950 dark:text-slate-300">
            Standard fee used: {percentage}% + {symbol}
            {formatNumber(fixed)}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Fee</p>
            <p className="mt-3 text-4xl font-semibold text-orange-700">
              {symbol}
              {formatNumber(fee)}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Net</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {symbol}
              {formatNumber(net)}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Required gross</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {symbol}
              {formatNumber(requiredToReceive)}
            </p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
