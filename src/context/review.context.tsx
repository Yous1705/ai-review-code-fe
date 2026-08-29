"use client";

import { ReactNode, createContext, useState } from "react";
import { Review } from "@/type/review.type";

export interface ReviewContextType {
  review: Review | null;
  setReview: (review: Review | null) => void;
  clearReview: () => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

interface ReviewProviderProps {
  children: ReactNode;
}

export function ReviewProvider({ children }: ReviewProviderProps) {
  const [review, setReview] = useState<Review | null>(null);

  const clearReview = () => {
    setReview(null);
  };

  return (
    <ReviewContext.Provider
      value={{
        review,
        setReview,
        clearReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
