"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export function PanelHeader({ title }: { title: string }) {
  return (
    <header className="w-full flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png"
          alt="HSS logo"
          className="h-7 w-7 animate-beat"
        />
        <h1 className="font-bold text-xl text-[var(--brand-primary)] text-balance">{title}</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}
