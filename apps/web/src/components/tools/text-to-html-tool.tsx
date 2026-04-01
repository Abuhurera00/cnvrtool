import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { textToHtml } from "@/lib/tool-utils"

export function TextToHtmlTool() {
  const [text, setText] = useState(
    "CNVR Tool helps teams publish faster.\n\nUse this generator to turn text into basic HTML paragraphs."
  )
  const output = textToHtml(text)

  return (
    <ToolPageShell
      badge="Website Tool"
      title="Text to HTML Generator"
      description="Convert plain text into HTML paragraphs while keeping line breaks readable."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="cnvr-soft-panel">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-72 bg-white dark:bg-slate-950"
            placeholder="Enter your text"
          />
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">HTML output</p>
            <Button
              variant="secondary"
              className="bg-white text-slate-950 hover:bg-white/90"
              onClick={() => void navigator.clipboard.writeText(output)}
            >
              Copy
            </Button>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-[1.5rem] bg-slate-900 p-4 text-xs leading-6 text-slate-200">
            {output}
          </pre>
        </div>
      </div>
    </ToolPageShell>
  )
}
