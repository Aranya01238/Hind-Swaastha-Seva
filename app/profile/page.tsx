"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit3, 
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login?returnTo=/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Authentication error: {error.message}</p>
          <Button onClick={() => router.push('/api/auth/login')}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <SiteHeader />
      
      <div className="flex-1 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/user">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Profile Information</h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit3 size={16} />
                    Edit Profile
                  </Button>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name || 'User'} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                        <User size={32} />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {user.name || 'User'}
                    </h3>
                    <p className="text-slate-600 mb-2">{user.email}</p>
                    <Badge variant="secondary" className="gap-1">
                      <Shield size={12} />
                      Verified Account
                    </Badge>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <Mail size={20} className="text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Email Address</p>
                        <p className="text-slate-900">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <Phone size={20} className="text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Phone Number</p>
                        <p className="text-slate-900">{user.phone_number || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <Calendar size={20} className="text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Member Since</p>
                        <p className="text-slate-900">
                          {new Date(user.updated_at || '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <Clock size={20} className="text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Last Login</p>
                        <p className="text-slate-900">
                          {new Date(user.updated_at || '').toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Email Verified</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Profile Complete</span>
                    <Badge variant="secondary">
                      85%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Security Level</span>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      High
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Edit3 size={16} />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Shield size={16} />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <MapPin size={16} />
                    Location Preferences
                  </Button>
                </div>
              </Card>

              {/* Health Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Health Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Appointments</span>
                    <span className="font-medium">3 upcoming</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Lab Reports</span>
                    <span className="font-medium">2 pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prescriptions</span>
                    <span className="font-medium">1 active</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}