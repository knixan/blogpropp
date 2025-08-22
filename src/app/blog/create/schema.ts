import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(3).max(50),
});

export type BlogValues = z.infer<typeof BlogSchema>;
