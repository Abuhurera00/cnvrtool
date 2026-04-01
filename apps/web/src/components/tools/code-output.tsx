import { Button } from "@workspace/ui/components/button"

type CodeOutputProps = {
  title: string
  value: string
}

export function CodeOutput({ title, value }: CodeOutputProps) {
  return (
    <div className="cnvr-output-panel">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        <Button
          variant="secondary"
          className="bg-white text-slate-950 hover:bg-white/90"
          onClick={() => void navigator.clipboard.writeText(value)}
        >
          Copy
        </Button>
      </div>
      <pre className="mt-4 overflow-x-auto rounded-[1.5rem] bg-slate-900 p-4 text-xs leading-6 text-slate-200">
        {value}
      </pre>
    </div>
  )
}
