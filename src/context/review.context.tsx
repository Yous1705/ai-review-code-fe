"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { Review } from "@/type/review.type";
import { reviewService } from "@/services/review.service";

export interface ReviewContextType {
  review: Review | null;
  historyTitle: Review[];
  reviewHistory: Review | null;
  fetchHistoryReview: () => Promise<void>;
  fetchReviewById: (id: string) => Promise<void>;
  setReview: (review: Review | null) => void;
  clearReview: () => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

interface ReviewProviderProps {
  children: ReactNode;
}

export function ReviewProvider({ children }: ReviewProviderProps) {
  const [review, setReview] = useState<Review | null>(null);
  const [historyTitle, setHistoryTitle] = useState<Review[]>([]);
  const [reviewHistory, setReviewHistory] = useState<Review | null>(null);

  const fetchHistoryReview = async () => {
    try {
      const result = await reviewService.findAll();

      setHistoryTitle(result.data);
    } catch (error) {
      console.error("Failed to fetch review history:", error);
    }
  };

  const fetchReviewById = async (id: string) => {
    try {
      const result = await reviewService.findById(id);
      setReviewHistory(result.data);
    } catch (error) {
      console.error("Failed to fetch review by ID:", error);
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
        historyTitle,
        reviewHistory,
        fetchReviewById,
        fetchHistoryReview,
        setReview,
        clearReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
