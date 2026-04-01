import { useState } from "react"
import type { ChangeEvent } from "react"
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FileJson2,
  Globe,
  ImageIcon,
  Link2,
  ScanSearch,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Textarea } from "@workspace/ui/components/textarea"

import { featuredMetrics, toolCategories } from "@/data/tool-catalog"
import {
  buildUtmUrl,
  calculateAgeParts,
  clamp,
  countWords,
  formatNumber,
  generateFaqSchema,
  generateOpenGraphTags,
  rgbToHex,
  sentenceCase,
  titleCase,
} from "@/lib/tool-utils"

type FaqItem = {
  id: number
  question: string
  answer: string
}

type ImageSettings = {
  format: "image/png" | "image/jpeg"
  width: string
  height: string
  quality: number
}

const categoryIcons = {
  "calculator-tools": Calculator,
  "schema-markup-generators": FileJson2,
  "image-editing-tools": ImageIcon,
  "website-management-tools": Globe,
  "seo-tools": ScanSearch,
  "text-analysis-tools": Type,
}

const spotlightTools = [
  { id: "age", label: "Age Calculator", icon: Calculator },
  { id: "faq", label: "FAQ Schema", icon: FileJson2 },
  { id: "image", label: "Image Studio", icon: ImageIcon },
  { id: "utm", label: "UTM Builder", icon: Link2 },
  { id: "og", label: "Open Graph", icon: Globe },
  { id: "text", label: "Text Analysis", icon: Wand2 },
]

export function App() {
  const [birthDate, setBirthDate] = useState("1998-06-15")
  const [price, setPrice] = useState("199")
  const [discountPercent, setDiscountPercent] = useState("15")
  const [rgb, setRgb] = useState({ red: "255", green: "102", blue: "24" })
  const [utm, setUtm] = useState({
    url: "https://www.cnvrtool.com/",
    source: "newsletter",
    medium: "email",
    campaign: "spring-launch",
    content: "hero-button",
  })
  const [og, setOg] = useState({
    title: "CNVR Tool | Smart Utility Suite",
    description:
      "Launch a clean all-in-one toolbox for calculators, SEO, schema, text, and image workflows.",
    url: "https://www.cnvrtool.com/",
    image: "https://www.cnvrtool.com/og-image.png",
    siteName: "CNVR Tool",
  })
  const [textInput, setTextInput] = useState(
    "cnvr tool helps marketers, developers, and operators move faster with practical web utilities."
  )
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      id: 1,
      question: "What is CNVR Tool?",
      answer:
        "CNVR Tool is an all-in-one web utility suite for SEO, content, image, and conversion workflows.",
    },
    {
      id: 2,
      question: "Do these tools work in the browser?",
      answer:
        "Yes. Many utilities can run fully client-side for a fast and privacy-friendly experience.",
    },
  ])
  const [imageSettings, setImageSettings] = useState<ImageSettings>({
    format: "image/png",
    width: "",
    height: "",
    quality: 0.82,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageDownloadUrl, setImageDownloadUrl] = useState<string | null>(null)
  const [imageName, setImageName] = useState("")
  const [imageStatus, setImageStatus] = useState(
    "Upload a PNG or JPEG, then convert, compress, or resize it."
  )

  const age = calculateAgeParts(birthDate)
  const amount = Number(price) || 0
  const discount = clamp(Number(discountPercent) || 0, 0, 100)
  const saved = (amount * discount) / 100
  const finalPrice = amount - saved
  const words = countWords(textInput)
  const characters = textInput.length
  const readingTime = Math.max(1, Math.ceil(words / 200))
  const faqSchema = generateFaqSchema(faqItems)
  const hexValue = rgbToHex(
    Number(rgb.red) || 0,
    Number(rgb.green) || 0,
    Number(rgb.blue) || 0
  )
  const utmUrl = buildUtmUrl(utm)
  const ogTags = generateOpenGraphTags(og)

  function updateFaqItem(id: number, field: "question" | "answer", value: string) {
    setFaqItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  function addFaqItem() {
    setFaqItems((current) => [...current, { id: Date.now(), question: "", answer: "" }])
  }

  function copyToClipboard(value: string) {
    void navigator.clipboard.writeText(value)
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setImageName(file.name)
    setImagePreview(URL.createObjectURL(file))
    setImageDownloadUrl(null)
    setImageStatus("Image ready. Choose settings and click Process image.")
  }

  async function processImage() {
    if (!imagePreview) {
      setImageStatus("Please upload an image before processing.")
      return
    }

    const img = new Image()
    img.src = imagePreview

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error("Unable to load image"))
    })

    const targetWidth = Number(imageSettings.width) || img.width
    const targetHeight = Number(imageSettings.height) || img.height
    const canvas = document.createElement("canvas")
    canvas.width = targetWidth
    canvas.height = targetHeight

    const context = canvas.getContext("2d")
    if (!context) {
      setImageStatus("Canvas processing is not available in this browser.")
      return
    }

    context.drawImage(img, 0, 0, targetWidth, targetHeight)

    const output = canvas.toDataURL(
      imageSettings.format,
      imageSettings.format === "image/jpeg" ? imageSettings.quality : undefined
    )

    setImageDownloadUrl(output)
    setImageStatus(
      `Processed ${imageName || "image"} as ${
        imageSettings.format === "image/png" ? "PNG" : "JPEG"
      } at ${targetWidth}x${targetHeight}.`
    )
  }

  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_left,_rgba(255,116,31,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(255,188,125,0.25),_transparent_28%),linear-gradient(180deg,_rgba(255,250,246,1)_0%,_rgba(255,255,255,1)_42%,_rgba(255,247,241,0.9)_100%)] text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-10 pt-6 lg:px-10">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6b1a,#ff9d57)] text-white shadow-lg shadow-orange-200">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">CNVR Tool</p>
              <p className="text-sm text-muted-foreground">
                Smart utility suite for creators, marketers, and teams.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
              24+ utilities planned
            </Badge>
            <Button
              className="h-10 rounded-xl bg-[linear-gradient(135deg,#ff6b1a,#ff8d4d)] px-4 text-white shadow-lg shadow-orange-200"
              onClick={() =>
                document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore workspace
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,245,238,0.94))] p-8 shadow-[0_24px_90px_rgba(15,23,42,0.1)]">
            <div className="absolute -right-14 top-0 h-52 w-52 rounded-full bg-orange-200/35 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-amber-100/70 blur-3xl" />
            <div className="relative flex flex-col gap-6">
              <Badge className="w-fit bg-orange-100 text-orange-700 hover:bg-orange-100">
                Modern SaaS direction
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                  Build a polished all-in-one toolbox inspired by CNVR Tool.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  This foundation gives you a strong product homepage, category
                  architecture, and working browser-based utilities for image,
                  SEO, schema, text, and calculator workflows.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredMetrics.map((metric) => (
              <Card
                key={metric.label}
                className="rounded-[1.75rem] border-white/60 bg-white/80 py-0 shadow-[0_16px_48px_rgba(15,23,42,0.08)]"
              >
                <CardHeader className="pb-2">
                  <CardDescription>{metric.label}</CardDescription>
                  <CardTitle className="text-3xl">{metric.value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex flex-col gap-3">
          <Badge className="w-fit bg-white text-orange-700 shadow-sm hover:bg-white">
            Platform categories
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Six tool groups, one cohesive experience
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Each category already has a dedicated identity, summary, and tool inventory.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {toolCategories.map((category) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons]

            return (
              <Card
                key={category.id}
                className="rounded-[1.75rem] border-white/60 bg-white/80 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
              >
                <CardHeader className="gap-3 pb-2">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600">
                    <Icon className="size-7" />
                  </div>
                  <CardTitle className="text-xl">{category.label}</CardTitle>
                  <CardDescription className="leading-6">{category.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-600">
                    {category.accent}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="rounded-full border-orange-100 bg-orange-50/40 px-3 py-1 text-[11px] text-slate-700"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="workspace" className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex flex-col gap-3">
          <Badge className="w-fit bg-orange-100 text-orange-700 hover:bg-orange-100">
            Working tools
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Interactive workspace
          </h2>
        </div>

        <Tabs defaultValue="age" className="gap-6">
          <TabsList
            variant="line"
            className="flex w-full flex-wrap justify-start gap-2 overflow-x-auto rounded-none border-b border-orange-100 p-0 pb-2"
          >
            {spotlightTools.map((tool) => {
              const Icon = tool.icon

              return (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm shadow-sm data-active:border-orange-200 data-active:bg-orange-50"
                >
                  <Icon className="size-4" />
                  {tool.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="age">
            <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <CardTitle>Age and Discount Calculators</CardTitle>
                <CardDescription>
                  Two practical calculator tools for marketing and conversion workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pb-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-5">
                  <div>
                    <p className="text-sm font-medium">Age Calculator</p>
                    <p className="text-sm text-muted-foreground">
                      Enter a birth date to get an exact age breakdown.
                    </p>
                  </div>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-600">
                        Current age
                      </p>
                      <p className="mt-2 text-3xl font-semibold">
                        {age ? age.years : "--"} years
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-600">
                        Total days
                      </p>
                      <p className="mt-2 text-3xl font-semibold">
                        {age ? formatNumber(age.totalDays) : "--"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {age
                      ? `${age.years} years, ${age.months} months, and ${age.days} days old.`
                      : "Choose a valid birth date to calculate the result."}
                  </p>
                </div>

                <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div>
                    <p className="text-sm font-medium">Discount Calculator</p>
                    <p className="text-sm text-muted-foreground">
                      Great for ecommerce promotions and pricing previews.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      type="number"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      placeholder="Original price"
                    />
                    <Input
                      type="number"
                      value={discountPercent}
                      onChange={(event) => setDiscountPercent(event.target.value)}
                      placeholder="Discount %"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Original
                      </p>
                      <p className="mt-2 text-2xl font-semibold">
                        ${formatNumber(amount)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Saved
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-orange-600">
                        ${formatNumber(saved)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Final
                      </p>
                      <p className="mt-2 text-2xl font-semibold">
                        ${formatNumber(finalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <CardTitle>FAQ Schema Generator</CardTitle>
                <CardDescription>
                  Generate JSON-LD blocks for FAQ rich results.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pb-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="space-y-3 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-4"
                    >
                      <p className="text-sm font-medium">FAQ #{index + 1}</p>
                      <Input
                        value={item.question}
                        onChange={(event) =>
                          updateFaqItem(item.id, "question", event.target.value)
                        }
                        placeholder="Question"
                      />
                      <Textarea
                        value={item.answer}
                        onChange={(event) =>
                          updateFaqItem(item.id, "answer", event.target.value)
                        }
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addFaqItem}>
                    Add another FAQ
                  </Button>
                </div>
                <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Generated JSON-LD</p>
                      <p className="text-sm text-slate-300">Ready to embed.</p>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white text-slate-900 hover:bg-white/90"
                      onClick={() => copyToClipboard(faqSchema)}
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs leading-6 text-slate-200">
                    {faqSchema}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="image">
            <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <CardTitle>Image Studio</CardTitle>
                <CardDescription>
                  Convert JPEG to PNG, PNG to JPEG, compress exports, and resize images.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pb-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="space-y-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-5">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      <span className="text-muted-foreground">Output format</span>
                      <select
                        value={imageSettings.format}
                        onChange={(event) =>
                          setImageSettings((current) => ({
                            ...current,
                            format: event.target.value as ImageSettings["format"],
                          }))
                        }
                        className="h-10 w-full rounded-xl border border-input bg-white px-3 outline-none"
                      >
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPEG</option>
                      </select>
                    </label>
                    <label className="space-y-2 text-sm">
                      <span className="text-muted-foreground">JPEG quality</span>
                      <Input
                        type="number"
                        min="0.1"
                        max="1"
                        step="0.01"
                        value={imageSettings.quality}
                        onChange={(event) =>
                          setImageSettings((current) => ({
                            ...current,
                            quality: clamp(Number(event.target.value) || 0.82, 0.1, 1),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      type="number"
                      placeholder="Width"
                      value={imageSettings.width}
                      onChange={(event) =>
                        setImageSettings((current) => ({
                          ...current,
                          width: event.target.value,
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Height"
                      value={imageSettings.height}
                      onChange={(event) =>
                        setImageSettings((current) => ({
                          ...current,
                          height: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button
                    className="h-10 rounded-xl bg-[linear-gradient(135deg,#ff6b1a,#ff8d4d)] px-4 text-white"
                    onClick={() => void processImage()}
                  >
                    Process image
                  </Button>
                  <p className="text-sm text-muted-foreground">{imageStatus}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium">Original preview</p>
                    <div className="mt-4 flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Original upload preview"
                          className="max-h-60 rounded-xl object-contain"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">Upload an image to preview it here.</p>
                      )}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium">Processed output</p>
                    <div className="mt-4 flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
                      {imageDownloadUrl ? (
                        <img
                          src={imageDownloadUrl}
                          alt="Processed output preview"
                          className="max-h-60 rounded-xl object-contain"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">Your converted result will appear here.</p>
                      )}
                    </div>
                    {imageDownloadUrl ? (
                      <a
                        href={imageDownloadUrl}
                        download={`cnvrtool-output${imageSettings.format === "image/png" ? ".png" : ".jpg"}`}
                        className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-medium text-white"
                      >
                        Download processed image
                      </a>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utm">
            <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <CardTitle>UTM Builder and RGB to HEX</CardTitle>
                <CardDescription>
                  SEO and website management helpers for campaigns and design handoff.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pb-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-5">
                  <div className="grid gap-3">
                    <Input
                      value={utm.url}
                      onChange={(event) =>
                        setUtm((current) => ({ ...current, url: event.target.value }))
                      }
                      placeholder="https://example.com"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={utm.source}
                        onChange={(event) =>
                          setUtm((current) => ({ ...current, source: event.target.value }))
                        }
                        placeholder="utm_source"
                      />
                      <Input
                        value={utm.medium}
                        onChange={(event) =>
                          setUtm((current) => ({ ...current, medium: event.target.value }))
                        }
                        placeholder="utm_medium"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={utm.campaign}
                        onChange={(event) =>
                          setUtm((current) => ({
                            ...current,
                            campaign: event.target.value,
                          }))
                        }
                        placeholder="utm_campaign"
                      />
                      <Input
                        value={utm.content}
                        onChange={(event) =>
                          setUtm((current) => ({ ...current, content: event.target.value }))
                        }
                        placeholder="utm_content"
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">Generated campaign URL</p>
                      <Button variant="outline" onClick={() => copyToClipboard(utmUrl)}>
                        Copy
                      </Button>
                    </div>
                    <p className="mt-3 break-all text-sm leading-6 text-muted-foreground">
                      {utmUrl || "Enter a valid URL and UTM values."}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div>
                    <p className="text-sm font-medium">RGB to HEX Generator</p>
                    <p className="text-sm text-muted-foreground">
                      Quick utility for styling systems and UI audits.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Input
                      type="number"
                      value={rgb.red}
                      onChange={(event) =>
                        setRgb((current) => ({ ...current, red: event.target.value }))
                      }
                      placeholder="Red"
                    />
                    <Input
                      type="number"
                      value={rgb.green}
                      onChange={(event) =>
                        setRgb((current) => ({ ...current, green: event.target.value }))
                      }
                      placeholder="Green"
                    />
                    <Input
                      type="number"
                      value={rgb.blue}
                      onChange={(event) =>
                        setRgb((current) => ({ ...current, blue: event.target.value }))
                      }
                      placeholder="Blue"
                    />
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Hex output
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div
                        className="size-14 rounded-2xl border border-slate-200"
                        style={{ backgroundColor: hexValue }}
                      />
                      <div>
                        <p className="text-2xl font-semibold">{hexValue}</p>
                        <Button
                          variant="link"
                          className="h-auto px-0 text-orange-600"
                          onClick={() => copyToClipboard(hexValue)}
                        >
                          Copy hex value
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="og">
            <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <CardTitle>Open Graph Generator</CardTitle>
                <CardDescription>
                  Generate social sharing tags for landing pages, posts, and campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pb-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="grid gap-3 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-5">
                  <Input
                    value={og.title}
                    onChange={(event) =>
                      setOg((current) => ({ ...current, title: event.target.value }))
                    }
                    placeholder="OG title"
                  />
                  <Textarea
                    value={og.description}
                    onChange={(event) =>
                      setOg((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="OG description"
                  />
                  <Input
                    value={og.url}
                    onChange={(event) =>
                      setOg((current) => ({ ...current, url: event.target.value }))
                    }
                    placeholder="Page URL"
                  />
                  <Input
                    value={og.image}
                    onChange={(event) =>
                      setOg((current) => ({ ...current, image: event.target.value }))
                    }
                    placeholder="Image URL"
                  />
                  <Input
                    value={og.siteName}
                    onChange={(event) =>
                      setOg((current) => ({ ...current, siteName: event.target.value }))
                    }
                    placeholder="Site name"
                  />
                </div>
                <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Meta tag output</p>
                      <p className="text-sm text-slate-300">Copy this into the page head.</p>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white text-slate-900 hover:bg-white/90"
                      onClick={() => copyToClipboard(ogTags)}
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs leading-6 text-slate-200">
                    {ogTags}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text">
            <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <CardTitle>Text Analysis Suite</CardTitle>
                <CardDescription>
                  Word counting, cleanup, capitalization, and reusable transforms.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pb-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-5">
                  <Textarea
                    value={textInput}
                    onChange={(event) => setTextInput(event.target.value)}
                    className="min-h-64 bg-white"
                    placeholder="Paste or type your content"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setTextInput(textInput.toUpperCase())}>
                      Uppercase
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setTextInput(textInput.toLowerCase())}
                    >
                      Lowercase
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setTextInput(titleCase(textInput))}
                    >
                      Title case
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setTextInput(sentenceCase(textInput))}
                    >
                      Sentence case
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Words
                      </p>
                      <p className="mt-2 text-3xl font-semibold">{words}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Characters
                      </p>
                      <p className="mt-2 text-3xl font-semibold">{characters}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Read time
                      </p>
                      <p className="mt-2 text-3xl font-semibold">{readingTime} min</p>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-slate-50">
                    <p className="text-sm font-medium">Content notes</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 size-4 text-orange-400" />
                        This module covers your word counter and letter capitalize flows.
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 size-4 text-orange-400" />
                        A spelling checker can be added later with a dictionary API or backend service.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[1.75rem] border-white/60 bg-slate-950 py-0 text-slate-50 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Suggested next steps</CardTitle>
              <CardDescription className="text-slate-300">
                The current app is now a strong front-end MVP foundation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-300">
              <p>1. Add route-based pages for each individual tool.</p>
              <p>2. Introduce Zustand only when presets, recents, or shared workflows need it.</p>
              <p>3. Add a `server` app only for persistence, APIs, auth, or heavy processing.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem] border-white/60 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <CardHeader>
              <CardTitle className="text-2xl">Already implemented</CardTitle>
              <CardDescription>
                This base includes real functionality, not just a styled landing page.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50/50 p-4">
                <p className="text-sm font-medium">Working now</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Age calculator, discount calculator, FAQ schema, image conversion,
                  UTM builder, RGB to HEX, Open Graph tags, and text transforms.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-sm font-medium">Easy next additions</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Product schema, article schema, sitemap generator, QR code, spelling checker,
                  and a richer scientific calculator.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
