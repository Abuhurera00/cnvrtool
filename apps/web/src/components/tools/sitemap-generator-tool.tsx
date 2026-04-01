import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { generateSitemapXml } from "@/lib/tool-utils"

export function SitemapGeneratorTool() {
  const [urls, setUrls] = useState(
    ["https://www.cnvrtool.com/", "https://www.cnvrtool.com/category/seo-tools"].join("\n")
  )

  const output = generateSitemapXml(urls.split("\n"))

  return (
    <ToolPageShell
      badge="SEO Tool"
      title="Sitemap Generator"
      description="Paste URLs line by line and generate sitemap XML output."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="cnvr-soft-panel">
          <Textarea
            value={urls}
            onChange={(event) => setUrls(event.target.value)}
            className="min-h-72 bg-white dark:bg-slate-950"
            placeholder="One URL per line"
          />
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Sitemap XML</p>
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
