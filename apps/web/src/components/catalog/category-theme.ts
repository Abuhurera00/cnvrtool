export function getCategoryTheme(slug: string) {
  switch (slug) {
    case "calculator-tools":
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,245,238,0.98))] dark:bg-[linear-gradient(135deg,rgba(24,24,24,0.98),rgba(58,32,14,0.92))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(249,115,22,0.12)]",
        icon: "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-500/25 dark:bg-orange-500/12 dark:text-orange-300",
      }
    case "schema-markup-generators":
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,247,255,0.98))] dark:bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(26,38,66,0.92))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(59,130,246,0.12)]",
        icon: "border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-500/25 dark:bg-sky-500/12 dark:text-sky-300",
      }
    case "image-editing-tools":
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,255,251,0.98))] dark:bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(14,53,43,0.92))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(16,185,129,0.10)]",
        icon: "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/25 dark:bg-emerald-500/12 dark:text-emerald-300",
      }
    case "website-management-tools":
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,247,252,0.98))] dark:bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(60,24,48,0.92))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(236,72,153,0.10)]",
        icon: "border-pink-200 bg-pink-50 text-pink-600 dark:border-pink-500/25 dark:bg-pink-500/12 dark:text-pink-300",
      }
    case "seo-tools":
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(249,255,245,0.98))] dark:bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(42,54,16,0.92))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(132,204,22,0.10)]",
        icon: "border-lime-200 bg-lime-50 text-lime-600 dark:border-lime-500/25 dark:bg-lime-500/12 dark:text-lime-300",
      }
    case "text-analysis-tools":
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,245,255,0.98))] dark:bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(41,24,66,0.92))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(168,85,247,0.10)]",
        icon: "border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/25 dark:bg-violet-500/12 dark:text-violet-300",
      }
    default:
      return {
        hero:
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,245,238,0.98))] dark:bg-[linear-gradient(135deg,rgba(18,18,18,0.98),rgba(30,30,30,0.96))]",
        glow: "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_64px_rgba(0,0,0,0.35)]",
        icon: "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-500/25 dark:bg-orange-500/12 dark:text-orange-300",
      }
  }
}
