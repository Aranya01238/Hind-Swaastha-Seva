"use client"

import { Button } from "@/components/ui/button"

export function EmptyState({
  title = "No results",
  description = "Try adjusting your search or filters.",
  onReset,
}: {
  title?: string
  description?: string
  onReset?: () => void
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center text-center gap-2 p-8 border border-dashed rounded-lg"
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {onReset ? (
        <Button
          onClick={onReset}
          className="mt-2 rounded-pill bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-accent)]"
        >
          Reset filters
        </Button>
      ) : null}
    </div>
  )
}

export const Empty = EmptyState
export default EmptyState
