import { useState } from "react"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { CodeOutput } from "@/components/tools/code-output"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { stringifyJson } from "@/lib/tool-utils"

export function MovieSchemaTool() {
  const [form, setForm] = useState({
    name: "CNVR: The Launch Story",
    description: "A fictional behind-the-scenes product story.",
    dateCreated: "2026-03-30",
    image: "https://www.cnvrtool.com/movie-cover.png",
    director: "CNVR Studio",
  })

  const output = stringifyJson({
    "@context": "https://schema.org",
    "@type": "Movie",
    name: form.name,
    description: form.description,
    dateCreated: form.dateCreated,
    image: form.image,
    director: {
      "@type": "Person",
      name: form.director,
    },
  })

  return (
    <ToolPageShell badge="Schema Tool" title="Movie Schema Generator" description="Generate structured data for movie and entertainment pages.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-3 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="bg-white" placeholder="Movie title" />
          <Textarea value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} className="min-h-24 bg-white" placeholder="Description" />
          <Input type="date" value={form.dateCreated} onChange={(e) => setForm((c) => ({ ...c, dateCreated: e.target.value }))} className="bg-white" />
          <Input value={form.image} onChange={(e) => setForm((c) => ({ ...c, image: e.target.value }))} className="bg-white" placeholder="Image URL" />
          <Input value={form.director} onChange={(e) => setForm((c) => ({ ...c, director: e.target.value }))} className="bg-white" placeholder="Director" />
        </div>
        <CodeOutput title="Movie schema JSON-LD" value={output} />
      </div>
    </ToolPageShell>
  )
}
