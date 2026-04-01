import { Button } from "@workspace/ui/components/button"

type NotFoundPageProps = {
  onNavigate: (href: string) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/95 p-8 text-center shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
        Page not found
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">This route does not exist.</h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600">
        Use the homepage to browse categories and open the available tool routes.
      </p>
      <Button className="mt-6" onClick={() => onNavigate("/")}>
        Go to homepage
      </Button>
    </div>
  )
}
