import { useState } from "react"

import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { countWords } from "@/lib/tool-utils"

export function WordCounterTool() {
  const [text, setText] = useState(
    "CNVR Tool gives teams a faster way to access SEO, schema, image, and content utilities."
  )

  const words = countWords(text)
  const characters = text.length
  const readingTime = Math.max(1, Math.ceil(words / 200))

  return (
    <ToolPageShell
      badge="Text Tool"
      title="Word Counter Tool"
      description="Count words, characters, and reading time on a dedicated route."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="cnvr-soft-panel">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-72 bg-white dark:bg-slate-950"
            placeholder="Enter text"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Words</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">{words}</p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Characters</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">{characters}</p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Read time</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">{readingTime} min</p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
