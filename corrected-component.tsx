import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Fingerprint, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Droplet, 
  BedDouble,
  ChevronRight,
  Clock, 
  Activity,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Bell,
  Heart,
  Download,
  ArrowRight,
  TrendingUp,
  Search,
  Menu
} from "lucide-react";

/**
 * HealthSave Navbar
 * Consistently uses "Alex Thompson" and the brand's red accent.
 */
const Navbar = () => {
  const MOCK_NAME = "Alex Thompson";
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-500/30">
            <Heart size={20} className="text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-slate-900">
            Health<span className="text-red-600">Save</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Consult Doctor', 'Find Beds', 'Blood Bank', 'Laboratories'].map((item) => (
            <button 
              key={item} 
              className="text-sm font-bold text-slate-500 hover:text-red-600 transition-all uppercase tracking-widest"
            >
              {item}
            </button>
          ))}
        </div>

        {/* User Session Info */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 hover:text-red-600 cursor-pointer transition-colors">
            <Bell size={20} />
          </div>
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-100">
            <div className="text-right">
              <p className="text-xs font-black text-slate-900 leading-none mb-1">{MOCK_NAME}</p>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Health ID: Verified</p>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 border border-red-100 font-bold uppercase">
              {MOCK_NAME.charAt(0)}
            </div>
          </div>
          <Menu className="md:hidden text-slate-600" />
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const MOCK_NAME = "Alex Thompson";
  const [user] = useState({
    name: MOCK_NAME,
    id: "HSS-7729-QR",
    email: "alex.t@healthcare.com",
    phone: "+91 98765 43210",
    joinDate: "October 2024"
  });

  const appointments = [
    { 
      id: 1, 
      doctor: "Dr. Sarah Jenkins", 
      specialty: "Cardiologist", 
      date: "Dec 28, 2025", 
      time: "10:30 AM", 
      status: "confirmed" 
    },
    { 
      id: 2, 
      doctor: "Dr. Mike Ross", 
      specialty: "General Physician", 
      date: "Jan 05, 2026", 
      time: "02:15 PM", 
      status: "pending" 
    },
  ];

  const labTests = [
    { 
      id: "L-102", 
      name: "Complete Blood Count", 
      date: "Dec 15", 
      result: "Normal", 
      status: "stable" 
    },
    { 
      id: "L-105", 
      name: "Lipid Profile", 
      date: "Dec 12", 
      result: "Borderline", 
      status: "warning" 
    },
    { 
      id: "L-109", 
      name: "Glucose Fasting", 
      date: "Nov 28", 
      result: "Normal", 
      status: "stable" 
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-50 selection:text-red-600">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed right-0 top-1/4 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Liquid Vein SVG Animation */}
      <div className="fixed top-1/2 left-0 w-full h-32 opacity-10 pointer-events-none -z-10">
        <svg viewBox="0 0 2000 200" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="bloodGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#ff4d4d" />
              <animateTransform 
                attributeName="gradientTransform" 
                type="translate" 
                from="0 0" 
                to="200 0" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </linearGradient>
          </defs>
          <path
            d="M 10 80 C 40 70, 70 110, 100 100 S 150 60, 180 90 C 210 120, 240 70, 270 110 S 300 150, 340 100 C 370 60, 400 120, 430 80 S 470 40, 510 100 C 540 130, 570 70, 600 90 S 640 60, 680 110 C 710 150, 740 70, 770 130 S 810 100, 850 60"
            fill="none"
            stroke="url(#bloodGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-50"
          />
        </svg>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* DASHBOARD HEADER */}
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-fade-in-up">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              HealthSecure Live
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Welcome, <span className="text-red-600 italic font-serif font-light underline decoration-red-200 underline-offset-8 decoration-4">{MOCK_NAME.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl">
              Track your recovery, manage appointments, and access your clinical reports with end-to-end encryption.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              <Download size={18} /> Download Health ID
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-red-600 transition-all shadow-sm">
              <Search size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: IDENTITY & QUICK ACTIONS */}
          <div className="lg:col-span-4 space-y-8 animate-fade-in-up delay-100">
            {/* PROFILE CARD */}
            <section className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600" />
              <div className="flex items-center gap-5 mb-8">
                <div className="h-16 w-16 rounded-3xl bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover:rotate-3 transition-transform">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{MOCK_NAME}</h2>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Verified Profile</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Fingerprint, label: "Unique Health ID", value: user.id },
                  { icon: Mail, label: "Registered Email", value: user.email },
                  { icon: Phone, label: "Emergency Contact", value: user.phone }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-red-200 hover:bg-white transition-all">
                    <item.icon size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-xs font-black text-slate-400 hover:text-red-600 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest">
                <LogOut size={14} /> Security Exit
              </button>
            </section>

            {/* BRANDED ACTION MODULES */}
            <div className="grid grid-cols-1 gap-4">
              <button className="group flex items-center justify-between p-7 bg-red-600 text-white rounded-[2rem] hover:bg-slate-900 transition-all duration-300 shadow-2xl shadow-red-500/30">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <Stethoscope size={24} />
                  </div>
                  <span className="font-black text-sm tracking-[0.2em] uppercase">Consult Doctor</span>
                </div>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center gap-3 p-7 bg-white border border-slate-100 rounded-[2rem] hover:border-red-500 transition-all shadow-sm group">
                  <BedDouble className="text-slate-200 group-hover:text-red-600 transition-colors" size={28} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-950 transition-colors">Find Beds</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-7 bg-white border border-slate-100 rounded-[2rem] hover:border-red-500 transition-all shadow-sm group">
                  <Droplet className="text-slate-200 group-hover:text-red-600 transition-colors" size={28} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-950 transition-colors">Blood Bank</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MEDICAL TIMELINE */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up delay-200">
            {/* UPCOMING SESSIONS */}
            <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-400">
                  <Calendar size={20} className="text-red-600" /> Scheduled Consultations
                </h3>
                <div className="h-[1px] flex-grow mx-8 bg-slate-100 hidden sm:block" />
                <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">Full History</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appointments.map((appt) => (
                  <div key={appt.id} className="relative p-8 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:border-red-200 hover:bg-white transition-all shadow-sm hover:shadow-2xl">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-red-50 transition-colors">
                        <Activity size={20} className="text-red-600" />
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border shadow-sm ${
                        appt.status === 'confirmed' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-1">{appt.doctor}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em] mb-8">{appt.specialty}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                      <div className="flex items-center gap-2 text-slate-700 font-black text-xs">
                        <Clock size={16} className="text-red-600" /> {appt.time}
                      </div>
                      <div className="text-xs font-black text-slate-950 uppercase tracking-widest">{appt.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* RECENT LAB REPORTS */}
            <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">Clinical Test Inventory</h3>
                <div className="h-[1px] flex-grow bg-slate-100" />
              </div>
              <div className="space-y-4">
                {labTests.map((test) => (
                  <div key={test.id} className="flex flex-col md:flex-row items-center justify-between p-8 border border-slate-100 rounded-[2rem] hover:bg-slate-50 hover:border-red-200 transition-all group">
                    <div className="flex items-center gap-6 flex-1 w-full mb-6 md:mb-0">
                      <div className={`p-5 rounded-2xl ${
                        test.status === 'stable' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-red-50 text-red-600'
                      } transition-colors group-hover:scale-105`}>
                        <FileText size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{test.id}</p>
                          <span className="h-1 w-1 rounded-full bg-slate-200" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{test.date}</p>
                        </div>
                        <h4 className="font-black text-slate-900 text-xl group-hover:text-red-600 transition-colors tracking-tight">{test.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-10 w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0 border-slate-100">
                      <div className="text-right flex-grow md:flex-grow-0">
                        <p className="text-[9px] font-black text-slate-300 uppercase mb-1 tracking-widest">Observation</p>
                        <div className={`flex items-center gap-2 justify-end font-black text-sm uppercase tracking-widest ${
                          test.status === 'stable' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {test.status === 'stable' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                          {test.result}
                        </div>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-300 group-hover:text-red-600 group-hover:border-red-200 transition-all cursor-pointer">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-5 bg-slate-950 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95">
                Access Medical Document Repository
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-slate-400 border-t border-slate-100 mt-10">
        <div className="flex items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">© 2025 HealthSave Security Cluster</p>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Encrypted Session: Active</p>
        </div>
        <div className="flex items-center gap-6">
          <TrendingUp size={16} className="text-red-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Platform Performance Optimal</span>
        </div>
      </footer>
    </div>
  );
}