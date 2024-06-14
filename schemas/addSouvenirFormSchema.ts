import { z } from "zod";

export const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(5, {
    message: "Judul minimal 5 karakter.",
  }),
  image: z.string().min(1, "Harus terdapat banner"),
  location: z.string().min(1, "Lokasi harus diisi"),
});
