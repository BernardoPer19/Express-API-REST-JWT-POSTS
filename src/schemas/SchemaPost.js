import { z } from "zod";

// Define the schema for a Post
const PostSchema = z.object({
    post_id: z.number().int("Invalid post_id format. Must be an integer."),
    text: z
        .string()
        .min(1, "Text cannot be empty.")
        .max(500, "Text cannot exceed 500 characters."),
    img_url: z.string().url("Invalid image URL format."),
    user_name: z
        .string()
        .min(3, "User name must be at least 3 characters long.")
        .max(50, "User name cannot exceed 50 characters."),
    createAt: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid date format."),
    user_id: z.number().int("Invalid user_id format. Must be an integer."),
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
