import { ArrowRight } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"

import {
  getToolsByCategory,
  toolCategories,
  toolItems,
} from "@/content/tool-catalog"
import { CategoryCard } from "@/components/catalog/category-card"
import { ToolCard } from "@/components/catalog/tool-card"
import { getCategoryPath } from "@/lib/routing"

type HomePageProps = {
  onNavigate: (href: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredTools = toolItems.filter((tool) => tool.status === "ready").slice(0, 6)

  return (
    <div className="space-y-10">
      <section className="rounded-[2.5rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,245,238,0.98))] px-6 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.95))] md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-500/15 dark:text-orange-300">
              Modern SaaS-style tool platform
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-6xl">
                Build CNVR Tool as a structured multi-route product.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
                Separate category pages, separate tool routes, better readability, stronger spacing,
                and reusable components that scale cleanly as more tools are added.
              </p>
            </div>
            <Button
              className="h-11 rounded-xl px-5"
              onClick={() => onNavigate(getCategoryPath("calculator-tools"))}
            >
              Browse categories
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="cnvr-soft-panel">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">Categories</p>
              <p className="mt-3 text-4xl font-semibold text-slate-950 dark:text-slate-50">{toolCategories.length}</p>
            </div>
            <div className="cnvr-panel">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Total tools</p>
              <p className="mt-3 text-4xl font-semibold text-slate-950 dark:text-slate-50">{toolItems.length}</p>
            </div>
            <div className="cnvr-panel sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Ready now</p>
              <p className="mt-3 text-4xl font-semibold text-slate-950 dark:text-slate-50">
                {toolItems.filter((tool) => tool.status === "ready").length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">
            Tool categories
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            Explore each tool group
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {toolCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={getToolsByCategory(category.slug).length}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">
            Featured tools
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            Working utilities with dedicated routes
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  )
}
