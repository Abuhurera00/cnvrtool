import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

type DatePickerFieldProps = {
  placeholder: string
  value?: Date
  onChange: (value?: Date) => void
}

export function DatePickerField({
  placeholder,
  value,
  onChange,
}: DatePickerFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-11 w-full justify-between rounded-xl bg-white text-left font-normal dark:bg-slate-950"
        >
          {value ? format(value, "PPP") : placeholder}
          <CalendarIcon className="size-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout="dropdown"
          fromYear={1950}
          toYear={2035}
        />
      </PopoverContent>
    </Popover>
  )
}
