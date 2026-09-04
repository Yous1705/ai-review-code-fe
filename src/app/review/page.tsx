"use client";

import { FormEvent, useState, useMemo, useEffect } from "react";
import { reviewService } from "@/services/review.service";
import { useReview } from "@/hooks/useReview";
import ReviewSideBar from "@/component/ReviewSideBar";
import { Severity } from "@/type/review.type";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  CornerDownLeft,
  FileCode2,
  PanelLeftOpen,
} from "lucide-react";

const SUPPORTED_LANGUAGES = [
  { value: "typescript", label: "TypeScript", ext: "ts" },
  { value: "javascript", label: "JavaScript", ext: "js" },
  { value: "python", label: "Python", ext: "py" },
  { value: "java", label: "Java", ext: "java" },
  { value: "go", label: "Go", ext: "go" },
];

export default function ReviewPage() {
  const { review, setReview, historyTitle, fetchHistoryReview } = useReview();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistoryReview();
  }, []);

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!code.trim()) {
      setError("Please input some code to review");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await reviewService.create({
        code,
        language,
      });

      setReview(response.data);
      await fetchHistoryReview();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to review code");
    } finally {
      setLoading(false);
    }
  };

  const toogleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const lineNumbers = useMemo(() => {
    const count = code.split("\n").length;
    return Array.from({ length: Math.max(count, 12) }, (_, i) => i + 1);
  }, [code]);

  const activeExt =
    SUPPORTED_LANGUAGES.find((l) => l.value === language)?.ext || "txt";

  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case "CRITICAL":
        return {
          icon: <AlertCircle size={14} />,
          className: "bg-rose-50 text-rose-700 border-rose-200",
          label: "Critical",
        };
      case "HIGH":
        return {
          icon: <AlertTriangle size={14} />,
          className: "bg-orange-50 text-orange-700 border-orange-200",
          label: "High",
        };
      case "MEDIUM":
        return {
          icon: <AlertTriangle size={14} />,
          className: "bg-amber-50 text-amber-700 border-amber-200",
          label: "Medium",
        };
      case "LOW":
      default:
        return {
          icon: <Info size={14} />,
          className: "bg-blue-50 text-blue-700 border-blue-200",
          label: "Low",
        };
    }
  };

  const getScoreStatus = (score: number | null) => {
    if (score === null) return { text: "Pending", color: "text-slate-400" };
    if (score >= 85)
      return { text: "Excellent Code Health", color: "text-emerald-600" };
    if (score >= 70) return { text: "Good Quality", color: "text-blue-600" };
    if (score >= 50)
      return { text: "Needs Refactoring", color: "text-amber-600" };
    return { text: "Critical Attention Needed", color: "text-rose-600" };
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased transition-all duration-300">
      <ReviewSideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toogleSideBar={toogleSideBar}
        historyTitle={historyTitle}
      />

      {/* Main Container: Margin kiri bergeser mengikuti kondisi isOpen di desktop */}
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "md:ml-64" : "ml-0"}`}
      >
        {/* Top Navbar Bar untuk tombol buka sidebar jika sedang tertutup */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xs sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toogleSideBar}
              aria-label="Toggle sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900"
            >
              <PanelLeftOpen size={17} />
            </button>
            <span className="text-xs font-medium text-slate-500">
              {isOpen ? "Collapse menu" : "Open sidebar"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/70 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              <Sparkles size={12} />
              AI Code Review
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          {/* Header Title Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Code Review
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Paste your function, module, or snippet below for architectural
              and logic review.
            </p>
          </div>

          {/* Editor Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100">
              {/* Window Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50/90 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="ml-2 flex items-center gap-1.5 font-mono text-xs font-medium text-slate-500">
                    <FileCode2 size={13} />
                    snippet.{activeExt}
                  </span>
                </div>

                {/* Language Select */}
                <div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:outline-hidden"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Code Area */}
              <div className="relative flex min-h-[340px] bg-slate-950 font-mono text-sm text-slate-100">
                <div className="hidden select-none border-r border-slate-800/70 bg-slate-900/40 px-3 py-4 text-right font-mono text-xs text-slate-600 sm:block">
                  {lineNumbers.map((n) => (
                    <div key={n} className="leading-6">
                      {n}
                    </div>
                  ))}
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  placeholder="// Paste or type your code snippet here..."
                  rows={13}
                  spellCheck={false}
                  className="w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-slate-100 placeholder:text-slate-600 focus:outline-hidden"
                />
              </div>

              {/* Editor Footer Action */}
              <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/70 px-4 py-3">
                <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600 shadow-2xs">
                    Ctrl
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600 shadow-2xs">
                    Enter
                  </kbd>
                  <span className="ml-1">to submit</span>
                </div>

                <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                  {error && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600">
                      <AlertCircle size={14} />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        Review Code
                        <CornerDownLeft size={12} className="opacity-60" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Review Results */}
          {review && (
            <section className="mt-10 space-y-6">
              {/* Score & Summary Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                  <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                    Overall Score
                  </span>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {review.score ?? "-"}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      / 100
                    </span>
                  </div>
                  <p
                    className={`text-xs font-medium ${getScoreStatus(review.score).color}`}
                  >
                    {getScoreStatus(review.score).text}
                  </p>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                      Executive Summary
                    </span>
                    {review.status && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                        {review.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {review.summary ?? "No detailed summary available."}
                  </p>
                </div>
              </div>

              {/* Issues Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">
                    Audit Findings ({review.issues?.length || 0})
                  </h2>
                </div>

                {!review.issues || review.issues.length === 0 ? (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-emerald-800">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />
                    <p className="text-sm">
                      No issues or anti-patterns were found. Looks solid!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {review.issues.map((issue) => {
                      const badge = getSeverityBadge(issue.severity);
                      return (
                        <div
                          key={issue.id}
                          className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-slate-300"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${badge.className}`}
                            >
                              {badge.icon}
                              {badge.label}
                            </span>
                            {issue.line !== null && (
                              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600">
                                Line {issue.line}
                              </span>
                            )}
                          </div>

                          <h3 className="mt-3 text-sm font-semibold text-slate-900">
                            {issue.title}
                          </h3>

                          <p className="mt-1.5 text-sm text-slate-600">
                            {issue.description}
                          </p>

                          {/* Code Suggestion Box */}
                          {issue.suggestion && (
                            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-slate-100">
                              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-400">
                                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                                  <Code2 size={13} />
                                  Suggested Patch
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopy(issue.suggestion!, issue.id)
                                  }
                                  className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                                >
                                  {copiedId === issue.id ? (
                                    <>
                                      <Check
                                        size={12}
                                        className="text-emerald-400"
                                      />
                                      <span className="text-emerald-400">
                                        Copied
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-slate-200">
                                <code>{issue.suggestion}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
