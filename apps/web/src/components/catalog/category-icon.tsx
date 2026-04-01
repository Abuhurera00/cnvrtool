import type { LucideIcon } from "lucide-react"
import {
  Calculator,
  FileJson2,
  Globe,
  ImageIcon,
  ScanSearch,
  Type,
} from "lucide-react"

const iconMap = {
  calculator: Calculator,
  schema: FileJson2,
  image: ImageIcon,
  website: Globe,
  seo: ScanSearch,
  text: Type,
} satisfies Record<string, LucideIcon>

type CategoryIconProps = {
  icon: keyof typeof iconMap
  className?: string
}

export function CategoryIcon({ icon, className }: CategoryIconProps) {
  const Icon = iconMap[icon]
  return <Icon className={className} />
}
