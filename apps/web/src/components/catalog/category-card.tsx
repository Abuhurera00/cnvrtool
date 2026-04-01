import { ArrowRight } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import type { ToolCategory } from "@/content/tool-catalog"
import { CategoryIcon } from "@/components/catalog/category-icon"
import { getCategoryTheme } from "@/components/catalog/category-theme"
import { AppLink } from "@/components/navigation/app-link"
import { getCategoryPath } from "@/lib/routing"

type CategoryCardProps = {
  category: ToolCategory
  count: number
  onNavigate: (href: string) => void
}

export function CategoryCard({
  category,
  count,
  onNavigate,
}: CategoryCardProps) {
  const theme = getCategoryTheme(category.slug)

  return (
    <Card
      className={`h-full rounded-[2rem] border-white/80 bg-white/95 py-0 shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/95 ${theme.glow}`}
    >
      <CardHeader className="gap-4 px-6 pt-6">
        <div
          className={`flex size-14 items-center justify-center rounded-2xl border ${theme.icon}`}
        >
          <CategoryIcon icon={category.icon} className="size-7" />
        </div>
        <div className="space-y-2">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-500/15 dark:text-orange-300">
            {count} tools
          </Badge>
          <CardTitle className="text-2xl text-slate-950 dark:text-slate-50">{category.title}</CardTitle>
          <CardDescription className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            {category.summary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-6">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{category.description}</p>
        <AppLink
          href={getCategoryPath(category.slug)}
          onNavigate={onNavigate}
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200"
        >
          View category
          <ArrowRight className="size-4" />
        </AppLink>
      </CardContent>
    </Card>
  )
}
