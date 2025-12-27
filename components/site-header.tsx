"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Menu,
  Home,
  MessageCircle, // Imported for the chat/doctor link
  Stethoscope,
  Microscope,
  BedDouble,
  Droplet,
  List,
  UserCog,
  Users,
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

export function SiteHeader() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const pathname = usePathname();

  // Handle client-side hydration
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll effect
  React.useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Helper for active link styles - only apply active styles after hydration
  const getNavLinkClass = (path: string) =>
    cn(
      "gap-1.5 px-3 py-1 text-xs font-medium transition-all duration-200 rounded-full hover:-translate-y-0.5",
      isClient && pathname === path
        ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-2",
        isClient && isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* --- Logo Section --- */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          id="site-logo" // Critical for PageLoader flight path
        >
          <div className="relative size-8 md:size-9 overflow-hidden rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png"
              alt="HSS Logo"
              className="size-full object-cover animate-beat"
            />
          </div>
          <span className="hidden sm:block font-bold text-lg md:text-xl tracking-tight text-[var(--brand-primary)]">
            {t("app_name") || "HSS"}
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100/50 backdrop-blur-sm">
          <Link href="/">
            <Button variant="ghost" size="sm" className={getNavLinkClass("/")}>
              <Home className="size-3.5" />
              Home
            </Button>
          </Link>
          {/* Added Doctor/Chat Link */}
          <Link href="/chat">
            <Button
              variant="ghost"
              size="sm"
              className={getNavLinkClass("/chat")}
            >
              <MessageCircle className="size-3.5" />
              {t("nav_doctor") || "AI Doctor"}
            </Button>
          </Link>
          <div className="w-px h-4 bg-gray-200 mx-1" /> {/* Divider */}
          <Link href="/doctors">
            <Button
              variant="ghost"
              size="sm"
              className={getNavLinkClass("/doctors")}
            >
              <Stethoscope className="size-3.5" />
              Doctors
            </Button>
          </Link>
          <Link href="/labs">
            <Button
              variant="ghost"
              size="sm"
              className={getNavLinkClass("/labs")}
            >
              <Microscope className="size-3.5" />
              {t("nav_labs") || "Labs"}
            </Button>
          </Link>
          <Link href="/beds">
            <Button
              variant="ghost"
              size="sm"
              className={getNavLinkClass("/beds")}
            >
              <BedDouble className="size-3.5" />
              {t("nav_beds") || "Beds"}
            </Button>
          </Link>
          <Link href="/blood">
            <Button
              variant="ghost"
              size="sm"
              className={getNavLinkClass("/blood")}
            >
              <Droplet className="size-3.5" />
              {t("nav_blood") || "Blood"}
            </Button>
          </Link>
        </nav>

        {/* --- Right Actions --- */}
        <div className="flex items-center gap-2">
          {/* Staff Login (Desktop Only) */}

          <div className="hidden sm:flex items-center gap-1">
            <LanguageSelect />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Trigger */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden shrink-0"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="border-b pb-4">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D57HLyHhfadPJg6ab9axgzG1dJPXKK.png"
                      alt="Logo"
                      className="size-8 animate-beat"
                    />
                    <DrawerTitle className="text-[var(--brand-primary)] font-bold">
                      Menu
                    </DrawerTitle>
                  </div>
                </DrawerHeader>

                <div className="p-4 space-y-6">
                  {/* Main Routes */}
                  <div className="grid gap-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2 mb-1">
                      Services
                    </p>

                    {/* Added Chat Link to Mobile Menu */}
                    <DrawerClose asChild>
                      <Link href="/chat">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-base"
                        >
                          <MessageCircle className="size-4 text-green-600" />
                          {t("nav_doctor") || "AI Doctor"}
                        </Button>
                      </Link>
                    </DrawerClose>

                    <DrawerClose asChild>
                      <Link href="/doctors">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-base"
                        >
                          <Stethoscope className="size-4 text-[var(--brand-primary)]" />
                          Doctors
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link href="/labs">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-base"
                        >
                          <Microscope className="size-4 text-purple-500" />
                          {t("nav_labs") || "Labs"}
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link href="/beds">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-base"
                        >
                          <BedDouble className="size-4 text-blue-500" />
                          {t("nav_beds") || "Beds"}
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link href="/blood">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-base"
                        >
                          <Droplet className="size-4 text-red-500" />
                          {t("nav_blood") || "Blood Bank"}
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link href="/list-centre">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-base"
                        >
                          <List className="size-4 text-orange-500" />
                          {t("nav_list") || "List Centre"}
                        </Button>
                      </Link>
                    </DrawerClose>
                  </div>

                  {/* Staff Routes */}
                  <div className="grid gap-2 border-t pt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2 mb-1">
                      Staff Access
                    </p>
                    <DrawerClose asChild>
                      <Link href="/supervisor/login">
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-9"
                        >
                          <UserCog className="size-4" />
                          Supervisor Login
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link href="/receptionist/login">
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-9"
                        >
                          <Users className="size-4" />
                          Receptionist Login
                        </Button>
                      </Link>
                    </DrawerClose>
                  </div>

                  {/* Settings */}
                  <div className="flex items-center justify-between pt-2">
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
