type ToolCardCopy = {
  title: string
  description: string
}

type ToolPageCopy = {
  features: ToolCardCopy[]
  useCases: ToolCardCopy[]
}

const defaultFeatures: ToolCardCopy[] = [
  {
    title: "Focused workflow",
    description: "Each tool is designed around one task so users can get results quickly without extra setup.",
  },
  {
    title: "Clear output",
    description: "Inputs and results are separated cleanly to keep the experience fast to scan and easy to trust.",
  },
  {
    title: "Modern UI",
    description: "The layout follows a lightweight SaaS-style pattern with cards, spacing, and readable hierarchy.",
  },
  {
    title: "Responsive layout",
    description: "The tool adapts to mobile and desktop usage without losing the main action or result visibility.",
  },
]

const defaultUseCases: ToolCardCopy[] = [
  {
    title: "Marketing teams",
    description: "Useful for campaigns, content launches, and day-to-day optimization work.",
  },
  {
    title: "Content teams",
    description: "Helps editors and operators move from raw input to publishable output faster.",
  },
  {
    title: "Product workflows",
    description: "Supports quick QA, metadata generation, and implementation handoff.",
  },
  {
    title: "Solo builders",
    description: "Gives independent creators fast utility workflows without leaving the browser.",
  },
]

const toolCopy: Record<string, ToolPageCopy> = {
  "Age Calculator": {
    features: [
      { title: "Exact age output", description: "Shows years, months, days, and total days lived from a single date input." },
      { title: "Instant feedback", description: "The result updates immediately, which keeps the calculation feeling lightweight and direct." },
      { title: "Readable summaries", description: "Large result cards make the primary numbers easy to understand at a glance." },
      { title: "Simple UX", description: "The interface removes distractions and keeps the user focused on one useful calculation." },
    ],
    useCases: [
      { title: "Profile forms", description: "Useful when someone needs a fast age check while filling profile or onboarding data." },
      { title: "Eligibility checks", description: "Helpful for validating age-based access or policy requirements." },
      { title: "Personal records", description: "Good for calculating exact age information for simple record keeping." },
      { title: "General utility", description: "A handy everyday calculator that belongs naturally in a multi-tool product." },
    ],
  },
  "Discount Calculator": {
    features: [
      { title: "Promotion math", description: "Calculates savings and final price from the entered discount percentage." },
      { title: "Fast result cards", description: "Breaks the result into original, saved, and final values for easy comparison." },
      { title: "Retail friendly", description: "Built for ecommerce-style scenarios where price clarity matters." },
      { title: "Low-friction input", description: "Only a couple of fields are needed to get a useful answer." },
    ],
    useCases: [
      { title: "Ecommerce pricing", description: "Check campaign discounts before publishing on landing pages or stores." },
      { title: "Sales offers", description: "Preview special offers and communicate customer savings more clearly." },
      { title: "Marketing QA", description: "Verify that the offer shown in design or copy matches the real final price." },
      { title: "Internal planning", description: "Quickly compare different promotional scenarios during planning sessions." },
    ],
  },
}

export function getToolPageCopy(title: string): ToolPageCopy {
  return toolCopy[title] ?? {
    features: defaultFeatures,
    useCases: defaultUseCases,
  }
}
