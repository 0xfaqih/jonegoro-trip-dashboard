import { z } from "zod";

export const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(5, {
    message: "Judul minimal 5 karakter.",
  }),
  image: z.string().min(1, "Harus terdapat banner"),
  price: z
    .preprocess((value) => {
      if (typeof value === "string") {
        return parseFloat(value);
      }
      return value;
    }, z.number().min(3, {
      message: "Harga minimal 3 karakter.",
    })),
});
