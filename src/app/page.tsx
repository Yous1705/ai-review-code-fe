"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Code2,
  ShieldCheck,
  Zap,
  History,
  FileCode2,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Lock,
  ArrowRight,
  GitPullRequest,
  Blocks,
  Terminal,
  Check,
} from "lucide-react";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

interface PreviewIssue {
  id: string;
  severity: Severity;
  line: number;
  title: string;
  description: string;
}

const SAMPLE_CODE = `function processUserData(users: any[]) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].active == true) {
      // Unhandled potential null pointer
      let name = users[i].profile.name;
      // Insecure comparison & blocking operation
      let hash = eval("md5(" + users[i].password + ")");
      result.push({ id: users[i].id, name: name, hash: hash });
    }
  }
  return result;
}`;

const SAMPLE_ISSUES: PreviewIssue[] = [
  {
    id: "1",
    severity: "CRITICAL",
    line: 8,
    title: "Use of Dangerous Function `eval()`",
    description:
      "Direct code execution using eval() creates severe security vulnerabilities, enabling Code Injection. Replace this with a secure hashing library.",
  },
  {
    id: "2",
    severity: "HIGH",
    line: 6,
    title: "Unsafe Property Access (Potential Null Pointer)",
    description:
      "Accessing `users[i].profile.name` without checking if `profile` exists can throw a TypeError. Use optional chaining (`profile?.name`) instead.",
  },
  {
    id: "3",
    severity: "MEDIUM",
    line: 4,
    title: "Loose Equality & Implicit Type Coercion",
    description:
      "Using `==` for comparison can lead to unexpected type coercion bug behaviors. Use strict equality `===` instead.",
  },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"code" | "review">("code");

  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case "CRITICAL":
        return {
          icon: <AlertCircle size={13} />,
          className: "bg-rose-50 text-rose-700 border-rose-200",
          label: "Critical",
        };
      case "HIGH":
        return {
          icon: <AlertTriangle size={13} />,
          className: "bg-orange-50 text-orange-700 border-orange-200",
          label: "High",
        };
      case "MEDIUM":
        return {
          icon: <AlertTriangle size={13} />,
          className: "bg-amber-50 text-amber-700 border-amber-200",
          label: "Medium",
        };
      case "LOW":
      default:
        return {
          icon: <Info size={13} />,
          className: "bg-blue-50 text-blue-700 border-blue-200",
          label: "Low",
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* ------------------ NAVBAR ------------------ */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-xs">
              <Code2 size={20} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-tight text-slate-900">
                CodeAudit<span className="text-indigo-600">.ai</span>
              </span>
              <span className="hidden rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 sm:inline-block">
                Portfolio
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-900">
              Features
            </a>
            <a href="#preview" className="transition hover:text-slate-900">
              Preview
            </a>
            <a href="#roadmap" className="transition hover:text-slate-900">
              Roadmap
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800"
            >
              Get Started
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------ HERO SECTION ------------------ */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50/0 to-transparent blur-3xl" />

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-xs font-medium text-indigo-700 shadow-2xs backdrop-blur-xs">
            <Sparkles size={13} />
            <span>AI Code Reviewer & Security Inspector</span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl sm:leading-[1.15]">
            Automated Code Reviews <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-600 bg-clip-text text-transparent">
              Built for Modern Developers
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Instantly analyze your TypeScript, JavaScript, Python, Go, and Java
            code snippets for architectural anti-patterns, security risks, and
            code smell before pushing to production.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/register"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
            >
              Get Started for Free
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
            >
              Sign In to App
            </Link>
          </div>

          {/* Key Tech Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Supports:</span>
            {["TypeScript", "JavaScript", "Python", "Java", "Go"].map(
              (lang) => (
                <span
                  key={lang}
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 shadow-2xs"
                >
                  {lang}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ------------------ DASHBOARD PREVIEW / SHOWCASE ------------------ */}
      <section
        id="preview"
        className="py-12 bg-slate-100/60 border-y border-slate-200/80"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-6 text-center">
            <h2 className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              Dashboard Overview
            </h2>
            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Clean, Developer-Focused Interface
            </p>
          </div>

          {/* Interactive Mock Frame */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-slate-300" />
                  <div className="h-3 w-3 rounded-full bg-slate-300" />
                  <div className="h-3 w-3 rounded-full bg-slate-300" />
                </div>
                <span className="ml-2 font-mono text-xs font-medium text-slate-500">
                  app.codeaudit.ai/review
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`rounded-md px-3 py-1 transition ${
                    activeTab === "code"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Code Input
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("review")}
                  className={`rounded-md px-3 py-1 transition ${
                    activeTab === "review"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Audit Results
                </button>
              </div>
            </div>

            {/* Mock Content */}
            <div className="p-4 sm:p-6 bg-slate-50/40">
              {activeTab === "code" ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-4 py-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-mono">
                      <FileCode2 size={13} />
                      user-processor.ts
                    </span>
                    <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      TypeScript
                    </span>
                  </div>
                  <div className="bg-slate-950 p-4 font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed">
                    <pre>
                      <code>{SAMPLE_CODE}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/70 px-4 py-3">
                    <span className="text-xs text-slate-500">
                      Press{" "}
                      <kbd className="rounded border bg-white px-1 font-mono text-[10px]">
                        Ctrl+Enter
                      </kbd>{" "}
                      to run analysis
                    </span>
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      <Sparkles size={13} />
                      Analyze Code
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary & Score Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                      <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                        Overall Score
                      </span>
                      <div className="my-2 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                          48
                        </span>
                        <span className="text-sm font-medium text-slate-400">
                          / 100
                        </span>
                      </div>
                      <p className="text-xs font-medium text-rose-600">
                        Critical Attention Needed
                      </p>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                          Executive Summary
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          COMPLETED
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        The submitted snippet contains critical security flaws
                        including dynamic evaluation via `eval()` and potential
                        runtime uncaught exceptions. Immediate refactoring is
                        recommended to address vulnerabilities before
                        deployment.
                      </p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Audit Findings ({SAMPLE_ISSUES.length})
                    </h3>
                    {SAMPLE_ISSUES.map((issue) => {
                      const badge = getSeverityBadge(issue.severity);
                      return (
                        <div
                          key={issue.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-slate-300"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${badge.className}`}
                            >
                              {badge.icon}
                              {badge.label}
                            </span>
                            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                              Line {issue.line}
                            </span>
                          </div>
                          <h4 className="mt-2 text-xs font-semibold text-slate-900 sm:text-sm">
                            {issue.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600">
                            {issue.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Login Prompt Overlay Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-900 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Lock size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold">
                    Sign in required for interactive reviews
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Create a free account to test your own code and save review
                    history.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-indigo-500"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ FEATURES SECTION ------------------ */}
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              Core Capabilities
            </h2>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Everything You Need for Code Health
            </p>
            <p className="mx-auto mt-3 max-w-xl text-xs text-slate-600 sm:text-sm">
              Designed as a developer workspace to quickly assess quality, spot
              security bugs, and track review records.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Zap size={20} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Real-Time AI Audit
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Receive instant structural feedback, performance bottleneck
                warnings, and security threat evaluations in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Severity Scoring
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Findings are categorized into Critical, High, Medium, and Low
                severity tiers to help you prioritize refactoring.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                <History size={20} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Review History
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                All audits are saved into your personal account history sidebar,
                allowing you to re-examine past code evaluations anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ ROADMAP SECTION ------------------ */}
      <section id="roadmap" className="py-16 bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
              <Terminal size={12} /> Project Milestones
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Development Roadmap
            </h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              As an evolving portfolio project, here is the roadmap for upcoming
              feature iterations.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Phase 1 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Phase 1 — Live
                </span>
                <Check className="text-emerald-400" size={16} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">
                Core Snippet Analysis
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Multi-language syntax support
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Severity tiering & paragraph summaries
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  User auth & history persistent state
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="relative rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-5 backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  Phase 2 — In Development
                </span>
                <Sparkles className="text-indigo-400 animate-pulse" size={16} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">
                Suggested Code Patches
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Inline diff patches for detected issues
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  One-click "Copy Fixed Code" action
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Export review results to Markdown / PDF
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-400">
                  Phase 3 — Future
                </span>
                <GitPullRequest className="text-slate-500" size={16} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">
                Integrations & Extensions
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  GitHub Pull Request automated bot
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  VS Code Extension integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  Custom team rule configurations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ CTA FOOTER CALLOUT ------------------ */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ready to Audit Your Code Snippets?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-xs text-slate-600 sm:text-sm">
              Sign in or create a free portfolio account to start running
              automated reviews immediately.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-6 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800"
              >
                Create Account
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ FOOTER ------------------ */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-slate-900" />
            <span className="font-mono font-semibold text-slate-900">
              CodeAudit.ai
            </span>
            <span>— Portfolio Project</span>
          </div>
          <p>
            © {new Date().getFullYear()} CodeAudit.ai. Built with Next.js &
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
