import { getXpToNextLevel } from "@/config/progression";
import { useSessionEffects } from "@/hooks/useSessionEffects";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import { PropsWithChildren } from "react";
import { ExperienceBar } from "./experience-bar";
import { Header } from "./header";
import styles from "./index.module.scss";
import { NewMissionModal } from "./newMissionModal";
import { PracticeButton } from "./practice-button";

type ISessionLayoutProps = PropsWithChildren & {
  userProfile: IUserProfileWithUser;
};

export const SessionLayout = ({ userProfile, children }: ISessionLayoutProps) => {
  const { missionModalOpen, setMissionModalOpen } = useSessionEffects({
    userProfile,
  });

  const { user } = userProfile;

  const latestMission = user.daily_missions?.at(-1) ?? null;

  return (
    <div className={styles.layout}>
      <Header
        streak={user.streak ?? 0}
        user={user}
        missions={user.daily_missions ?? []}
      />
      <main className={styles.main}>{children}</main>

      <PracticeButton
        lastPracticeDate={user.last_practice_date!}
        userId={user.id}
        streak={user.streak ?? 0}
        level={user.level ?? 1}
        xp={user.xp ?? 0}
      />

      <ExperienceBar
        xp={user.xp ?? 0}
        level={user.level ?? 1}
        xpForNextLevel={getXpToNextLevel({ level: user.level ?? 1 })}
      />

      <NewMissionModal
        mission={latestMission}
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
      />
    </div>
  );
};
