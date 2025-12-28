"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useLanguage } from "./i18n/language-context"
import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"

export function LanguageSelect() {
  const { lang, setLang, t } = useLanguage()

  // Helper to get the 2-letter code display
  const currentDisplay = lang.toUpperCase()

  return (
    <div className="flex items-center">
      <span className="sr-only">{t("language_label")}</span>
      <Select value={lang} onValueChange={(v) => setLang(v as any)}>
        <SelectTrigger
          className={cn(
            "flex items-center gap-2 h-9 px-3 rounded-full border border-gray-200/50 bg-white/50 dark:bg-white/5 dark:border-white/10",
            "hover:bg-white dark:hover:bg-white/10 transition-all duration-200 shadow-sm focus:ring-0 focus:ring-offset-0 outline-none"
          )}
        >
          <Languages className="size-3.5 text-[var(--brand-primary)]" />
          <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            {currentDisplay}
          </span>
        </SelectTrigger>
        
        <SelectContent align="end" className="rounded-2xl p-1 border-gray-200/50 dark:border-white/10 backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 shadow-2xl">
          <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            Select Language
          </div>
          <SelectItem value="en" className="rounded-lg focus:bg-[var(--brand-primary)]/10 focus:text-[var(--brand-primary)] cursor-pointer">
            <span className="flex items-center gap-2 font-medium">🇺🇸 English</span>
          </SelectItem>
          <SelectItem value="hi" className="rounded-lg focus:bg-[var(--brand-primary)]/10 focus:text-[var(--brand-primary)] cursor-pointer">
            <span className="flex items-center gap-2 font-medium">🇮🇳 हिन्दी</span>
          </SelectItem>
          <SelectItem value="bn" className="rounded-lg focus:bg-[var(--brand-primary)]/10 focus:text-[var(--brand-primary)] cursor-pointer">
            <span className="flex items-center gap-2 font-medium">🇮🇳 বাংলা</span>
          </SelectItem>
          <SelectItem value="mr" className="rounded-lg focus:bg-[var(--brand-primary)]/10 focus:text-[var(--brand-primary)] cursor-pointer">
            <span className="flex items-center gap-2 font-medium">🇮🇳 मराठी</span>
          </SelectItem>
          <SelectItem value="gu" className="rounded-lg focus:bg-[var(--brand-primary)]/10 focus:text-[var(--brand-primary)] cursor-pointer">
            <span className="flex items-center gap-2 font-medium">🇮🇳 ગુજરાતી</span>
          </SelectItem>
          <SelectItem value="ta" className="rounded-lg focus:bg-[var(--brand-primary)]/10 focus:text-[var(--brand-primary)] cursor-pointer">
            <span className="flex items-center gap-2 font-medium">🇮🇳 தமிழ்</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}