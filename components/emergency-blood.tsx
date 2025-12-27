"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./i18n/language-context"

export function EmergencyAndBloodCTA({
  onBed,
  onBlood,
}: {
  onBed?: () => void
  onBlood?: () => void
}) {
  const { t } = useLanguage()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-brand-soft border border-brand hover:scale-105 transition-transform duration-500 ease-in-out">
        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold">{t("bed_card_title")}</h3>
          <Button
            onClick={onBed}
            className="bg-[var(--brand-primary)] text-white rounded-pill hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            {t("bed_card_cta")}
          </Button>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border border-[var(--brand-accent)] hover:shadow-md transition-shadow duration-500 ease-out">
        <div className="absolute top-2 right-3 bg-red-600 rounded-full w-2 h-4 animate-drip" aria-hidden />
        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold">{t("blood_card_title")}</h3>
          <Button
            onClick={onBlood}
            className="bg-[var(--brand-accent)] text-white rounded-pill hover:shadow-lg transition-all duration-300 ease-in"
          >
            {t("blood_card_cta")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
