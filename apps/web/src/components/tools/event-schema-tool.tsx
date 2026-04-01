import { useState } from "react"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { CodeOutput } from "@/components/tools/code-output"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { stringifyJson } from "@/lib/tool-utils"

export function EventSchemaTool() {
  const [form, setForm] = useState({
    name: "CNVR Tool Launch Webinar",
    description: "A walkthrough of the CNVR Tool product and roadmap.",
    startDate: "2026-05-10T18:00",
    endDate: "2026-05-10T19:00",
    location: "Online",
    url: "https://www.cnvrtool.com/",
  })

  const output = stringifyJson({
    "@context": "https://schema.org",
    "@type": "Event",
    name: form.name,
    description: form.description,
    startDate: form.startDate,
    endDate: form.endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: form.location,
    },
    url: form.url,
  })

  return (
    <ToolPageShell badge="Schema Tool" title="Event Schema Generator" description="Generate event JSON-LD for launches, webinars, and online sessions.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-3 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="bg-white" placeholder="Event name" />
          <Textarea value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} className="min-h-24 bg-white" placeholder="Description" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input type="datetime-local" value={form.startDate} onChange={(e) => setForm((c) => ({ ...c, startDate: e.target.value }))} className="bg-white" />
            <Input type="datetime-local" value={form.endDate} onChange={(e) => setForm((c) => ({ ...c, endDate: e.target.value }))} className="bg-white" />
          </div>
          <Input value={form.location} onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))} className="bg-white" placeholder="Location" />
          <Input value={form.url} onChange={(e) => setForm((c) => ({ ...c, url: e.target.value }))} className="bg-white" placeholder="Event URL" />
        </div>
        <CodeOutput title="Event schema JSON-LD" value={output} />
      </div>
    </ToolPageShell>
  )
}
