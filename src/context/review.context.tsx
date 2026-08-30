"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { Review } from "@/type/review.type";
import { reviewService } from "@/services/review.service";

export interface ReviewContextType {
  review: Review | null;
  historyReview: Review[];
  fetchHistoryReview: () => Promise<void>;
  setReview: (review: Review | null) => void;
  clearReview: () => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

interface ReviewProviderProps {
  children: ReactNode;
}

export function ReviewProvider({ children }: ReviewProviderProps) {
  const [review, setReview] = useState<Review | null>(null);
  const [historyReview, setHistoryReview] = useState<Review[]>([]);

  const fetchHistoryReview = async () => {
    try {
      const result = await reviewService.findAll();

      setHistoryReview(result.data);
    } catch (error) {
      console.error("Failed to fetch review history:", error);
    }
  };

  useEffect(() => {
    fetchHistoryReview();
  }, []);

  const clearReview = () => {
    setReview(null);
  };

  return (
    <ReviewContext.Provider
      value={{
        review,
        historyReview,
        fetchHistoryReview,
        setReview,
        clearReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
