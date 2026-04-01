import { AgeCalculatorTool } from "@/components/tools/age-calculator-tool"
import { ArticleSchemaTool } from "@/components/tools/article-schema-tool"
import { DiscountCalculatorTool } from "@/components/tools/discount-calculator-tool"
import { EventSchemaTool } from "@/components/tools/event-schema-tool"
import { FaqSchemaTool } from "@/components/tools/faq-schema-tool"
import { ImageTransformerTool } from "@/components/tools/image-transformer-tool"
import { JobPostingSchemaTool } from "@/components/tools/job-posting-schema-tool"
import { LetterCapitalizeTool } from "@/components/tools/letter-capitalize-tool"
import { MovieSchemaTool } from "@/components/tools/movie-schema-tool"
import { OpenGraphTool } from "@/components/tools/open-graph-tool"
import { PaypalFeeConverterTool } from "@/components/tools/paypal-fee-converter-tool"
import { PlannedToolPlaceholder } from "@/components/tools/planned-tool-placeholder"
import { ProductSchemaTool } from "@/components/tools/product-schema-tool"
import { QrCodeTool } from "@/components/tools/qr-code-tool"
import { RgbToHexTool } from "@/components/tools/rgb-to-hex-tool"
import { SeoTagGeneratorTool } from "@/components/tools/seo-tag-generator-tool"
import { SitemapGeneratorTool } from "@/components/tools/sitemap-generator-tool"
import { ScientificCalculatorTool } from "@/components/tools/scientific-calculator-tool"
import { SpellingCheckerTool } from "@/components/tools/spelling-checker-tool"
import { TextToHtmlTool } from "@/components/tools/text-to-html-tool"
import { UtmBuilderTool } from "@/components/tools/utm-builder-tool"
import { WordCounterTool } from "@/components/tools/word-counter-tool"
import type { ToolItem } from "@/content/tool-catalog"

type ToolPageProps = {
  tool: ToolItem
}

export function ToolPage({ tool }: ToolPageProps) {
  switch (tool.slug) {
    case "scientific-calculator":
      return <ScientificCalculatorTool />
    case "paypal-fee-converter":
      return <PaypalFeeConverterTool />
    case "age-calculator":
      return <AgeCalculatorTool />
    case "discount-calculator":
      return <DiscountCalculatorTool />
    case "event-schema-generator":
      return <EventSchemaTool />
    case "faq-schema-generator":
      return <FaqSchemaTool />
    case "movie-schema-generator":
      return <MovieSchemaTool />
    case "job-posting-schema-generator":
      return <JobPostingSchemaTool />
    case "product-schema-generator":
      return <ProductSchemaTool />
    case "article-schema-generator":
      return <ArticleSchemaTool />
    case "jpeg-to-png-converter":
      return <ImageTransformerTool mode="jpeg-to-png" />
    case "png-to-jpeg-converter":
      return <ImageTransformerTool mode="png-to-jpeg" />
    case "image-compressor":
      return <ImageTransformerTool mode="compress" />
    case "image-resizer":
      return <ImageTransformerTool mode="resize" />
    case "qr-code-generator":
      return <QrCodeTool />
    case "utm-builder":
      return <UtmBuilderTool />
    case "rgb-to-hex-generator":
      return <RgbToHexTool />
    case "open-graph-generator":
      return <OpenGraphTool />
    case "text-to-html-generator":
      return <TextToHtmlTool />
    case "seo-tag-generator":
      return <SeoTagGeneratorTool />
    case "sitemap-generator":
      return <SitemapGeneratorTool />
    case "text-spelling-checker":
      return <SpellingCheckerTool />
    case "word-counter-tool":
      return <WordCounterTool />
    case "online-letter-capitalize-tool":
      return <LetterCapitalizeTool />
    default:
      return <PlannedToolPlaceholder tool={tool} />
  }
}
