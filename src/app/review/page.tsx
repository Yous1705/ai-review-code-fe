"use client";

import { FormEvent, useState } from "react";
import { reviewService } from "@/services/review.service";
import { useReview } from "@/hooks/useReview";

export default function ReviewPage() {
  const { review, setReview } = useReview();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Code cannot be empty");
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
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to review code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">AI Code Review</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded border px-3 py-2"
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Code</label>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={20}
            className="w-full rounded border p-3 font-mono text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </form>

      {review && (
        <section className="mt-10 space-y-6">
          <div className="rounded border p-5">
            <h2 className="mb-4 text-xl font-semibold">Review Result</h2>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Score</span>

              <p className="text-3xl font-bold">{review.score ?? "-"}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Summary</span>

              <p className="mt-1">{review.summary ?? "No summary available"}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Issues</h2>

            {review.issues.length === 0 ? (
              <p className="text-gray-500">No issues found.</p>
            ) : (
              <div className="space-y-4">
                {review.issues.map((issue) => (
                  <div key={issue.id} className="rounded border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">{issue.title}</h3>

                      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {issue.severity}
                      </span>
                    </div>

                    {issue.line && (
                      <p className="mb-2 text-sm text-gray-500">
                        Line: {issue.line}
                      </p>
                    )}

                    <p className="mb-3 text-sm">{issue.description}</p>

                    {issue.suggestion && (
                      <div className="rounded bg-gray-50 p-3">
                        <p className="mb-1 text-sm font-medium">Suggestion</p>

                        <p className="text-sm">{issue.suggestion}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
