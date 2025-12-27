"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "./i18n/language-context"
import { useMemo, useRef } from "react"

export function CategoryChips({
  selected = "All Types",
  onSelect,
  extras,
}: { selected?: string; onSelect?: (c: string) => void; extras?: string[] }) {
  const { list } = useLanguage()
  const cats = list.categories
  const allLabel = "All Types"
  const chips = useMemo(() => [allLabel, ...(extras ?? []), ...cats], [cats, extras])
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([])

  function focusIndex(idx: number) {
    const el = btnRefs.current[idx]
    if (el) el.focus()
  }

  return (
    <div
      className="flex gap-2 overflow-x-auto no-scrollbar"
      role="tablist"
      aria-label="Filter by category"
      onKeyDown={(e) => {
        const currentIndex = chips.findIndex((c) => c === selected)
        if (e.key === "ArrowRight") {
          e.preventDefault()
          const next = (currentIndex + 1) % chips.length
          onSelect?.(chips[next])
          requestAnimationFrame(() => focusIndex(next))
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          const prev = (currentIndex - 1 + chips.length) % chips.length
          onSelect?.(chips[prev])
          requestAnimationFrame(() => focusIndex(prev))
        } else if (e.key === "Home") {
          e.preventDefault()
          onSelect?.(chips[0])
          requestAnimationFrame(() => focusIndex(0))
        } else if (e.key === "End") {
          e.preventDefault()
          onSelect?.(chips[chips.length - 1])
          requestAnimationFrame(() => focusIndex(chips.length - 1))
        }
      }}
    >
      {chips.map((c, idx) => {
        const sel = c === selected
        return (
          <button
            key={c + idx}
            ref={el => { btnRefs.current[idx] = el }} // <-- Use block body, returns void
            onClick={() => onSelect?.(c)}
            role="tab"
            aria-selected={sel}
            tabIndex={sel ? 0 : -1}
            className={cn(
              "px-3 py-1 text-sm rounded-pill border transition-all duration-300 ease-in-out whitespace-nowrap",
              sel
                ? "bg-[var(--brand-primary)] text-white border-transparent"
                : "hover:bg-[var(--brand-primary)] hover:text-white border-[var(--brand-primary)] text-foreground",
            )}
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
