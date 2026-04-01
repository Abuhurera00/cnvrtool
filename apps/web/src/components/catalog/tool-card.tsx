import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import type { ToolItem } from "@/content/tool-catalog"
import { AppLink } from "@/components/navigation/app-link"
import { getToolPath } from "@/lib/routing"

type ToolCardProps = {
  tool: ToolItem
  onNavigate: (href: string) => void
}

export function ToolCard({ tool, onNavigate }: ToolCardProps) {
  const isReady = tool.status === "ready"

  return (
    <Card className="h-full rounded-[1.75rem] border-white/80 bg-white/95 py-0 shadow-[0_16px_56px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-slate-900/95">
      <CardHeader className="space-y-3 px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <Badge
            className={
              isReady
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                : "bg-amber-100 text-amber-900 hover:bg-amber-100"
            }
          >
            {isReady ? (
              <>
                <CheckCircle2 className="size-3.5" />
                Ready
              </>
            ) : (
              <>
                <Clock3 className="size-3.5" />
                Planned
              </>
            )}
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl text-slate-950 dark:text-slate-50">{tool.title}</CardTitle>
          <CardDescription className="leading-7 text-slate-600 dark:text-slate-300">
            {tool.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <AppLink
          href={getToolPath(tool.slug)}
          onNavigate={onNavigate}
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200"
        >
          Open tool
          <ArrowRight className="size-4" />
        </AppLink>
      </CardContent>
    </Card>
  )
}
