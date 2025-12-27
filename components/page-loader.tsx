"use client"

import { useEffect, useRef, useState } from "react"

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [showECG, setShowECG] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = "hidden"

    // 2. Timeline Sequence
    const sequence = async () => {
      // Allow the heartbeat/ECG animation to play for a moment (1.2s)
      await new Promise((r) => setTimeout(r, 1200))

      // Stop showing the ECG line just before we fly
      setShowECG(false)

      // Find the target in your Navbar
      const target = document.getElementById("site-logo")
      const logoGroup = logoRef.current
      const text = textRef.current

      // Fallback: If elements are missing, just fade out gracefully
      if (!logoGroup || !target) {
        if (containerRef.current) {
          containerRef.current.style.opacity = "0"
          containerRef.current.style.transition = "opacity 0.5s ease"
        }
        setTimeout(() => cleanup(), 500)
        return
      }

      // Calculate the Delta (Distance to fly)
      const targetRect = target.getBoundingClientRect()
      const startRect = logoGroup.getBoundingClientRect()

      const dx = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2)
      const dy = targetRect.top + targetRect.height / 2 - (startRect.top + startRect.height / 2)

      // Apply the "Fly" Animation
      // Using a slightly elastic bezier for a premium feel
      logoGroup.style.transition = "transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)" 
      logoGroup.style.transform = `translate(${dx}px, ${dy}px) scale(0.45)` // Adjusted scale to match typical navbar logo size

      // Fade out the text and background
      if (text) {
        text.style.transition = "opacity 300ms ease, transform 300ms ease"
        text.style.opacity = "0"
        text.style.transform = "translateY(10px)"
      }
      
      if (containerRef.current) {
        // Keep container visible but clear background so we see the logo fly over the site
        containerRef.current.style.backgroundColor = "transparent"
        containerRef.current.style.backdropFilter = "none"
        // Wait for fly animation to finish
        setTimeout(() => cleanup(), 800)
      }
    }

    sequence()

    function cleanup() {
      setVisible(false)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md transition-colors duration-500"
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* The Flying Group (Logo + Wrapper) */}
        <div ref={logoRef} className="relative z-20 flex flex-col items-center justify-center">
          
          {/* Glowing Backlight */}
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse-slow" />

          {/* Logo Image */}
          <div className="relative size-24 md:size-32 drop-shadow-2xl">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png"
              alt="HSS Logo"
              className="size-full object-contain animate-heartbeat"
            />
          </div>
        </div>

        {/* ECG Line Animation (Disappears before flight) */}
        <div 
          className={`relative h-16 w-64 md:w-80 mt-4 overflow-hidden transition-opacity duration-300 ${showECG ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg
            viewBox="0 0 500 100"
            className="absolute left-0 top-0 h-full w-full stroke-[var(--brand-primary)] stroke-[3px] fill-none"
          >
            {/* The ECG Path */}
            <path
              d="M0 50 H100 L120 20 L140 80 L160 50 H200 L220 20 L240 80 L260 50 H500"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-ecg"
            />
          </svg>
          {/* Fading masks for the line ends */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        </div>

        {/* Text Label */}
        <div 
          ref={textRef} 
          className="absolute -bottom-12 text-2xl font-bold tracking-widest text-[var(--brand-primary)]"
        >
          HSS
        </div>
      </div>
    </div>
  )
}
