export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    value
  )
}

export function calculateAgeParts(birthDate: string) {
  if (!birthDate) {
    return null
  }

  const start = new Date(birthDate)
  const today = new Date()

  if (Number.isNaN(start.getTime()) || start > today) {
    return null
  }

  let years = today.getFullYear() - start.getFullYear()
  let months = today.getMonth() - start.getMonth()
  let days = today.getDate() - start.getDate()

  if (days < 0) {
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += previousMonth.getDate()
    months -= 1
  }

  if (months < 0) {
    months += 12
    years -= 1
  }

  const totalDays = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  )

  return { years, months, days, totalDays }
}

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function titleCase(text: string) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function sentenceCase(text: string) {
  return text.replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase())
}

export function rgbToHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue]
    .map((value) => clamp(value, 0, 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`
}

export function buildUtmUrl(params: {
  url: string
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
}) {
  if (!params.url) {
    return ""
  }

  let nextUrl: URL

  try {
    nextUrl = new URL(params.url)
  } catch {
    return ""
  }

  nextUrl.searchParams.set("utm_source", params.source)
  nextUrl.searchParams.set("utm_medium", params.medium)
  nextUrl.searchParams.set("utm_campaign", params.campaign)

  if (params.term) {
    nextUrl.searchParams.set("utm_term", params.term)
  }

  if (params.content) {
    nextUrl.searchParams.set("utm_content", params.content)
  }

  return nextUrl.toString()
}

export function generateFaqSchema(
  items: Array<{ question: string; answer: string }>
) {
  const accepted = items.filter((item) => item.question && item.answer)

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: accepted.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    null,
    2
  )
}

export function stringifyJson(value: unknown) {
  return JSON.stringify(value, null, 2)
}

export function generateOpenGraphTags(params: {
  title: string
  description: string
  url: string
  image: string
  siteName: string
}) {
  const lines = [
    `<meta property="og:title" content="${params.title}" />`,
    `<meta property="og:description" content="${params.description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${params.url}" />`,
    `<meta property="og:image" content="${params.image}" />`,
    `<meta property="og:site_name" content="${params.siteName}" />`,
  ]

  return lines.join("\n")
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function textToHtml(text: string) {
  return escapeHtml(text.replace(/\r\n/g, "\n")).split("\n").join("<br />\n")
}

export function generateSeoTags(params: {
  title: string
  description: string
  canonicalUrl: string
  robots: string
}) {
  const lines = [
    `<title>${params.title}</title>`,
    `<meta name="description" content="${params.description}" />`,
    `<meta name="robots" content="${params.robots}" />`,
    `<link rel="canonical" href="${params.canonicalUrl}" />`,
  ]

  return lines.join("\n")
}

export function generateSitemapXml(urls: string[]) {
  const items = urls
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url) => `<url><loc>${escapeHtml(url)}</loc></url>`)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`
}
