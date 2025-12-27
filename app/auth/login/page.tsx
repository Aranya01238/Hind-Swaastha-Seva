"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function PatientAuthPage() {
  const router = useRouter();
  const sp = useSearchParams(); // Initialize useSearchParams
  const prefilledEmail = sp?.get("email") || ""; // Get email from URL

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(prefilledEmail); // Use prefilledEmail here
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup"; // Assuming a login API route exists
      const body = isLogin ? { email, password } : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "An unexpected error occurred.");
        return;
      }

      setSuccess(data.message);
      // Handle successful login/signup (e.g., redirect, store token)
      if (!isLogin) {
        // After successful signup, maybe switch to login or redirect
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        alert("Signup successful! Please log in.");
      } else {
        // For login, redirect to dashboard or home
        router.push("/patient/dashboard"); // Adjust redirect path as needed
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Network error or server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? "Patient Login" : "Patient Signup"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Log in to access your patient portal."
              : "Create a new patient account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
            </Button>
          </form>

          <div className="text-center text-sm">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Button variant="link" onClick={() => setIsLogin(false)}>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsLogin(true)}>
                  Login
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
