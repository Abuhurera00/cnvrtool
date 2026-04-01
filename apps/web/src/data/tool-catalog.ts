export type ToolCategory = {
  id: string
  label: string
  summary: string
  accent: string
  tools: string[]
}

export const toolCategories: ToolCategory[] = [
  {
    id: "calculator-tools",
    label: "Calculator Tools",
    summary:
      "Fast daily calculators for pricing, payments, age checks, and more conversion-heavy workflows.",
    accent: "From quick estimates to finance-friendly calculations",
    tools: [
      "Scientific Calculator",
      "PayPal Fee Converter",
      "Age Calculator",
      "Discount Calculator",
    ],
  },
  {
    id: "schema-markup-generators",
    label: "Schema Markup Generators",
    summary:
      "Generate rich-result ready structured data for content, products, hiring pages, and media pages.",
    accent: "Search visibility tools for structured content teams",
    tools: [
      "Event Schema Generator",
      "FAQ Schema Generator",
      "Movie Schema Generator",
      "Job Posting Schema Generator",
      "Product Schema Generator",
      "Article Schema Generator",
    ],
  },
  {
    id: "image-editing-tools",
    label: "Image Editing Tools",
    summary:
      "Browser-based image conversion and optimization flows built for marketing pages, ecommerce, and uploads.",
    accent: "Lightweight image workflows without leaving the browser",
    tools: [
      "JPEG to PNG Converter",
      "Image Compressor",
      "PNG to JPEG Converter",
      "Image Resizer",
    ],
  },
  {
    id: "website-management-tools",
    label: "Website Management Tools",
    summary:
      "Content and publishing helpers for metadata, design handoff, link presentation, and utility snippets.",
    accent: "Small helpers that remove day-to-day publishing friction",
    tools: [
      "QR Code Generator",
      "Text to HTML Generator",
      "RGB to HEX Generator",
      "Open Graph Generator",
    ],
  },
  {
    id: "seo-tools",
    label: "SEO Tools",
    summary:
      "Practical SEO helpers for metadata, crawl support, and campaign tracking without extra setup.",
    accent: "Built for technical SEO and campaign execution",
    tools: ["SEO Tag Generator", "Sitemap Generator", "UTM Builder"],
  },
  {
    id: "text-analysis-tools",
    label: "Text Analysis Tools",
    summary:
      "Editing, counting, and formatting tools for content teams shipping articles, product copy, and docs.",
    accent: "Useful text cleanup for writers and operations teams",
    tools: [
      "Text Spelling Checker",
      "Word Counter Tool",
      "Online Letter Capitalize Tool",
    ],
  },
]

export const featuredMetrics = [
  { label: "Core Tool Groups", value: "6" },
  { label: "Planned Utilities", value: "24+" },
  { label: "Client-Side First", value: "Fast" },
  { label: "Design Direction", value: "Modern SaaS" },
]
