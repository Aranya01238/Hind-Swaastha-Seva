"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { useLanguage } from "./i18n/language-context"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = (theme ?? resolvedTheme) === "dark"

  return (
    <label className="flex items-center gap-2 px-2 py-1 rounded-pill border">
      <span className="text-sm">{t("theme_label")}</span>
      <Switch checked={isDark} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} aria-label={t("theme_label")} />
    </label>
  )
}
