import type { PropsWithChildren } from "react"

import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { getToolPageCopy } from "@/content/tool-page-copy"

type ToolPageShellProps = PropsWithChildren<{
  badge: string
  title: string
  description: string
}>

export function ToolPageShell({
  badge,
  title,
  description,
  children,
}: ToolPageShellProps) {
  const copy = getToolPageCopy(title)

  return (
    <div className="space-y-8">
      <Card className="rounded-[2rem] border-white/80 bg-white/95 py-0 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <CardHeader className="space-y-4 px-6 pt-6 md:px-8 md:pt-8">
          <Badge className="w-fit bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-500/15 dark:text-orange-300">
            {badge}
          </Badge>
          <div className="space-y-2">
            <CardTitle className="text-3xl text-slate-950 dark:text-slate-50">{title}</CardTitle>
            <CardDescription className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6 md:px-8 md:pb-8">
          {children}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
            Features
          </p>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
            What makes this tool useful
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.features.map((item) => (
            <Card
              key={item.title}
              className="rounded-[1.75rem] border-white/80 bg-white/95 py-0 shadow-[0_16px_56px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-slate-900/95"
            >
              <CardHeader className="px-5 pt-5">
                <CardTitle className="text-lg text-slate-950 dark:text-slate-50">
                  {item.title}
                </CardTitle>
                <CardDescription className="leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
            Use Cases
          </p>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
            Where teams can use it
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.useCases.map((item) => (
            <Card
              key={item.title}
              className="rounded-[1.75rem] border-white/80 bg-white/95 py-0 shadow-[0_16px_56px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-slate-900/95"
            >
              <CardHeader className="px-5 pt-5">
                <CardTitle className="text-lg text-slate-950 dark:text-slate-50">
                  {item.title}
                </CardTitle>
                <CardDescription className="leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
