"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { CheckCircle, Heart } from "lucide-react";

export default function CallbackPage() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Successful login, redirect to user dashboard
      setTimeout(() => {
        router.push('/user');
      }, 2000);
    } else if (!isLoading && error) {
      // Error occurred, redirect to login
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [user, isLoading, error, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="text-red-600 mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              ❌
            </div>
            <h2 className="text-xl font-bold mb-2">Authentication Failed</h2>
            <p className="text-sm text-slate-600 mb-4">{error.message}</p>
            <p className="text-xs text-slate-500">Redirecting to login page...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="text-green-600 mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">Welcome, {user.name}!</h2>
            <p className="text-sm text-slate-600 mb-4">Authentication successful</p>
            <p className="text-xs text-slate-500">Redirecting to your dashboard...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="p-8 max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-red-600 p-2 rounded-xl">
            <Heart size={24} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Health<span className="text-red-600">Save</span>
          </h1>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Processing Authentication</h2>
        <p className="text-sm text-slate-600">Please wait while we set up your account...</p>
      </Card>
    </div>
  );
}