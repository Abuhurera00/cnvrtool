import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

const values = [
  {
    title: "Useful first",
    description: "Every tool should solve a real everyday workflow, not just exist to fill a category.",
  },
  {
    title: "Fast to use",
    description: "We focus on short paths from input to output so the platform feels efficient for repeat users.",
  },
  {
    title: "Cleanly structured",
    description: "Categories, tool pages, and APIs are organized so the product can scale without becoming messy.",
  },
  {
    title: "Modern product feel",
    description: "The interface aims to feel more like a polished SaaS app than a list of disconnected utilities.",
  },
]

export function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-white/80 bg-white/95 px-6 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/95 md:px-10 md:py-10">
        <div className="space-y-4">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-500/15 dark:text-orange-300">
            About CNVR Tool
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            A cleaner way to deliver web utility tools
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            CNVR Tool brings together calculators, schema generators, image helpers, SEO workflows,
            website utilities, and text tools under one consistent product experience. The goal is
            simple: make useful tools feel structured, reliable, and pleasant to use.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {values.map((item) => (
          <Card
            key={item.title}
            className="rounded-[1.75rem] border-white/80 bg-white/95 py-0 shadow-[0_16px_56px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-slate-900/95"
          >
            <CardHeader className="px-5 pt-5">
              <CardTitle className="text-xl text-slate-950 dark:text-slate-50">
                {item.title}
              </CardTitle>
              <CardDescription className="leading-7 text-slate-600 dark:text-slate-300">
                {item.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  )
}
