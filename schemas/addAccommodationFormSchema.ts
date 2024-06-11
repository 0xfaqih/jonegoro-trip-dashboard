import { z } from "zod";

export const formSchema = z.object({
   id: z.number().optional(),
   name: z.string().min(5, {
      message: "minimal 5 karakter.",
   }),
   image: z.string().min(0, "Harus terdapat gambar"),
   category: z.string({
      required_error: "Category is required",
   }),
   location: z.string().min(5, {
      message: "Lokasi minimal 4 karakter.",
   }),
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
