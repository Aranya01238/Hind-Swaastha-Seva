"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function AuthTestPage() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Auth0 Integration Test
          </h1>
          <p className="text-slate-600">
            This page helps verify your Auth0 setup is working correctly
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          
          {isLoading && (
            <div className="flex items-center gap-3 text-blue-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span>Loading authentication status...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 text-red-600">
              <XCircle size={20} />
              <div>
                <p className="font-semibold">Authentication Error</p>
                <p className="text-sm">{error.message}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && !user && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-orange-600">
                <AlertCircle size={20} />
                <span>Not authenticated</span>
              </div>
              <Button asChild>
                <a href="/api/auth/login">Login with Auth0</a>
              </Button>
            </div>
          )}

          {user && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle size={20} />
                <span className="font-semibold">Successfully authenticated!</span>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">User Information:</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
                  <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
                  <p><strong>Picture:</strong> {user.picture ? 'Available' : 'Not provided'}</p>
                  <p><strong>User ID:</strong> {user.sub}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <a href="/user">Go to User Dashboard</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/api/auth/logout">Logout</a>
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Setup Checklist</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm">Auth0 SDK installed</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm">Auth0Provider configured</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm">API routes created</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm">AUTH0_SECRET generated</span>
            </div>
            <div className="flex items-center gap-3">
              {process.env.AUTH0_CLIENT_ID && process.env.AUTH0_CLIENT_ID !== 'your_auth0_client_id_here' ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-red-600" />
              )}
              <span className="text-sm">Auth0 credentials configured</span>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Need help? Check the <a href="/AUTH0_SETUP.md" className="text-blue-600 hover:underline">setup guide</a>
          </p>
        </div>
      </div>
    </div>
  );
}