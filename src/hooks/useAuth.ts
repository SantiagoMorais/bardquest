"use client";

import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";

let isAuthSyncInitialized = false;
let authUnsubscribe: (() => void) | null = null;

const initializeAuthSync = () => {
  if (isAuthSyncInitialized) return;

  isAuthSyncInitialized = true;
  useAuthStore.getState().setIsLoading(true);

  supabase.auth.getSession().then(({ data: { session } }) => {
    useAuthStore.getState().setUser(session?.user ?? null);
    useAuthStore.getState().setInitialized(true);
    useAuthStore.getState().setIsLoading(false);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setUser(session?.user ?? null);
    useAuthStore.getState().setInitialized(true);
    useAuthStore.getState().setIsLoading(false);
  });

  authUnsubscribe = () => subscription.unsubscribe();
};

/**
 * Custom hook to manage and monitor the user's authentication state.
 * * This hook synchronizes the local state with Supabase Auth by:
 * 1. Fetching the initial session on mount via `getSession()`.
 * 2. Subscribing to authentication state changes (sign-in, sign-out, token refreshes)
 * using `onAuthStateChange`.
 * 3. Cleaning up the subscription when the component unmounts.
 * * @returns {User | null} The current authenticated Supabase user object,
 * or `null` if the user is not authenticated.
 * * @example
 * const user = useAuth();
 * if (user) console.log("Logged in as:", user.email);
 */
export function useAuth(): { user: User | null; isLoading: boolean } {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initializeAuthSync();

    return () => {
      // Keep auth sync alive for app lifetime. In Fast Refresh, cleanup old subscription.
      if (process.env.NODE_ENV === "development" && authUnsubscribe) {
        authUnsubscribe();
        authUnsubscribe = null;
        isAuthSyncInitialized = false;
      }
    };
  }, []);

  return { user, isLoading };
}
