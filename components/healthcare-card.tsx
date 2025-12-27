"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link" // add Link for booking navigation
import { useLanguage } from "./i18n/language-context"

export type HealthcareItem = {
  id: string
  name: string
  lat?: number
  lng?: number
  tier?: "Premier" | "Standard"
  distanceKm?: number
}

export function HealthcareCard({
  item,
  bookHref, // optional booking link
}: {
  item: HealthcareItem
  bookHref?: string
}) {
  const { t } = useLanguage()
  const mapHref = item.lat && item.lng ? `https://www.google.com/maps?q=${item.lat},${item.lng}` : "#"
  return (
    <Card className="hover:shadow-xl hover:scale-105 transition-all duration-500 ease-in-out">
      <div className="overflow-hidden rounded-t-xl">
        <Image
          src={`/placeholder.svg?height=160&width=600&query=hospital%20exterior%20photo`}
          alt={`Photo of ${item.name}`}
          width={600}
          height={160}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        {item.tier && <Badge className="rounded-pill">{item.tier}</Badge>}
        <h3 className="font-semibold text-pretty">{item.name}</h3>
        {typeof item.distanceKm === "number" && (
          <p className="text-sm text-muted-foreground">{item.distanceKm.toFixed(1)} km away</p>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            asChild
            className="rounded-pill hover:bg-[var(--brand-primary)] hover:text-white transition-all duration-300 ease-out bg-transparent"
          >
            <a href={mapHref} target="_blank" rel="noopener noreferrer" aria-label={`Open map for ${item.name}`}>
              {t("show_map")}
            </a>
          </Button>

          {bookHref ? (
            <Button asChild className="rounded-pill">
              <Link href={bookHref} aria-label={`Book ${item.name}`}>
                Book Now
              </Link>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
