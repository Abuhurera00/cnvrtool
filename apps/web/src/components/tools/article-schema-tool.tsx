import { useState } from "react"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { CodeOutput } from "@/components/tools/code-output"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { stringifyJson } from "@/lib/tool-utils"

export function ArticleSchemaTool() {
  const [form, setForm] = useState({
    headline: "How CNVR Tool Simplifies Utility Workflows",
    description: "A guide to structuring a better multi-tool platform.",
    author: "CNVR Team",
    datePublished: "2026-03-30",
    image: "https://www.cnvrtool.com/article-cover.png",
  })

  const output = stringifyJson({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: form.headline,
    description: form.description,
    author: {
      "@type": "Person",
      name: form.author,
    },
    datePublished: form.datePublished,
    image: form.image,
  })

  return (
    <ToolPageShell badge="Schema Tool" title="Article Schema Generator" description="Generate article JSON-LD for blog posts, guides, and editorial pages.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-3 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input value={form.headline} onChange={(e) => setForm((c) => ({ ...c, headline: e.target.value }))} className="bg-white" placeholder="Headline" />
          <Textarea value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} className="min-h-24 bg-white" placeholder="Description" />
          <Input value={form.author} onChange={(e) => setForm((c) => ({ ...c, author: e.target.value }))} className="bg-white" placeholder="Author" />
          <Input type="date" value={form.datePublished} onChange={(e) => setForm((c) => ({ ...c, datePublished: e.target.value }))} className="bg-white" />
          <Input value={form.image} onChange={(e) => setForm((c) => ({ ...c, image: e.target.value }))} className="bg-white" placeholder="Image URL" />
        </div>
        <CodeOutput title="Article schema JSON-LD" value={output} />
      </div>
    </ToolPageShell>
  )
}
