import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { sentenceCase, titleCase } from "@/lib/tool-utils"

export function LetterCapitalizeTool() {
  const [text, setText] = useState(
    "cnvr tool helps users format content for landing pages, seo work, and content publishing."
  )

  return (
    <ToolPageShell
      badge="Text Tool"
      title="Online Letter Capitalize Tool"
      description="Transform text into uppercase, lowercase, title case, or sentence case."
    >
      <div className="space-y-5">
        <div className="cnvr-soft-panel">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-72 bg-white dark:bg-slate-950"
            placeholder="Enter text"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setText(text.toUpperCase())}>Uppercase</Button>
          <Button variant="outline" onClick={() => setText(text.toLowerCase())}>
            Lowercase
          </Button>
          <Button variant="outline" onClick={() => setText(titleCase(text))}>
            Title case
          </Button>
          <Button variant="outline" onClick={() => setText(sentenceCase(text))}>
            Sentence case
          </Button>
        </div>
      </div>
    </ToolPageShell>
  )
}
