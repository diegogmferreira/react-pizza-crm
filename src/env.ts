import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["development", "production", "test"]),
  VITE_API_URL: z.string(),
  VITE_ENABLE_API_DELAY: z.string().transform((v) => v === "true"),
})

export const env = envSchema.parse(import.meta.env);

// if (!env.success) {
//   throw new Error(`Invalid environment variables: ${env.error.issues.map((i) => i.message).join(', ')}`);
// }