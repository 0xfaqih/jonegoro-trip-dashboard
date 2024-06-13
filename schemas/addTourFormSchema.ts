import { z } from "zod";

export const formSchema = z.object({
  tour_name: z.string().min(2, {
    message: "tour_name must be at least 2 characters.",
  }),
  place: z.string().min(3, {
    message: "Place must be at least 3 characters.",
  }),
  rating: z.string().min(1, {
    message: "Rating must be at least 1.",
  }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  images: z.array(z.string()).nonempty("At least one image is required"),
});
