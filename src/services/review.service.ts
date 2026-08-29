import axiosInstance from "@/lib/axios";
import { CreateReviewDto, CreateReviewResponse } from "@/type/review.type";

export const reviewService = {
  async create(payload: CreateReviewDto): Promise<CreateReviewResponse> {
    const response = await axiosInstance.post<CreateReviewResponse>(
      "/review",
      payload,
    );

    return response.data;
  },
};
