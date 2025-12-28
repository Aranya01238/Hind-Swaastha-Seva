"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [isFlying, setIsFlying] = useState(false)
  
  const containerRef = useRef<HTMLDivElement | null>(null)
  const logoGroupRef = useRef<HTMLDivElement | null>(null)
  const uiElementsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const sequence = async () => {
      // 1. Initial dwell time to appreciate the heartbeat
      await new Promise((r) => setTimeout(r, 1600))

      const target = document.getElementById("site-logo")
      const logoGroup = logoGroupRef.current
      const uiElements = uiElementsRef.current

      if (!logoGroup || !target || !containerRef.current) {
        cleanup()
        return
      }

      // 2. Start Flight
      setIsFlying(true)
      
      const targetRect = target.getBoundingClientRect()
      const startRect = logoGroup.getBoundingClientRect()

      // Calculate center-to-center delta
      const dx = (targetRect.left + targetRect.width / 2) - (startRect.left + startRect.width / 2)
      const dy = (targetRect.top + targetRect.height / 2) - (startRect.top + startRect.height / 2)

      // 3. Execute Premium Animation
      // We use a complex cubic-bezier for a "snap-into-place" feel
      logoGroup.style.transition = "all 900ms cubic-bezier(0.16, 1, 0.3, 1)"
      logoGroup.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`
      
      if (uiElements) {
        uiElements.style.transition = "all 400ms ease"
        uiElements.style.opacity = "0"
        uiElements.style.transform = "scale(0.9) translateY(20px)"
      }

      containerRef.current.style.transition = "background-color 600ms ease, backdrop-filter 600ms ease"
      containerRef.current.style.backgroundColor = "transparent"
      containerRef.current.style.backdropFilter = "blur(0px)"

      setTimeout(() => cleanup(), 900)
    }

    sequence()

    function cleanup() {
      setVisible(false)
      document.body.style.overflow = "unset"
    }

    return () => { document.body.style.overflow = "unset" }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950"
    >
      {/* Dynamic Mesh Gradient Background - adds premium depth */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        isFlying ? "opacity-0" : "opacity-100"
      )}>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* --- The Flying Group --- */}
        <div ref={logoGroupRef} className="relative z-20 group">
          {/* Enhanced Aura Glow */}
          <div className={cn(
            "absolute inset-[-20px] rounded-full bg-gradient-to-tr from-[var(--brand-primary)] to-blue-500 opacity-20 blur-2xl transition-all duration-700",
            isFlying ? "scale-50 opacity-0" : "animate-pulse"
          )} />
          
          <div className="relative size-32 md:size-40 select-none">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png"
              alt="HSS Logo"
              className={cn(
                "size-full object-contain drop-shadow-[0_0_25px_rgba(var(--brand-primary-rgb),0.3)]",
                !isFlying && "animate-[heartbeat_1.5s_ease-in-out_infinite]"
              )}
            />
          </div>
        </div>

        {/* --- UI Elements (These fade out) --- */}
        <div ref={uiElementsRef} className="flex flex-col items-center mt-12 space-y-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-black tracking-[0.3em] text-[var(--brand-primary)] drop-shadow-sm">
              HSS
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/60 mt-2">
              Health Service Systems
            </p>
          </div>

          {/* Cinematic ECG Line */}
          <div className="relative h-12 w-48 overflow-hidden">
            <svg
              viewBox="0 0 200 60"
              className="absolute inset-0 h-full w-full stroke-[var(--brand-primary)] stroke-[2px] fill-none"
            >
              <path
                d="M0 30 L60 30 L70 10 L80 50 L90 30 L110 30 L120 15 L130 45 L140 30 L200 30"
                strokeDasharray="400"
                strokeDashoffset="400"
                strokeLinecap="round"
                className="animate-[draw-ecg_2s_ease-in-out_infinite]"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 dark:from-slate-950 dark:to-slate-950" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          15% { transform: scale(1.12); filter: brightness(1.1); }
          30% { transform: scale(1); filter: brightness(1); }
          45% { transform: scale(1.08); filter: brightness(1.05); }
        }
        @keyframes draw-ecg {
          0% { stroke-dashoffset: 400; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </div>
  )
}