"use client";

import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";

let hasBootstrappedAuth = false;
let isBootstrappingAuth = false;
let authSubscription: { unsubscribe: () => void } | null = null;

async function bootstrapAuth() {
  if (hasBootstrappedAuth || isBootstrappingAuth) return;

  isBootstrappingAuth = true;
  useAuthStore.getState().setIsLoading(true);

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    useAuthStore.getState().setUser(session?.user ?? null);

    if (!authSubscription) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        useAuthStore.getState().setUser(session?.user ?? null);
        useAuthStore.getState().setInitialized(true);
        useAuthStore.getState().setIsLoading(false);
      });

      authSubscription = subscription;
    }

    hasBootstrappedAuth = true;
  } catch {
    useAuthStore.getState().setUser(null);
  } finally {
    useAuthStore.getState().setInitialized(true);
    useAuthStore.getState().setIsLoading(false);
    isBootstrappingAuth = false;
  }
}

export function useAuth(): { user: User | null; isLoading: boolean } {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    void bootstrapAuth();
  }, []);

  return { user, isLoading };
}
