"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
}
