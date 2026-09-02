"use client";

import React from "react";
import {
  X,
  LogOut,
  Plus,
  Code2,
  Clock,
  Sparkles,
  PanelLeftClose,
} from "lucide-react";
import { Review } from "@/type/review.type";
import { useRouter, useParams } from "next/navigation";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toogleSideBar: () => void;
  historyTitle: Review[];
}

export default function ReviewSideBar({
  isOpen,
  toogleSideBar,
  historyTitle,
}: SideBarProps) {
  const router = useRouter();
  const params = useParams();
  const activeId = params?.id as string | undefined;

  const getScoreBadge = (score: number | null) => {
    if (score === null)
      return {
        text: "-",
        color: "text-slate-500 bg-slate-100 border-slate-200",
      };
    if (score >= 85)
      return {
        text: `${score}`,
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      };
    if (score >= 70)
      return {
        text: `${score}`,
        color: "text-blue-700 bg-blue-50 border-blue-200",
      };
    if (score >= 50)
      return {
        text: `${score}`,
        color: "text-amber-700 bg-amber-50 border-amber-200",
      };
    return {
      text: `${score}`,
      color: "text-rose-700 bg-rose-50 border-rose-200",
    };
  };

  return (
    <>
      {/* Backdrop overlay khusus tampilan mobile saat sidebar terbuka */}
      {isOpen && (
        <div
          onClick={toogleSideBar}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] transition-opacity md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-slate-200 bg-white text-slate-800 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Brand & Close Toggle Button */}
          <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20">
                <Sparkles size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-900">
                  CodeAuditor
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  AI Inspection Tool
                </span>
              </div>
            </div>

            {/* Tombol tutup sidebar (berfungsi di mobile & desktop) */}
            <button
              type="button"
              onClick={toogleSideBar}
              aria-label="Close sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          {/* New Audit Button */}
          <div className="p-3">
            <button
              type="button"
              onClick={() => {
                router.push("/review");
                window.location.reload();
                if (window.innerWidth < 768) toogleSideBar();
              }}
              className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
            >
              <div className="flex items-center gap-2">
                <Plus
                  size={14}
                  className="text-slate-500 group-hover:text-indigo-600 transition-colors"
                />
                <span>New Audit</span>
              </div>
              <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[9px] text-slate-400 shadow-2xs">
                Ctrl+N
              </span>
            </button>
          </div>

          {/* Section Label */}
          <div className="px-4 pt-2 pb-1 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Audit History
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
            {historyTitle.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <Clock size={20} className="mb-2 text-slate-300" />
                <p className="text-xs font-medium text-slate-500">
                  No audits yet
                </p>
                <p className="text-[11px] text-slate-400">
                  Your past scans will appear here
                </p>
              </div>
            ) : (
              historyTitle.map((item) => {
                const isActive = activeId === item.id;
                const title =
                  item.issues?.[0]?.title ||
                  item.summary?.slice(0, 32) ||
                  "Audit Scan";
                const scoreInfo = getScoreBadge(item.score);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      router.push(`/review/${item.id}`);
                      if (window.innerWidth < 768) toogleSideBar();
                    }}
                    className={`group relative flex w-full flex-col gap-1.5 rounded-lg p-2.5 text-left transition ${
                      isActive
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-medium text-slate-800">
                        {title}
                      </span>
                      <span
                        className={`inline-flex shrink-0 items-center justify-center rounded border px-1.5 py-0.2 font-mono text-[10px] font-semibold ${scoreInfo.color}`}
                      >
                        {scoreInfo.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-mono uppercase tracking-tight text-slate-500">
                        <Code2 size={11} />
                        {item.language}
                      </span>
                      <span>•</span>
                      <span>{item.issues?.length || 0} issues</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
