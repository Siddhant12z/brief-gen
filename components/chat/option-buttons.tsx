"use client"

import { Button } from "@/components/ui/button"

interface OptionButtonsProps {
  options: Array<{ id: string; label: string }>
  onSelect: (optionId: string) => void
}

export function OptionButtons({ options, onSelect }: OptionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2" suppressHydrationWarning>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="bg-purple-950/30 border-purple-500/30 text-white hover:bg-purple-800/40"
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

