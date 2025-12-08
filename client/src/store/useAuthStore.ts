import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "../utils/api";
import type { AxiosError } from "axios";

export type UserSchemaType = {
  _id: string;
  email: string;
  fullName: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type ErrorSchemaType = {
  status: number;
  type: string;
  message: string;
  stack?: string;
};

type Store = {
  authUser: UserSchemaType | null;
  authError: ErrorSchemaType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
};

export const useAuthStore = create<Store, [["zustand/devtools", never]]>(
  devtools((set) => ({
    authUser: null,
    authError: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
      try {
        const { data } = await api.get("auth/check");
        set({ authUser: data });
      } catch (err) {
        const error = err as AxiosError;
        const errorData = error?.response?.data
          ? (error?.response?.data as ErrorSchemaType)
          : null;
        console.log("CheckAuth Error: ", errorData);
        if (errorData) {
          set({ authError: errorData });
        }
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
  }))
);
