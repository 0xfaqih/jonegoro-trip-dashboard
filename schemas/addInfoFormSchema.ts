import { z } from "zod";

export const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5, {
    message: "Judul minimal 5 karakter.",
  }),
  banner: z.string().min(1, "Harus terdapat banner"),
  content: z.string().min(10, {
    message: "Konten minimal 10 karakter.",
  }),
});
