"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "./i18n/language-context"

export function LanguageSelect() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="flex items-center gap-4">
      <span className="sr-only">{t("language_label")}</span>
      <Select value={lang} onValueChange={(v) => setLang(v as any)}>
        <SelectTrigger
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg bg-transparent border-0 shadow-none focus:ring-0 focus:outline-none hover:bg-transparent active:bg-transparent"
        >
          🌐
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">EN — English</SelectItem>
          <SelectItem value="hi">HI — हिन्दी</SelectItem>
          <SelectItem value="bn">BN — বাংলা</SelectItem>
          <SelectItem value="mr">MR — मराठी</SelectItem>
          <SelectItem value="gu">GU — ગુજરાતી</SelectItem>
          <SelectItem value="ta">TA — தமிழ்</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
