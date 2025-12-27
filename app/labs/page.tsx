"use client"

import { SiteHeader } from "@/components/site-header"
import LabsList from "@/components/lists/labs-list"
import { ShieldCheck, Microscope, FlaskConical } from "lucide-react"

export default function LabsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50/50">
      <SiteHeader />

      {/* Hero / Header Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-white border-b border-gray-100 overflow-hidden">
        {/* Subtle Background Pattern (Hexagons for chemistry feel) */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-6xl space-y-6">
           {/* Trust Badge */}
           <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 animate-fade-in-up">
             <ShieldCheck className="w-3.5 h-3.5" />
             Certified Diagnostic Centers
           </div>
           
           <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 animate-fade-in-up">
                Reliable <span className="text-purple-600 relative inline-block">
                  Labs & Tests
                  {/* Underline decoration */}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-600 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span> near you.
              </h1>
              <p className="text-lg text-muted-foreground text-balance animate-fade-in-up-1">
                Access a network of accredited laboratories. Compare prices, check test availability, and book appointments instantly using live data.
              </p>
           </div>
        </div>
      </section>

      {/* Main List Section */}
      <section className="flex-1 p-6 md:p-10 animate-fade-in-up-2">
        <div className="mx-auto max-w-6xl">
           {/* Wrapper with shadow/bg for the list to pop */}
           <div className="bg-transparent space-y-8">
             <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                <FlaskConical className="w-4 h-4 text-purple-500" />
                Available Laboratories
             </div>
             
             {/* The List Component */}
             <LabsList />
           </div>
        </div>
      </section>
    </main>
  )
}
