import { Badge } from "@workspace/ui/components/badge"

import { ToolCard } from "@/components/catalog/tool-card"
import type { ToolCategory, ToolItem } from "@/content/tool-catalog"

type CategoryPageProps = {
  category: ToolCategory
  tools: ToolItem[]
  onNavigate: (href: string) => void
}

export function CategoryPage({
  category,
  tools,
  onNavigate,
}: CategoryPageProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-white/80 bg-white/95 px-6 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:px-10 md:py-10">
        <div className="space-y-4">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-500/15 dark:text-orange-300">
            {tools.length} tools in this category
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            {category.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            {category.description}
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} onNavigate={onNavigate} />
        ))}
      </section>
    </div>
  )
}
