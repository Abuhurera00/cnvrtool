import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"

const keys = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "(", "+"],
  ["√", "^", "sin", "cos"],
  ["tan", "log", ")", "%"],
]

function transformExpression(expression: string) {
  return expression
    .replace(/\s+/g, "")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/\^/g, "**")
}

export function ScientificCalculatorTool() {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("0")

  function appendToken(token: string) {
    const mapped =
      token === "√"
        ? "sqrt("
        : token === "sin" || token === "cos" || token === "tan" || token === "log"
          ? `${token}(`
          : token

    setExpression((current) => `${current}${mapped}`)
  }

  function evaluate() {
    try {
      const output = Function(
        `"use strict"; return (${transformExpression(expression)})`
      )() as number

      setResult(Number.isFinite(output) ? String(output) : "Math error")
    } catch {
      setResult("Invalid expression")
    }
  }

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="Scientific Calculator"
      description="A more familiar keypad-style scientific calculator with a cleaner result area and compact controls."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-orange-100 bg-white p-5 shadow-[0_18px_60px_rgba(249,115,22,0.12)] dark:border-orange-500/20 dark:bg-slate-900">
          <p className="mb-4 text-center text-base font-semibold text-slate-950 dark:text-slate-50">
            Hi, you can use our scientific calculator tool for free.
          </p>
          <div className="rounded-[1.25rem] border border-slate-300 bg-slate-50 p-3 shadow-inner dark:border-white/10 dark:bg-slate-950">
            <Input
              value={expression}
              onChange={(event) => setExpression(event.target.value)}
              className="h-12 border-0 bg-transparent px-1 text-xl font-semibold shadow-none focus-visible:ring-0 dark:bg-transparent"
              placeholder="0"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {keys.flat().map((value) => (
              <Button
                key={value}
                className="h-11 rounded-xl bg-amber-500 text-base font-semibold text-white hover:bg-amber-500/90"
                onClick={() => appendToken(value)}
              >
                {value}
              </Button>
            ))}
            <Button
              className="h-11 rounded-xl bg-orange-600 text-base font-semibold text-white hover:bg-orange-600/90"
              onClick={() => {
                setExpression("")
                setResult("0")
              }}
            >
              C
            </Button>
            <Button
              className="col-span-3 h-11 rounded-xl bg-slate-950 text-base font-semibold text-white hover:bg-slate-900 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              onClick={evaluate}
            >
              =
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="cnvr-output-panel p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Current output
            </p>
            <p className="mt-4 break-all text-5xl font-semibold">{result}</p>
          </div>
          <div className="cnvr-panel p-6">
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Supported actions
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Basic arithmetic operators",
                "Power calculations with ^",
                "Square root with √",
                "Trig functions: sin cos tan",
                "Base-10 logarithm with log",
                "Parentheses and percentage input",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
