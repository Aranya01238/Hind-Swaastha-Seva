"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useLanguage } from "./i18n/language-context"
import { Label } from "@/components/ui/label"

export function SearchSection({
  onSearch,
}: { onSearch?: (q: { centre?: string; date?: string; type?: string; hospitalType?: string }) => void }) {
  const [centre, setCentre] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")
  const [hospitalType, setHospitalType] = useState("")
  const { t } = useLanguage()

  return (
    <Card className="bg-white shadow-lg rounded-xl transition-shadow duration-500 ease-in-out hover:shadow-xl">
      <form
        role="search"
        aria-label="Search healthcare centres"
        className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch?.({ centre, date, type, hospitalType })
        }}
      >
        <div className="flex flex-col">
          <Label htmlFor="centre" className="sr-only">
            Search nearby centre
          </Label>
          <Input
            id="centre"
            name="centre"
            placeholder={t("search_nearby_centre")}
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            aria-label={t("search_nearby_centre")}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="date" className="sr-only">
            {t("search_date")}
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            placeholder={t("search_date")}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label={t("search_date")}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="apptType" className="sr-only">
            {t("search_appt_type")}
          </Label>
          <Input
            id="apptType"
            name="type"
            placeholder={t("search_appt_type")}
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label={t("search_appt_type")}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="hospitalType" className="sr-only">
            {t("search_hospital_type")}
          </Label>
          <Input
            id="hospitalType"
            name="hospitalType"
            placeholder={t("search_hospital_type")}
            value={hospitalType}
            onChange={(e) => setHospitalType(e.target.value)}
            aria-label={t("search_hospital_type")}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          className="bg-brand-gradient text-white hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out rounded-pill"
        >
          {t("search_button")}
        </Button>
      </form>
    </Card>
  )
}
