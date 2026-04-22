import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { LayoutClient } from "./layoutClient";

export const Layout = async ({ children }: PropsWithChildren) => {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  return <LayoutClient user={user}>{children}</LayoutClient>;
};
