"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "./i18n/language-context"
import { MapPin, ArrowUpRight, ShieldCheck, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

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
  bookHref,
}: {
  item: HealthcareItem
  bookHref?: string
}) {
  const { t } = useLanguage()
  const mapHref = item.lat && item.lng ? `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}` : "#"

  return (
    <Card className="group relative overflow-hidden border-0 bg-white dark:bg-slate-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 rounded-[24px]">
      {/* Image Section with Glass Tier Badge */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={`/placeholder.svg?height=400&width=600&query=modern%20medical%20building`}
          alt={item.name}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Tier Badge - Floating Glassmorphism */}
        {item.tier && (
          <div className="absolute top-3 left-3">
            <Badge 
              className={cn(
                "backdrop-blur-md border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg",
                item.tier === "Premier" 
                  ? "bg-amber-500/80 text-white" 
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white"
              )}
            >
              {item.tier === "Premier" && <ShieldCheck className="size-3 mr-1 inline" />}
              {item.tier}
            </Badge>
          </div>
        )}

        {/* Distance Overlay */}
        {typeof item.distanceKm === "number" && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
              <MapPin className="size-3 text-emerald-400" />
              {item.distanceKm.toFixed(1)} km
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Title & Category Area */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-[var(--brand-primary)] transition-colors duration-300">
              {item.name}
            </h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Verified Healthcare Partner
            </p>
          </div>

          {/* Action Buttons: Classy Minimalist */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              asChild
              className="rounded-xl h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-semibold text-xs gap-2"
            >
              <a href={mapHref} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-3.5 text-slate-400" />
                {t("show_map") || "Directions"}
              </a>
            </Button>

            {bookHref ? (
              <Button 
                asChild 
                className="rounded-xl h-11 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[var(--brand-primary)] dark:hover:bg-[var(--brand-primary)] dark:hover:text-white transition-all duration-500 shadow-md font-bold text-xs gap-2"
              >
                <Link href={bookHref}>
                  Book Now
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            ) : (
              <Button 
                disabled
                className="rounded-xl h-11 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs"
              >
                Unavailable
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {/* Decorative Border Glow on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--brand-primary)]/10 rounded-[24px] pointer-events-none transition-colors duration-500" />
    </Card>
  )
}