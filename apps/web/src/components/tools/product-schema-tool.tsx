import { useState } from "react"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { CodeOutput } from "@/components/tools/code-output"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { stringifyJson } from "@/lib/tool-utils"

export function ProductSchemaTool() {
  const [form, setForm] = useState({
    name: "CNVR Tool Pro",
    description: "A utility platform for SEO, schema, image, and text workflows.",
    sku: "CNVR-PRO",
    brand: "CNVR Tool",
    currency: "USD",
    price: "29",
  })

  const output = stringifyJson({
    "@context": "https://schema.org",
    "@type": "Product",
    name: form.name,
    description: form.description,
    sku: form.sku,
    brand: {
      "@type": "Brand",
      name: form.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: form.currency,
      price: form.price,
      availability: "https://schema.org/InStock",
    },
  })

  return (
    <ToolPageShell badge="Schema Tool" title="Product Schema Generator" description="Generate product structured data for ecommerce and SaaS offer pages.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-3 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5">
          <Input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="bg-white" placeholder="Product name" />
          <Textarea value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} className="min-h-24 bg-white" placeholder="Description" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input value={form.sku} onChange={(e) => setForm((c) => ({ ...c, sku: e.target.value }))} className="bg-white" placeholder="SKU" />
            <Input value={form.brand} onChange={(e) => setForm((c) => ({ ...c, brand: e.target.value }))} className="bg-white" placeholder="Brand" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input value={form.currency} onChange={(e) => setForm((c) => ({ ...c, currency: e.target.value }))} className="bg-white" placeholder="Currency" />
            <Input value={form.price} onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))} className="bg-white" placeholder="Price" />
          </div>
        </div>
        <CodeOutput title="Product schema JSON-LD" value={output} />
      </div>
    </ToolPageShell>
  )
}
