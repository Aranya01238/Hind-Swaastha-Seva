"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Menu,
  Home,
  MessageCircle,
  Stethoscope,
  Microscope,
  BedDouble,
  Droplet,
  List,
  UserCog,
  Users,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/components/i18n/language-context";
import { LanguageSelect } from "@/components/language-select";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

// Safe Auth0 hook
function useAuth0Safe() {
  try {
    const { useUser } = require('@auth0/nextjs-auth0/client');
    return useUser();
  } catch (error) {
    return { user: null, error: null, isLoading: false };
  }
}

export function SiteHeader() {
  const { t } = useLanguage();
  const { user } = useAuth0Safe();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavLinkClass = (path: string) =>
    cn(
      "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
      isClient && pathname === path
        ? "text-[var(--brand-primary)] bg-[var(--brand-primary)]/[0.08] shadow-[inset_0_0_0_1px_rgba(var(--brand-primary-rgb),0.1)]"
        : "text-muted-foreground hover:text-foreground hover:bg-gray-100/50"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4",
        isClient && isScrolled
          ? "py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        
        {/* --- Logo Section --- */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" id="site-logo">
          <div className="relative size-10 overflow-hidden rounded-xl shadow-md transition-all duration-500 group-hover:shadow-[var(--brand-primary)]/20 group-hover:scale-105 group-hover:rotate-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png"
              alt="HSS Logo"
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="hidden sm:block font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-blue-600">
              {t("app_name") || "HSS"}
            </span>
            <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
              Health Services
            </span>
          </div>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-white/40 dark:bg-black/20 p-1.5 rounded-full border border-gray-200/50 dark:border-white/10 backdrop-blur-md shadow-sm">
          <Link href="/">
            <Button variant="ghost" className={getNavLinkClass("/")}>
              <Home className="size-4" />
              <span>Home</span>
            </Button>
          </Link>
          
          <Link href="/chat">
            <Button variant="ghost" className={cn(getNavLinkClass("/chat"), "group/chat")}>
              <MessageCircle className="size-4 text-emerald-500 group-hover/chat:animate-pulse" />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t("nav_doctor") || "AI Doctor"}
              </span>
            </Button>
          </Link>

          <div className="w-px h-5 bg-gray-200/60 dark:bg-white/10 mx-2" />

          <Link href="/doctors"><Button variant="ghost" className={getNavLinkClass("/doctors")}><Stethoscope className="size-4 text-blue-500" /> Doctors</Button></Link>
          <Link href="/labs"><Button variant="ghost" className={getNavLinkClass("/labs")}><Microscope className="size-4 text-purple-500" /> Labs</Button></Link>
          <Link href="/beds"><Button variant="ghost" className={getNavLinkClass("/beds")}><BedDouble className="size-4 text-indigo-500" /> Beds</Button></Link>
          <Link href="/blood"><Button variant="ghost" className={getNavLinkClass("/blood")}><Droplet className="size-4 text-red-500" /> Blood</Button></Link>
        </nav>

        {/* --- Right Actions --- */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-white/5 p-1 rounded-full border border-gray-200/50">
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="rounded-full pl-1 pr-3 gap-2 h-8 hover:bg-white dark:hover:bg-slate-900 transition-all">
                  {user.picture ? (
                    <img src={user.picture} alt="User" className="size-6 rounded-full ring-2 ring-[var(--brand-primary)]/20" />
                  ) : (
                    <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white"><User size={12} /></div>
                  )}
                  <span className="hidden md:inline font-semibold text-xs">{user.name?.split(' ')[0]}</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.location.href = '/api/auth/logout?returnTo=' + encodeURIComponent(window.location.origin + '/portals')}
                className="size-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut size={14} />
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button variant="default" size="sm" className="rounded-full px-5 font-bold shadow-lg shadow-[var(--brand-primary)]/20 bg-[var(--brand-primary)] hover:brightness-110 transition-all">
                Login
              </Button>
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-1.5 border-l border-gray-200 dark:border-white/10 ml-1 pl-3">
            <LanguageSelect />
            <ThemeToggle />
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-200/50 size-10">
                <Menu className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-[32px]">
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader className="pt-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 shadow-sm">
                      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png" alt="Logo" className="size-10" />
                    </div>
                    <DrawerTitle className="text-xl font-bold tracking-tight text-foreground">Navigation</DrawerTitle>
                  </div>
                </DrawerHeader>

                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { href: "/chat", icon: MessageCircle, color: "text-emerald-500", label: "AI Doctor" },
                      { href: "/doctors", icon: Stethoscope, color: "text-blue-500", label: "Doctors" },
                      { href: "/labs", icon: Microscope, color: "text-purple-500", label: "Labs" },
                      { href: "/beds", icon: BedDouble, color: "text-indigo-500", label: "Beds" },
                      { href: "/blood", icon: Droplet, color: "text-red-500", label: "Blood" },
                      { href: "/list-centre", icon: List, color: "text-orange-500", label: "Centers" },
                    ].map((item) => (
                      <DrawerClose key={item.href} asChild>
                        <Link href={item.href}>
                          <div className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 transition-colors border border-gray-100 dark:border-white/5 group">
                            <item.icon className={cn("size-5", item.color)} />
                            <span className="font-semibold text-sm">{item.label}</span>
                          </div>
                        </Link>
                      </DrawerClose>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Staff Access</p>
                    <div className="grid gap-2">
                       <DrawerClose asChild>
                        <Link href="/supervisor/login">
                          <Button variant="outline" className="w-full justify-between rounded-xl h-12 px-4 border-dashed">
                            <div className="flex items-center gap-3"><UserCog className="size-4" /> <span>Supervisor Login</span></div>
                            <ChevronRight size={14} className="text-muted-foreground" />
                          </Button>
                        </Link>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Link href="/receptionist/login">
                          <Button variant="outline" className="w-full justify-between rounded-xl h-12 px-4 border-dashed">
                            <div className="flex items-center gap-3"><Users className="size-4" /> <span>Receptionist Login</span></div>
                            <ChevronRight size={14} className="text-muted-foreground" />
                          </Button>
                        </Link>
                      </DrawerClose>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    <LanguageSelect />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}