"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  Code2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await authService.login({ email, password });

      const response = await authService.me();
      login(response.data.data);

      router.push("/review");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50/60 font-sans text-slate-900 antialiased px-4 py-8 selection:bg-indigo-500 selection:text-white">
      {/* Background Radial Glow Effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-indigo-100/60 blur-[120px] rounded-full" />
      </div>

      {/* Navigation Top Action */}
      <div className="mb-6 w-full max-w-4xl flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-white shadow-xs">
            <Code2 size={16} />
          </div>
          <span className="font-mono text-sm font-bold tracking-tight text-slate-900">
            CodeAudit<span className="text-indigo-600">.ai</span>
          </span>
        </div>
      </div>

      {/* Main Form Container Card */}
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 grid grid-cols-1 md:grid-cols-12">
        {/* Left Side Banner (Hero / Value Prop) */}
        <div className="md:col-span-5 bg-slate-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-indigo-300">
              <Sparkles size={12} />
              AI Code Reviewer
            </div>
            <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Elevate Your Code Quality Instantaneously.
            </h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Sign in to run automated static analysis, security checks, and
              code health scoring across multiple programming languages.
            </p>
          </div>

          <div className="mt-8 space-y-3 border-t border-slate-800/80 pt-6">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Multi-Language Syntax Support</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Severity Triage & Health Scores</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Personalized Saved Audit History</span>
            </div>
          </div>

          <div className="mt-8 pt-4 text-[11px] text-slate-500 border-t border-slate-900">
            Portfolio Demo Edition
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Welcome back
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Please enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs text-rose-700">
              <AlertCircle
                size={16}
                className="shrink-0 mt-0.5 text-rose-600"
              />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 transition focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={15} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-10 py-2 text-xs text-slate-900 placeholder:text-slate-400 transition focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              OR
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={() => authService.googleLogin()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Footer Navigation Link */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-slate-900 transition hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
