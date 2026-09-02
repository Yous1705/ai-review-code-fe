"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useReview } from "@/hooks/useReview";
import ReviewSideBar from "@/component/ReviewSideBar";
import { Severity } from "@/type/review.type";
import {
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  FileCode2,
  PanelLeftOpen,
  Calendar,
  ArrowLeft,
} from "lucide-react";

export default function ReviewHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const { reviewHistory, historyTitle, fetchReviewById } = useReview();

  const [isOpen, setIsOpen] = useState(true); // Default terbuka di desktop
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (typeof id === "string") {
      fetchReviewById(id);
    }
  }, [id]);

  const toogleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = (text: string, copyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(copyId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyRawCode = () => {
    if (!reviewHistory?.code) return;
    navigator.clipboard.writeText(reviewHistory.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Nomor baris otomatis berdasarkan kode yang diaudit
  const lineNumbers = useMemo(() => {
    if (!reviewHistory?.code) return [];
    const count = reviewHistory.code.split("\n").length;
    return Array.from({ length: Math.max(count, 10) }, (_, i) => i + 1);
  }, [reviewHistory?.code]);

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

  const formattedDate = useMemo(() => {
    if (!reviewHistory?.createdAt) return null;
    try {
      return new Date(reviewHistory.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return null;
    }
  }, [reviewHistory?.createdAt]);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased transition-all duration-300">
      <ReviewSideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toogleSideBar={toogleSideBar}
        historyTitle={historyTitle}
      />

      {/* Main Container: Bergeser secara halus mengikuti status isOpen di desktop */}
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "md:ml-64" : "ml-0"}`}
      >
        {/* Top Sticky Header */}
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
            <button
              type="button"
              onClick={() => router.push("/review")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs transition hover:bg-slate-50"
            >
              <ArrowLeft size={13} />
              Back to Editor
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          {/* Header Title & Metadata */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/70 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                <Sparkles size={12} />
                Archived Code Review
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Review Result
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Viewing archived automated audit details and feedback.
              </p>
            </div>

            {formattedDate && (
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-2xs">
                <Calendar size={13} className="text-slate-400" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>

          {!reviewHistory ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
              <p className="mt-3 text-sm text-slate-500">
                Loading audit report...
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Snapshot Code Block (Read-only IDE Style) */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    </div>
                    <span className="ml-2 flex items-center gap-1.5 font-mono text-xs font-medium text-slate-600">
                      <FileCode2 size={13} />
                      submitted_code.{reviewHistory.language || "txt"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600 uppercase">
                      {reviewHistory.language}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyRawCode}
                      className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-2xs transition hover:bg-slate-50"
                    >
                      {copiedCode ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative flex max-h-[380px] overflow-auto bg-slate-950 font-mono text-sm text-slate-100">
                  <div className="hidden select-none border-r border-slate-800/70 bg-slate-900/40 px-3 py-4 text-right font-mono text-xs text-slate-600 sm:block">
                    {lineNumbers.map((n) => (
                      <div key={n} className="leading-6">
                        {n}
                      </div>
                    ))}
                  </div>
                  <pre className="p-4 leading-6">
                    <code>{reviewHistory.code}</code>
                  </pre>
                </div>
              </div>

              {/* Score & Summary Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                  <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                    Overall Score
                  </span>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {reviewHistory.score ?? "-"}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      / 100
                    </span>
                  </div>
                  <p
                    className={`text-xs font-medium ${getScoreStatus(reviewHistory.score).color}`}
                  >
                    {getScoreStatus(reviewHistory.score).text}
                  </p>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                      Executive Summary
                    </span>
                    {reviewHistory.status && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                        {reviewHistory.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {reviewHistory.summary ?? "No detailed summary available."}
                  </p>
                </div>
              </div>

              {/* Audit Findings / Issues */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">
                    Audit Findings ({reviewHistory.issues?.length || 0})
                  </h2>
                </div>

                {!reviewHistory.issues || reviewHistory.issues.length === 0 ? (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-emerald-800">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />
                    <p className="text-sm">
                      No issues or anti-patterns were recorded for this audit.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviewHistory.issues.map((issue) => {
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
