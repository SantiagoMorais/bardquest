import { z } from "zod";

const envSchema = z.object({
  DATABASE_ACCOUNT_PASSWORD: z.string().min(1),
  DATABASE_BASE_API_ACCESS: z.string().url(),
  DATABASE_PUBLIC_KEY: z.string().min(1),
  DATABASE_ANON_KEY: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;

export type Env = z.infer<typeof envSchema>;
