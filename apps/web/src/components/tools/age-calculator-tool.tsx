import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { calculateAgeParts, formatNumber } from "@/lib/tool-utils"

export function AgeCalculatorTool() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date("1998-06-15")
  )
  const birthDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  const age = calculateAgeParts(birthDate)

  return (
    <ToolPageShell
      badge="Calculator Tool"
      title="Age Calculator"
      description="Calculate exact age in years, months, days, and total days with a clean single-purpose tool page."
    >
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="cnvr-soft-panel">
          <p className="mb-3 text-sm font-semibold text-slate-900">Birth date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-11 w-full justify-between rounded-xl bg-white text-left font-normal dark:bg-slate-950"
              >
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                <CalendarIcon className="size-4 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                captionLayout="dropdown"
                fromYear={1950}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Years</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {age ? age.years : "--"}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Months</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {age ? age.months : "--"}
            </p>
          </div>
          <div className="cnvr-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Days</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {age ? age.days : "--"}
            </p>
          </div>
        </div>
      </div>

      <div className="cnvr-output-panel p-6">
        <p className="text-sm font-semibold">Summary</p>
        <p className="mt-3 text-base leading-7 text-slate-300">
          {age
            ? `${age.years} years, ${age.months} months, and ${age.days} days old. Total days lived: ${formatNumber(age.totalDays)}.`
            : "Choose a valid birth date to see the result."}
        </p>
      </div>
    </ToolPageShell>
  )
}
