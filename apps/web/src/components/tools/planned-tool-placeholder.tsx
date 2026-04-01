import type { ToolItem } from "@/content/tool-catalog"

import { ToolPageShell } from "@/components/tools/tool-page-shell"

type PlannedToolPlaceholderProps = {
  tool: ToolItem
}

export function PlannedToolPlaceholder({ tool }: PlannedToolPlaceholderProps) {
  return (
    <ToolPageShell
      badge="Planned Tool"
      title={tool.title}
      description={tool.description}
    >
      <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
        <p className="text-base font-semibold text-slate-950">This tool is scaffolded but not implemented yet.</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          The route, metadata, category structure, and navigation are already in place. If you want,
          I can build this tool next with the same dedicated page structure.
        </p>
      </div>
    </ToolPageShell>
  )
}
