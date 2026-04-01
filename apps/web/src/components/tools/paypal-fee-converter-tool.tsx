import { useState } from "react"

import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { formatNumber } from "@/lib/tool-utils"

export function PaypalFeeConverterTool() {
  const [amount, setAmount] = useState("100")
  const [percentageFee, setPercentageFee] = useState("3.49")
  const [fixedFee, setFixedFee] = useState("0.49")

  const gross = Number(amount) || 0
  const percentage = Number(percentageFee) || 0
  const fixed = Number(fixedFee) || 0
  const fee = gross * (percentage / 100) + fixed
  const net = gross - fee
  const requiredToReceive = (gross + fixed) / (1 - percentage / 100 || 1)

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="PayPal Fee Converter"
      description="Estimate PayPal fees, your net amount, and the gross amount needed to receive a target value."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Gross amount"
            className="bg-white"
          />
          <Input
            type="number"
            value={percentageFee}
            onChange={(event) => setPercentageFee(event.target.value)}
            placeholder="Percentage fee"
            className="bg-white"
          />
          <Input
            type="number"
            value={fixedFee}
            onChange={(event) => setFixedFee(event.target.value)}
            placeholder="Fixed fee"
            className="bg-white"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Fee</p>
            <p className="mt-3 text-4xl font-semibold text-orange-700">${formatNumber(fee)}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Net</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">${formatNumber(net)}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Required gross</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              ${formatNumber(requiredToReceive)}
            </p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
