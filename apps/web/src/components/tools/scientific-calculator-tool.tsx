import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"

const allowedExpression = /^[0-9+\-*/().%\s]+$/

export function ScientificCalculatorTool() {
  const [expression, setExpression] = useState("(24 / 3) + 7 * 2")
  const [result, setResult] = useState("22")

  function evaluate() {
    if (!allowedExpression.test(expression)) {
      setResult("Invalid expression")
      return
    }

    try {
      const output = Function(`"use strict"; return (${expression})`)()
      setResult(String(output))
    } catch {
      setResult("Calculation error")
    }
  }

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="Scientific Calculator"
      description="A lightweight expression-based calculator for quick multi-step calculations."
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input
            value={expression}
            onChange={(event) => setExpression(event.target.value)}
            className="bg-white"
            placeholder="(24 / 3) + 7 * 2"
          />
          <div className="flex flex-wrap gap-2">
            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "(", ")", "+", "%"].map(
              (value) => (
                <Button
                  key={value}
                  variant="outline"
                  onClick={() => setExpression((current) => `${current}${value}`)}
                >
                  {value}
                </Button>
              )
            )}
          </div>
          <div className="flex gap-3">
            <Button onClick={evaluate}>Calculate</Button>
            <Button variant="outline" onClick={() => setExpression("")}>
              Clear
            </Button>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Result</p>
          <p className="mt-4 text-5xl font-semibold text-slate-950">{result}</p>
        </div>
      </div>
    </ToolPageShell>
  )
}
