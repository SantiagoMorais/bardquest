"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "@/components/toast";
import { useAuth } from "@/hooks/useAuth";

interface IProvidersProps {
  children: ReactNode;
}

const AuthBootstrap = () => {
  useAuth();
  return null;
};

export const Providers = ({ children }: IProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
