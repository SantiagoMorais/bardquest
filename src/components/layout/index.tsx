import styles from "./index.module.scss";
import { PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/env";
import { redirect } from "next/navigation";
import { Header } from "./header";
import { PracticeButton } from "./practice-button";
import { ExperienceBar } from "./experience-bar";
import { IUser } from "@/interfaces/api/user";

const MOCK_USER: IUser = {
  id: "mock-uuid",
  email: "bardolin@bardquest.com",
  xp: 525,
  level: 5,
  streak: 3,
  last_practice_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

function xpForNextLevel(level: number): number {
  return level * 300;
}

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

  const currentUser = MOCK_USER;

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>

      <PracticeButton
        lastPracticeDate={currentUser.last_practice_date!}
        streak={currentUser.streak!}
      />

      <ExperienceBar
        xp={currentUser.xp!}
        level={currentUser.level!}
        xpForNextLevel={xpForNextLevel(currentUser.level!)}
      />
    </div>
  );
};
