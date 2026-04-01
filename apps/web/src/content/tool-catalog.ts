export type ToolStatus = "ready" | "planned"

export type ToolCategory = {
  slug: string
  title: string
  summary: string
  description: string
  icon: "calculator" | "schema" | "image" | "website" | "seo" | "text"
}

export type ToolItem = {
  slug: string
  categorySlug: ToolCategory["slug"]
  title: string
  description: string
  status: ToolStatus
}

export const toolCategories: ToolCategory[] = [
  {
    slug: "calculator-tools",
    title: "Calculator Tools",
    summary: "Useful calculators for pricing, payments, age checks, and quick daily work.",
    description:
      "A focused set of calculators for ecommerce, operators, and marketing teams.",
    icon: "calculator",
  },
  {
    slug: "schema-markup-generators",
    title: "Schema Markup Generators",
    summary: "Generate structured data for pages that need stronger search presentation.",
    description:
      "Create schema for content, products, jobs, events, and FAQs with a cleaner workflow.",
    icon: "schema",
  },
  {
    slug: "image-editing-tools",
    title: "Image Editing Tools",
    summary: "Convert, compress, and resize images directly in the browser.",
    description:
      "Image utilities designed for uploads, landing pages, product pages, and content teams.",
    icon: "image",
  },
  {
    slug: "website-management-tools",
    title: "Website Management Tools",
    summary: "Small helpers for publishing, metadata, color conversion, and content formatting.",
    description:
      "A practical tool set for day-to-day website operations and content management.",
    icon: "website",
  },
  {
    slug: "seo-tools",
    title: "SEO Tools",
    summary: "Campaign, metadata, and crawling helpers for technical SEO work.",
    description:
      "Lightweight SEO workflows for content launches, campaign tracking, and metadata generation.",
    icon: "seo",
  },
  {
    slug: "text-analysis-tools",
    title: "Text Analysis Tools",
    summary: "Count, inspect, and transform text content with clear outputs.",
    description:
      "Content-focused utilities for editorial teams, documentation writers, and operators.",
    icon: "text",
  },
]

export const toolItems: ToolItem[] = [
  {
    slug: "scientific-calculator",
    categorySlug: "calculator-tools",
    title: "Scientific Calculator",
    description: "Advanced calculator for expressions and quick computations.",
    status: "ready",
  },
  {
    slug: "paypal-fee-converter",
    categorySlug: "calculator-tools",
    title: "PayPal Fee Converter",
    description: "Estimate payout, fees, and gross amount for PayPal payments.",
    status: "ready",
  },
  {
    slug: "age-calculator",
    categorySlug: "calculator-tools",
    title: "Age Calculator",
    description: "Calculate exact age in years, months, days, and total days.",
    status: "ready",
  },
  {
    slug: "discount-calculator",
    categorySlug: "calculator-tools",
    title: "Discount Calculator",
    description: "Calculate savings and final price for offers and promotions.",
    status: "ready",
  },
  {
    slug: "event-schema-generator",
    categorySlug: "schema-markup-generators",
    title: "Event Schema Generator",
    description: "Generate event JSON-LD for launches, webinars, and meetups.",
    status: "ready",
  },
  {
    slug: "faq-schema-generator",
    categorySlug: "schema-markup-generators",
    title: "FAQ Schema Generator",
    description: "Build FAQ rich-result JSON-LD with multiple question/answer pairs.",
    status: "ready",
  },
  {
    slug: "movie-schema-generator",
    categorySlug: "schema-markup-generators",
    title: "Movie Schema Generator",
    description: "Generate schema for movie detail and entertainment pages.",
    status: "ready",
  },
  {
    slug: "job-posting-schema-generator",
    categorySlug: "schema-markup-generators",
    title: "Job Posting Schema Generator",
    description: "Create structured data for recruitment and hiring pages.",
    status: "ready",
  },
  {
    slug: "product-schema-generator",
    categorySlug: "schema-markup-generators",
    title: "Product Schema Generator",
    description: "Generate structured product markup for ecommerce pages.",
    status: "ready",
  },
  {
    slug: "article-schema-generator",
    categorySlug: "schema-markup-generators",
    title: "Article Schema Generator",
    description: "Create article JSON-LD for blogs, guides, and editorial content.",
    status: "ready",
  },
  {
    slug: "jpeg-to-png-converter",
    categorySlug: "image-editing-tools",
    title: "JPEG to PNG Converter",
    description: "Convert JPEG images to PNG with optional resizing.",
    status: "ready",
  },
  {
    slug: "image-compressor",
    categorySlug: "image-editing-tools",
    title: "Image Compressor",
    description: "Reduce output size for browser-friendly image uploads.",
    status: "ready",
  },
  {
    slug: "png-to-jpeg-converter",
    categorySlug: "image-editing-tools",
    title: "PNG to JPEG Converter",
    description: "Convert PNG files to JPEG with configurable quality.",
    status: "ready",
  },
  {
    slug: "image-resizer",
    categorySlug: "image-editing-tools",
    title: "Image Resizer",
    description: "Resize images to target width and height before download.",
    status: "ready",
  },
  {
    slug: "qr-code-generator",
    categorySlug: "website-management-tools",
    title: "QR Code Generator",
    description: "Generate QR codes for pages, campaigns, and offline distribution.",
    status: "ready",
  },
  {
    slug: "text-to-html-generator",
    categorySlug: "website-management-tools",
    title: "Text to HTML Generator",
    description: "Convert text blocks into HTML-ready output with line preservation.",
    status: "ready",
  },
  {
    slug: "rgb-to-hex-generator",
    categorySlug: "website-management-tools",
    title: "RGB to HEX Generator",
    description: "Convert RGB color values to HEX for design and implementation.",
    status: "ready",
  },
  {
    slug: "open-graph-generator",
    categorySlug: "website-management-tools",
    title: "Open Graph Generator",
    description: "Generate OG meta tags for social sharing cards.",
    status: "ready",
  },
  {
    slug: "seo-tag-generator",
    categorySlug: "seo-tools",
    title: "SEO Tag Generator",
    description: "Generate page title, description, robots, canonical, and OG starter tags.",
    status: "ready",
  },
  {
    slug: "sitemap-generator",
    categorySlug: "seo-tools",
    title: "Sitemap Generator",
    description: "Build sitemap XML from a list of URLs.",
    status: "ready",
  },
  {
    slug: "utm-builder",
    categorySlug: "seo-tools",
    title: "UTM Builder",
    description: "Create campaign-ready URLs for analytics and ad attribution.",
    status: "ready",
  },
  {
    slug: "text-spelling-checker",
    categorySlug: "text-analysis-tools",
    title: "Text Spelling Checker",
    description: "Spell-check text content with future API or dictionary support.",
    status: "ready",
  },
  {
    slug: "word-counter-tool",
    categorySlug: "text-analysis-tools",
    title: "Word Counter Tool",
    description: "Count words, characters, and estimated read time.",
    status: "ready",
  },
  {
    slug: "online-letter-capitalize-tool",
    categorySlug: "text-analysis-tools",
    title: "Online Letter Capitalize Tool",
    description: "Transform text into uppercase, lowercase, title case, and sentence case.",
    status: "ready",
  },
]

export const featuredCategorySlugs = [
  "calculator-tools",
  "schema-markup-generators",
  "image-editing-tools",
  "website-management-tools",
  "seo-tools",
  "text-analysis-tools",
] as const

export function getCategoryBySlug(slug: string) {
  return toolCategories.find((category) => category.slug === slug) ?? null
}

export function getToolBySlug(slug: string) {
  return toolItems.find((tool) => tool.slug === slug) ?? null
}

export function getToolsByCategory(categorySlug: string) {
  return toolItems.filter((tool) => tool.categorySlug === categorySlug)
}
