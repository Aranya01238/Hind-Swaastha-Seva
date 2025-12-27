"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, User, Shield, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/user');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/portals" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6">
            ← Back to Portals
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-500/30">
              <Heart size={32} className="text-white" fill="currentColor" />
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              Health<span className="text-red-600">Save</span>
            </h1>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Welcome to Your Health Portal
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sign in or create your account to access personalized healthcare services
          </p>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-2xl border-2 border-slate-200">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <User size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">User Portal Access</h3>
              <p className="text-slate-600">Secure authentication powered by Auth0</p>
            </div>

            {/* Features List */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm">AI Health Assistant (Nurse Maya)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm">Book Hospital Appointments</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm">Find Healthcare Centers</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm">Blood Bank Access</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm">Secure Health Records</span>
              </div>
            </div>

            {/* Login Button */}
            <a href="/api/auth/login?returnTo=/user" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <span className="flex items-center justify-center gap-2">
                  Sign In / Sign Up
                  <ArrowRight size={20} />
                </span>
              </Button>
            </a>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Shield size={16} className="text-green-500" />
                <span>Secured by Auth0 • HIPAA Compliant</span>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8 text-sm text-slate-500">
            <p>New to HealthSave? Your account will be created automatically on first login.</p>
            <p className="mt-2">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}