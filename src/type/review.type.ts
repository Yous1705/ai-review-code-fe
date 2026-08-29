export interface Review {
  id: string;
  title: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  code: string;
  language: string;
}
