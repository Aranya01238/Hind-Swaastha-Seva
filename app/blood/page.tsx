"use client"

import { SiteHeader } from "@/components/site-header"
import BloodBanksList from "@/components/lists/bloodbanks-list"
import { Droplet, HeartPulse, ShieldCheck } from "lucide-react"

export default function BloodPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50/50">
      <SiteHeader />

      {/* Hero / Header Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-white border-b border-gray-100 overflow-hidden">
        {/* Subtle Background Pattern (Dots for organic/cell feel) */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        {/* Decorative elements: Red Glow */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-red-50/60 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/4 -translate-y-1/4" />

        <div className="mx-auto max-w-6xl space-y-6">
           {/* Trust Badge */}
           <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10 animate-fade-in-up">
             <HeartPulse className="w-3.5 h-3.5" />
             Verified Blood Banks & Donors
           </div>
           
           <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 animate-fade-in-up">
                Find Life-saving <span className="text-red-600 relative inline-block">
                  Blood Supplies
                  {/* Underline decoration */}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-600 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span> near you.
              </h1>
              <p className="text-lg text-muted-foreground text-balance animate-fade-in-up-1">
                Connect with nearby blood banks. View real-time stock availability loaded directly from our verified database.
              </p>
           </div>
        </div>
      </section>

      {/* Main List Section */}
      <section className="flex-1 p-6 md:p-10 animate-fade-in-up-2">
        <div className="mx-auto max-w-6xl">
           <div className="bg-transparent space-y-8">
             <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                <Droplet className="w-4 h-4 text-red-500" />
                Available Stock
             </div>
             
             {/* The List Component */}
             <BloodBanksList />
           </div>
        </div>
      </section>
    </main>
  )
}
