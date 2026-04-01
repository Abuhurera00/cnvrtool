import { Sparkles } from "lucide-react"

import { AppLink } from "@/components/navigation/app-link"
import { toolCategories } from "@/content/tool-catalog"
import { getCategoryPath } from "@/lib/routing"

type SiteFooterProps = {
  onNavigate: (href: string) => void
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="mt-12 rounded-[2rem] border border-white/80 bg-white/95 px-6 py-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6b1a,#ff9352)] text-white">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-slate-50">CNVR Tool</p>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Modern utility platform for SEO, schema, image, website, and text workflows.
              </p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Built as a scalable multi-route product with dedicated tool pages, cleaner hierarchy,
            and a foundation that can grow into a full SaaS-style utility suite.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
              Product
            </p>
            <div className="flex flex-col gap-2">
              <AppLink href="/" onNavigate={onNavigate} className="text-sm text-slate-700 hover:text-orange-700 dark:text-slate-300 dark:hover:text-orange-300">
                Home
              </AppLink>
              <AppLink href="/about" onNavigate={onNavigate} className="text-sm text-slate-700 hover:text-orange-700 dark:text-slate-300 dark:hover:text-orange-300">
                About Us
              </AppLink>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
              Tool Categories
            </p>
            <div className="grid gap-2">
              {toolCategories.map((category) => (
                <AppLink
                  key={category.slug}
                  href={getCategoryPath(category.slug)}
                  onNavigate={onNavigate}
                  className="text-sm text-slate-700 hover:text-orange-700 dark:text-slate-300 dark:hover:text-orange-300"
                >
                  {category.title}
                </AppLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
