const dictionary = new Set([
  "a",
  "about",
  "ad",
  "age",
  "all",
  "analytics",
  "and",
  "api",
  "article",
  "builder",
  "campaign",
  "can",
  "capitalize",
  "checker",
  "cnvr",
  "code",
  "content",
  "convert",
  "copy",
  "description",
  "discount",
  "event",
  "faq",
  "faster",
  "for",
  "generator",
  "helps",
  "hex",
  "html",
  "image",
  "images",
  "in",
  "is",
  "job",
  "jpeg",
  "json",
  "launch",
  "letter",
  "marketing",
  "meta",
  "movie",
  "online",
  "open",
  "page",
  "paypal",
  "png",
  "posting",
  "product",
  "qr",
  "resize",
  "schema",
  "seo",
  "site",
  "sitemap",
  "social",
  "spelling",
  "tag",
  "teams",
  "text",
  "tool",
  "tools",
  "utm",
  "utilities",
  "utility",
  "web",
  "website",
  "with",
  "word",
  "work",
  "workflows",
])

function distance(left: string, right: string) {
  const grid = Array.from({ length: left.length + 1 }, () =>
    new Array<number>(right.length + 1).fill(0)
  )

  for (let row = 0; row <= left.length; row += 1) {
    grid[row][0] = row
  }

  for (let column = 0; column <= right.length; column += 1) {
    grid[0][column] = column
  }

  for (let row = 1; row <= left.length; row += 1) {
    for (let column = 1; column <= right.length; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1

      grid[row][column] = Math.min(
        grid[row - 1][column] + 1,
        grid[row][column - 1] + 1,
        grid[row - 1][column - 1] + cost
      )
    }
  }

  return grid[left.length][right.length]
}

function suggestionFor(word: string) {
  let suggestion: string | null = null
  let bestDistance = Number.POSITIVE_INFINITY

  for (const candidate of dictionary) {
    const currentDistance = distance(word, candidate)
    if (currentDistance < bestDistance) {
      bestDistance = currentDistance
      suggestion = candidate
    }
  }

  return bestDistance <= 3 ? suggestion : null
}

export function checkSpelling(text: string) {
  const tokens = text.toLowerCase().match(/[a-z']+/g) ?? []
  const unique = [...new Set(tokens)]

  return unique
    .filter((word) => !dictionary.has(word))
    .map((word) => ({
      word,
      suggestion: suggestionFor(word),
    }))
}
