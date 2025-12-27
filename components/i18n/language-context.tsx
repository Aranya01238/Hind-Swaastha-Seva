"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { translations, type LangCode } from "./translations"

type LanguageContextValue = {
  lang: LangCode
  setLang: (l: LangCode) => void
  t: (key: string) => string
  list: {
    categories: string[]
  }
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "hss_lang"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as LangCode | null) : null
    const allowed = ["en", "hi", "bn", "mr", "gu", "ta"] as const
    if (stored && (allowed as readonly string[]).includes(stored)) {
      setLangState(stored as LangCode)
    }
  }, [])

  const setLang = (l: LangCode) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }

  const value = useMemo<LanguageContextValue>(() => {
    const dict = translations[lang]
    return {
      lang,
      setLang,
      t: (key) => dict[key] ?? key,
      list: {
        categories: dict.categories ?? [],
      },
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
