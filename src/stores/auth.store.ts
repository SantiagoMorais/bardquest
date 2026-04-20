import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      initialized: false,
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setInitialized: (initialized) => set({ initialized }),
    }),
    {
      name: "bardquest-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        initialized: state.initialized,
      }),
    }
  )
);
