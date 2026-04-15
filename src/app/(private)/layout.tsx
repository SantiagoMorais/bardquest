import { Layout } from "@/components/layout";
import { OnboardingGuard } from "@/components/onboardingGuard";
import { PropsWithChildren } from "react";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    // <OnboardingGuard>
    //   <Layout>
    <>{children}</>
    //     </Layout>
    // </OnboardingGuard>
  );
}
