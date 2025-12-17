import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../utils/api";
import type { AxiosError } from "axios";

interface ChatStoreTypes {
  messages:
    | [
        {
          image: string;
          _id: string;
          senderId: string;
          receiverId: string;
          text: string;
          createdAt: string;
          updatedAt: string;
          __v: number;
        }
      ]
    | [];
  users:
    | [
        {
          _id: string;
          email: string;
          fullName: string;
          profilePicture: string;
          createdAt: string;
          updatedAt: string;
          __v: number;
        }
      ]
    | [];
  selectedUser: {
    _id: string;
    email: string;
    fullName: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => void;
  getMessages: (userId: any) => void;
  setSelectedUser: (selectedUser: any) => void;
  sendMessage: (messageData: any) => void;
}

export const useChatStore = create<ChatStoreTypes>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await api.get("/user");

      set({ users: data });
      //   return { success: true };
    } catch (error) {
      console.log(
        "GetUsersError:",
        (error as AxiosError<{ message: string }>).response?.data?.message
          ? (error as AxiosError<{ message: string }>).response?.data?.message
          : error
      );
      toast.error("Failed to get Users");
      //   return { success: false };
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const { data } = await api.get(`message/${userId}`);
      set({ messages: data });
    } catch (error) {
      console.log(
        "GetMessagesError:",
        (error as AxiosError<{ message: string }>).response?.data?.message
          ? (error as AxiosError<{ message: string }>).response?.data?.message
          : error
      );
      toast.error("Failed to get Users");
      //   return { success: false };
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const { data } = await api.post(
        // @ts-ignore
        `/message/send/${selectedUser._id}`,
        messageData
      );

      //   console.log(data);
      // @ts-ignore
      set({ messages: [...messages, data] });
    } catch (error) {
      console.log(
        "SendMessageError:",
        (error as AxiosError<{ message: string }>).response?.data?.message
          ? (error as AxiosError<{ message: string }>).response?.data?.message
          : error
      );
      toast.error("Failed to get Users");
      //   return { success: false };
    }
  },

  // todo optimise it
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
