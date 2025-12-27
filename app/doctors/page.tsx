"use client"

import { SiteHeader } from "@/components/site-header"
import DoctorsList from "@/components/lists/doctors-list"
import { ShieldCheck, Stethoscope } from "lucide-react"

export default function DoctorsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50/50">
      <SiteHeader />
      
      {/* Hero / Header Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-white border-b border-gray-100 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        <div className="mx-auto max-w-6xl space-y-6">
           {/* Trust Badge */}
           <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 animate-fade-in-up">
             <ShieldCheck className="w-3.5 h-3.5" />
             Verified Medical Specialists
           </div>
           
           <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 animate-fade-in-up">
                Find the right <span className="text-[var(--brand-primary)] relative inline-block">
                  Doctor
                  {/* Underline decoration */}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--brand-primary)] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span> for your needs.
              </h1>
              <p className="text-lg text-muted-foreground text-balance animate-fade-in-up-1">
                Browse our directory of top-rated healthcare professionals. Filter by specialty, check availability, and book appointments instantly.
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
                <Stethoscope className="w-4 h-4" />
                Available Physicians
             </div>
             
             {/* The List Component */}
             <DoctorsList />
           </div>
        </div>
      </section>
    </main>
  )
}
