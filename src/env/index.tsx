import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLIC_KEY: z.string().min(1),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLIC_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
});

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error);
  throw new Error("Invalid environment variables");
}

export const env = _env.data;

export type Env = z.infer<typeof envSchema>;
