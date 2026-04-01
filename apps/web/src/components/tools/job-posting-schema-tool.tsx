import { useState } from "react"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { CodeOutput } from "@/components/tools/code-output"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { stringifyJson } from "@/lib/tool-utils"

export function JobPostingSchemaTool() {
  const [form, setForm] = useState({
    title: "Frontend Engineer",
    description: "Build polished SEO and utility workflows for CNVR Tool.",
    datePosted: "2026-03-30",
    employmentType: "FULL_TIME",
    organization: "CNVR Tool",
    location: "Remote",
  })

  const output = stringifyJson({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: form.title,
    description: form.description,
    datePosted: form.datePosted,
    employmentType: form.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: form.organization,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: form.location,
      },
    },
  })

  return (
    <ToolPageShell badge="Schema Tool" title="Job Posting Schema Generator" description="Generate structured data for job and hiring pages.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-3 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} className="bg-white" placeholder="Job title" />
          <Textarea value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} className="min-h-24 bg-white" placeholder="Job description" />
          <Input type="date" value={form.datePosted} onChange={(e) => setForm((c) => ({ ...c, datePosted: e.target.value }))} className="bg-white" />
          <Input value={form.employmentType} onChange={(e) => setForm((c) => ({ ...c, employmentType: e.target.value }))} className="bg-white" placeholder="Employment type" />
          <Input value={form.organization} onChange={(e) => setForm((c) => ({ ...c, organization: e.target.value }))} className="bg-white" placeholder="Organization" />
          <Input value={form.location} onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))} className="bg-white" placeholder="Location" />
        </div>
        <CodeOutput title="Job posting schema JSON-LD" value={output} />
      </div>
    </ToolPageShell>
  )
}
