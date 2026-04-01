import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { generateFaqSchema } from "@/lib/tool-utils"

type FaqItem = {
  id: number
  question: string
  answer: string
}

export function FaqSchemaTool() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      id: 1,
      question: "What is CNVR Tool?",
      answer: "CNVR Tool is a multi-tool utility platform for web, SEO, image, and text workflows.",
    },
    {
      id: 2,
      question: "Can I generate FAQ schema quickly?",
      answer: "Yes, add your questions and answers and copy the generated JSON-LD output.",
    },
  ])

  const schema = generateFaqSchema(faqItems)

  function updateItem(id: number, field: "question" | "answer", value: string) {
    setFaqItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  return (
    <ToolPageShell
      badge="Schema Tool"
      title="FAQ Schema Generator"
      description="Create FAQPage JSON-LD with dedicated inputs for each question and answer."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
                    <div key={item.id} className="cnvr-soft-panel space-y-3">
              <p className="text-sm font-semibold text-slate-900">FAQ {index + 1}</p>
              <Input
                value={item.question}
                onChange={(event) => updateItem(item.id, "question", event.target.value)}
                placeholder="Question"
                        className="bg-white dark:bg-slate-950"
              />
              <Textarea
                value={item.answer}
                onChange={(event) => updateItem(item.id, "answer", event.target.value)}
                placeholder="Answer"
                        className="min-h-28 bg-white dark:bg-slate-950"
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setFaqItems((current) => [
                ...current,
                { id: Date.now(), question: "", answer: "" },
              ])
            }
          >
            Add FAQ item
          </Button>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">JSON-LD output</p>
            <Button
              variant="secondary"
              className="bg-white text-slate-950 hover:bg-white/90"
              onClick={() => void navigator.clipboard.writeText(schema)}
            >
              Copy
            </Button>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-[1.5rem] bg-slate-900 p-4 text-xs leading-6 text-slate-200">
            {schema}
          </pre>
        </div>
      </div>
    </ToolPageShell>
  )
}
