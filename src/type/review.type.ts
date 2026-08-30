export type ReviewStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface CreateReviewDto {
  code: string;
  language: string;
}

export interface ReviewIssue {
  id: string;
  reviewId: string;
  severity: Severity;
  line: number | null;
  title: string;
  description: string;
  suggestion: string | null;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  code: string;
  language: string;
  status: ReviewStatus;
  score: number | null;
  summary: string | null;
  createdAt: string;
  updatedAt: string;
  issues: ReviewIssue[];
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: Review;
}

export interface ReviewPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FindAllReviewResponse {
  success: boolean;
  message: string;
  data: Review[];
  meta: ReviewPagination;
}
