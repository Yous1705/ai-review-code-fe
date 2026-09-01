import axiosInstance from "@/lib/axios";
import {
  CreateReviewDto,
  CreateReviewResponse,
  FindAllReviewResponse,
} from "@/type/review.type";

export const reviewService = {
  async create(payload: CreateReviewDto): Promise<CreateReviewResponse> {
    const response = await axiosInstance.post<CreateReviewResponse>(
      "/review",
      payload,
    );

    return response.data;
  },

  async findAll(): Promise<FindAllReviewResponse> {
    const response = await axiosInstance.get<FindAllReviewResponse>("/review");

    return response.data;
  },

  async findById(id: string): Promise<CreateReviewResponse> {
    const response = await axiosInstance.get<CreateReviewResponse>(
      `/review/${id}`,
    );
    return response.data;
  },
};
