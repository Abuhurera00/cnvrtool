import { useState } from "react"
import { format } from "date-fns"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { DatePickerField } from "@/components/tools/date-picker-field"
import { CodeOutput } from "@/components/tools/code-output"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { stringifyJson } from "@/lib/tool-utils"

function toIsoDate(date?: Date, time?: string) {
  if (!date) {
    return ""
  }

  return `${format(date, "yyyy-MM-dd")}T${time || "00:00"}`
}

export function EventSchemaTool() {
  const [form, setForm] = useState({
    name: "CNVR Tool Launch Webinar",
    description: "A walkthrough of the CNVR Tool product and roadmap.",
    startDate: new Date("2026-05-10"),
    endDate: new Date("2026-05-10"),
    startTime: "18:00",
    endTime: "19:00",
    location: "Online",
    url: "https://www.cnvrtool.com/",
  })

  const output = stringifyJson({
    "@context": "https://schema.org",
    "@type": "Event",
    name: form.name,
    description: form.description,
    startDate: toIsoDate(form.startDate, form.startTime),
    endDate: toIsoDate(form.endDate, form.endTime),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: form.location,
    },
    url: form.url,
  })

  return (
    <ToolPageShell
      badge="Schema Tool"
      title="Event Schema Generator"
      description="Generate event JSON-LD for launches, webinars, and online sessions."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="cnvr-soft-panel grid gap-3">
          <Input
            value={form.name}
            onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
            className="bg-white dark:bg-slate-950"
            placeholder="Event name"
          />
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm((c) => ({ ...c, description: e.target.value }))
            }
            className="min-h-24 bg-white dark:bg-slate-950"
            placeholder="Description"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <DatePickerField
              placeholder="Start date"
              value={form.startDate}
              onChange={(value) => setForm((c) => ({ ...c, startDate: value ?? c.startDate }))}
            />
            <DatePickerField
              placeholder="End date"
              value={form.endDate}
              onChange={(value) => setForm((c) => ({ ...c, endDate: value ?? c.endDate }))}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm((c) => ({ ...c, startTime: e.target.value }))}
              className="bg-white dark:bg-slate-950"
            />
            <Input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm((c) => ({ ...c, endTime: e.target.value }))}
              className="bg-white dark:bg-slate-950"
            />
          </div>
          <Input
            value={form.location}
            onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))}
            className="bg-white dark:bg-slate-950"
            placeholder="Location"
          />
          <Input
            value={form.url}
            onChange={(e) => setForm((c) => ({ ...c, url: e.target.value }))}
            className="bg-white dark:bg-slate-950"
            placeholder="Event URL"
          />
        </div>
        <CodeOutput title="Event schema JSON-LD" value={output} />
      </div>
    </ToolPageShell>
  )
}
