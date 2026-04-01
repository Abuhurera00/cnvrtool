import type { PropsWithChildren } from "react"

type AppLinkProps = PropsWithChildren<{
  className?: string
  href: string
  onNavigate: (href: string) => void
}>

export function AppLink({ children, className, href, onNavigate }: AppLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        onNavigate(href)
      }}
    >
      {children}
    </a>
  )
}
