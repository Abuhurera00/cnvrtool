import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { API_BASE_URL } from "@/lib/api"

type SpellingResult = {
  word: string
  suggestion: string | null
}

export function SpellingCheckerTool() {
  const [text, setText] = useState(
    "cnvr toool helps markting teams work faster with seo and image utilties."
  )
  const [issues, setIssues] = useState<SpellingResult[]>([])
  const [status, setStatus] = useState("Check spelling using the Express API.")

  async function checkSpelling() {
    setStatus("Checking spelling...")

    try {
      const response = await fetch(`${API_BASE_URL}/api/tools/spellcheck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const payload = (await response.json()) as { issues: SpellingResult[] }
      setIssues(payload.issues)
      setStatus(payload.issues.length ? "Possible spelling issues found." : "No issues detected.")
    } catch {
      setStatus("Spell check failed. Start the server and try again.")
    }
  }

  return (
    <ToolPageShell
      badge="Text Tool"
      title="Text Spelling Checker"
      description="Run text through the Express spell-check endpoint and review suggested corrections."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-72 bg-white"
            placeholder="Paste text to check"
          />
          <Button onClick={() => void checkSpelling()}>Check spelling</Button>
          <p className="text-sm leading-7 text-slate-600">{status}</p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-900">Suggestions</p>
          <div className="mt-5 space-y-3">
            {issues.length ? (
              issues.map((issue) => (
                <div
                  key={`${issue.word}-${issue.suggestion ?? "none"}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-950">{issue.word}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Suggested correction: {issue.suggestion ?? "No close match"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Spelling suggestions will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}
