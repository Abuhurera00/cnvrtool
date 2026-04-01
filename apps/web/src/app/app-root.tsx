import { useEffect, useState } from "react"
import { Menu, Sparkles } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

import { SiteFooter } from "@/components/layout/site-footer"
import { AppLink } from "@/components/navigation/app-link"
import { ThemeToggle } from "@/components/navigation/theme-toggle"
import {
  getCategoryBySlug,
  getToolBySlug,
  getToolsByCategory,
  toolCategories,
} from "@/content/tool-catalog"
import {
  getCategoryPath,
  parseRoute,
  type AppRoute,
} from "@/lib/routing"
import { AboutPage } from "@/pages/about-page"
import { CategoryPage } from "@/pages/category-page"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { ToolPage } from "@/pages/tool-page"

export function AppRoot() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.pathname))

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute(window.location.pathname))
    }

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  function navigate(path: string) {
    if (path === window.location.pathname) return
    window.history.pushState({}, "", path)
    setRoute(parseRoute(path))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const category = route.type === "category" ? getCategoryBySlug(route.categorySlug) : null
  const tool = route.type === "tool" ? getToolBySlug(route.toolSlug) : null

  const toolsDropdownWidth = "w-[320px]"

  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_left,_rgba(255,120,40,0.12),_transparent_30%),linear-gradient(180deg,_#fffaf6_0%,_#ffffff_44%,_#fff7f0_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,120,40,0.10),_transparent_22%),linear-gradient(180deg,_#050505_0%,_#090909_48%,_#0d0d0d_100%)] dark:text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-white/80 bg-white/95 px-5 py-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:px-8">
          <div className="flex gap-5 sm:flex-row lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6b1a,#ff9352)] text-white shadow-lg shadow-orange-200">
                <Sparkles className="size-5" />
              </div>
              <div>
                <AppLink
                  href="/"
                  onNavigate={navigate}
                  className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50"
                >
                  CNVR Tool
                </AppLink>
                {/* <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Multi-tool platform with separate category pages and dedicated tool routes.
                </p> */}
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <NavigationMenu viewport={false} className="max-w-none">
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="rounded-xl bg-transparent px-4 text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800">
                      Tools
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={`${toolsDropdownWidth} p-2`}>
                      <div className="grid gap-1.5">
                        {toolCategories.map((item) => (
                          <NavigationMenuLink
                            key={item.slug}
                            asChild
                            className="rounded-xl border border-transparent px-3 py-2.5 hover:border-orange-100 hover:bg-orange-50 dark:hover:border-white/10 dark:hover:bg-slate-800"
                          >
                            <AppLink href={getCategoryPath(item.slug)} onNavigate={navigate}>
                              <span className="text-sm font-semibold whitespace-nowrap text-slate-900 dark:text-slate-100">
                                {item.title}
                              </span>
                            </AppLink>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <AppLink href="/about" onNavigate={navigate}>
                        About Us
                      </AppLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-orange-100 bg-white/90 text-slate-700 hover:bg-orange-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    aria-label="Open menu"
                  >
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[88vw] border-white/10 bg-slate-950 text-slate-50 sm:max-w-sm"
                >
                  <SheetHeader className="px-6 pt-6">
                    <SheetTitle className="text-slate-50">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 px-6 pb-8">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                        Tools
                      </p>
                      <div className="grid gap-2">
                        {toolCategories.map((item) => (
                          <AppLink
                            key={item.slug}
                            href={getCategoryPath(item.slug)}
                            onNavigate={navigate}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-400/30 hover:bg-orange-500/10"
                          >
                            {item.title}
                          </AppLink>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                        Company
                      </p>
                      <AppLink
                        href="/about"
                        onNavigate={navigate}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-400/30 hover:bg-orange-500/10"
                      >
                        About Us
                      </AppLink>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {route.type === "home" ? <HomePage onNavigate={navigate} /> : null}
        {route.type === "about" ? <AboutPage /> : null}
        {route.type === "category" && category ? (
          <CategoryPage
            category={category}
            tools={getToolsByCategory(category.slug)}
            onNavigate={navigate}
          />
        ) : null}
        {route.type === "tool" && tool ? <ToolPage tool={tool} /> : null}
        {(route.type === "not-found" || (route.type === "category" && !category) || (route.type === "tool" && !tool)) ? (
          <NotFoundPage onNavigate={navigate} />
        ) : null}

        <SiteFooter onNavigate={navigate} />
      </div>
    </main>
  )
}
