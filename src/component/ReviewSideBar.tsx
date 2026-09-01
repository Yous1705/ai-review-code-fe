"use client";

import React from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Review } from "@/type/review.type";
import { useRouter } from "next/navigation";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toogleSideBar: () => void;
  historyTitle: Review[];
}

function ReviewSideBar({ isOpen, toogleSideBar, historyTitle }: SideBarProps) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={toogleSideBar}
        aria-label="Toggle navigation"
        className="fixed top-4 left-4 z-50 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-md transition-colors hover:bg-slate-50 md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          onClick={toogleSideBar}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-slate-900 text-slate-100 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex h-16 items-center border-b border-slate-800 px-6">
            <span className="text-xl font-bold tracking-tight text-white">
              AI <span className="text-indigo-400">Code Review</span>
            </span>
          </div>

          <nav className="space-y-1.5 p-4">
            {historyTitle.map((review) => {
              const title = review.issues[0]?.title || "No title";

              return (
                <button
                  key={review.id}
                  type="button"
                  className="block w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
                  onClick={() => {
                    router.push(`/review/${review.id}`);
                    toogleSideBar();
                  }}
                >
                  {title}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-red-400"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default ReviewSideBar;
