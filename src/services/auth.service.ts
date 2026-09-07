import { RegisterDto, LoginDto } from "../type/auth.type";
import axiosInstance from "@/lib/axios";

export const authService = {
  async register(payload: RegisterDto) {
    const response = await axiosInstance.post("/auth/register", payload);

    return response.data;
  },

  async login(payload: LoginDto) {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },

  googleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  },

  async logout() {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  async me() {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },
};
