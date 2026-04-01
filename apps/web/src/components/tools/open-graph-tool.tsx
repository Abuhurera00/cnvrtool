import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { generateOpenGraphTags } from "@/lib/tool-utils"

export function OpenGraphTool() {
  const [form, setForm] = useState({
    title: "CNVR Tool | Smart Utility Suite",
    description: "Modern utility platform for SEO, image, schema, and text tools.",
    url: "https://www.cnvrtool.com/",
    image: "https://www.cnvrtool.com/og-image.png",
    siteName: "CNVR Tool",
  })

  const output = generateOpenGraphTags(form)

  return (
    <ToolPageShell
      badge="Website Tool"
      title="Open Graph Generator"
      description="Create OG meta tags for landing pages and social sharing previews."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="cnvr-soft-panel grid gap-3">
          <Input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Title"
            className="bg-white dark:bg-slate-950"
          />
          <Textarea
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
            placeholder="Description"
            className="min-h-28 bg-white dark:bg-slate-950"
          />
          <Input
            value={form.url}
            onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))}
            placeholder="URL"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            value={form.image}
            onChange={(event) =>
              setForm((current) => ({ ...current, image: event.target.value }))
            }
            placeholder="Image URL"
            className="bg-white dark:bg-slate-950"
          />
          <Input
            value={form.siteName}
            onChange={(event) =>
              setForm((current) => ({ ...current, siteName: event.target.value }))
            }
            placeholder="Site name"
            className="bg-white dark:bg-slate-950"
          />
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Meta tags</p>
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
