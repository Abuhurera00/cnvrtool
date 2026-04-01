import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { generateSeoTags } from "@/lib/tool-utils"

export function SeoTagGeneratorTool() {
  const [form, setForm] = useState({
    title: "CNVR Tool | Modern Utility Platform",
    description: "All-in-one tool suite for SEO, schema, image, text, and website workflows.",
    canonicalUrl: "https://www.cnvrtool.com/",
    robots: "index,follow",
  })

  const output = generateSeoTags(form)

  return (
    <ToolPageShell
      badge="SEO Tool"
      title="SEO Tag Generator"
      description="Generate page title, description, robots, and canonical starter tags."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="cnvr-soft-panel grid gap-3">
          <Input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Page title"
            className="bg-white dark:bg-slate-950"
          />
          <Textarea
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
            placeholder="Meta description"
            className="min-h-28 bg-white dark:bg-slate-950"
          />
          <Input
            value={form.canonicalUrl}
            onChange={(event) =>
              setForm((current) => ({ ...current, canonicalUrl: event.target.value }))
            }
            placeholder="Canonical URL"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            value={form.robots}
            onChange={(event) => setForm((current) => ({ ...current, robots: event.target.value }))}
            placeholder="Robots"
            className="bg-white dark:bg-slate-950"
          />
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">SEO tag output</p>
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
