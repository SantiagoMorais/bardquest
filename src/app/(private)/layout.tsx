import { Layout } from "@/components/layout";
import { OnboardingGuard } from "@/components/onboardingGuard";
import { PropsWithChildren } from "react";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <OnboardingGuard>
        <>{children}</>
      </OnboardingGuard>
    </Layout>
  );
}
