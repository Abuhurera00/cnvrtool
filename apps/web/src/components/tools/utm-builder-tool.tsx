import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { buildUtmUrl } from "@/lib/tool-utils"

export function UtmBuilderTool() {
  const [form, setForm] = useState({
    url: "https://www.cnvrtool.com/",
    source: "newsletter",
    medium: "email",
    campaign: "launch",
    term: "",
    content: "hero-button",
  })

  const output = buildUtmUrl(form)

  return (
    <ToolPageShell
      badge="SEO Tool"
      title="UTM Builder"
      description="Build campaign URLs with dedicated fields for attribution parameters."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="cnvr-soft-panel grid gap-3">
          <Input
            value={form.url}
            onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))}
            placeholder="Landing page URL"
            className="bg-white dark:bg-slate-950"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              value={form.source}
              onChange={(event) =>
                setForm((current) => ({ ...current, source: event.target.value }))
              }
              placeholder="utm_source"
              className="bg-white dark:bg-slate-950"
            />
            <Input
              value={form.medium}
              onChange={(event) =>
                setForm((current) => ({ ...current, medium: event.target.value }))
              }
              placeholder="utm_medium"
              className="bg-white dark:bg-slate-950"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              value={form.campaign}
              onChange={(event) =>
                setForm((current) => ({ ...current, campaign: event.target.value }))
              }
              placeholder="utm_campaign"
              className="bg-white dark:bg-slate-950"
            />
            <Input
              value={form.content}
              onChange={(event) =>
                setForm((current) => ({ ...current, content: event.target.value }))
              }
              placeholder="utm_content"
              className="bg-white dark:bg-slate-950"
            />
          </div>
          <Input
            value={form.term}
            onChange={(event) => setForm((current) => ({ ...current, term: event.target.value }))}
            placeholder="utm_term"
            className="bg-white"
          />
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Generated URL</p>
            <Button
              variant="secondary"
              className="bg-white text-slate-950 hover:bg-white/90"
              onClick={() => void navigator.clipboard.writeText(output)}
            >
              Copy
            </Button>
          </div>
          <p className="mt-4 break-all text-sm leading-7 text-slate-300">
            {output || "Enter a valid base URL and UTM values."}
          </p>
        </div>
      </div>
    </ToolPageShell>
  )
}
