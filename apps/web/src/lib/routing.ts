export type AppRoute =
  | { type: "home"; path: "/" }
  | { type: "about"; path: "/about" }
  | { type: "category"; path: string; categorySlug: string }
  | { type: "tool"; path: string; toolSlug: string }
  | { type: "not-found"; path: string }

export function getCategoryPath(categorySlug: string) {
  return `/category/${categorySlug}`
}

export function getToolPath(toolSlug: string) {
  return `/tool/${toolSlug}`
}

export function parseRoute(pathname: string): AppRoute {
  if (pathname === "/" || pathname === "") {
    return { type: "home", path: "/" }
  }

  if (pathname === "/about") {
    return { type: "about", path: "/about" }
  }

  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 2 && segments[0] === "category") {
    return {
      type: "category",
      path: pathname,
      categorySlug: segments[1],
    }
  }

  if (segments.length === 2 && segments[0] === "tool") {
    return {
      type: "tool",
      path: pathname,
      toolSlug: segments[1],
    }
  }

  return { type: "not-found", path: pathname }
}
