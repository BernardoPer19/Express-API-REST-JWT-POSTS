import { z } from "zod";

// Define the schema for a Post
const PostSchema = z.object({
    text: z
        .string()
        .min(1, "Text cannot be empty.")
        .max(500, "Text cannot exceed 500 characters."),
    img_url: z.string().url("Invalid image URL format."),
   
    createAt: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid date format."),
});

function validatePost(data) {
  const result = PostSchema.safeParse(data);
  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    return null;
  }
  return result.data;
}

export default { PostSchema, validatePost };
