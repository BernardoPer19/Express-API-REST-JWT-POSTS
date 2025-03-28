import { PostModel } from "../models/PostModel.js";

export class PostController {
  // Crear nuevo post
  static async createPost(req, res) {
    try {
      const { text, img_url } = req.body;
      const user_id = req.user.user_id; 

    
      if (!text) {
        return res.status(400).json({ message: "El texto del post es obligatorio." });
      }

      const createAt = new Date().toISOString(); 

      const newPost = await PostModel.createPost(text, img_url, req.user.user_name, createAt, user_id);

      return res.status(201).json({ message: "Post creado con éxito", post: newPost });
    } catch (error) {
      console.error("Error al crear el post:", error);
      return res.status(500).json({ message: "Error al crear el post", error: error.message });
    }
  }
}
