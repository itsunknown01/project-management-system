import { AuthTypes } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";

interface AuthStore {
  token: string | null;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialise: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  loading: true,
  login: async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { accessToken } = response.data;
      console.log(accessToken);
      localStorage.setItem("token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      set({ token: accessToken, loading: true });
      const userResponse = await axios.get("/api/session");
      set({ user: userResponse.data, loading: false });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    set({ token: null, user: null, loading: false });
  },
  initialise: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const userResponse = await axios.get("/api/session");
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        set({ user: userResponse.data, loading: false });
      } catch (error) {
        set({ token: null, loading: false });
      }
    } else {
      set({ loading: false });
    }
  },
}));
