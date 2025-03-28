import { PostModel } from "../models/PostModel.js";


export class PostController {
  static async createPost(req, res) {
    const { text, img_url, createAt } = req.body;
    const userId = req.user.id; 

    if (!text || !img_url || !createAt) {
      return res.status(400).json({ message: "Faltan datos necesarios" });
    }

    try {
      const post = await PostModel.createPost(text, img_url, createAt, userId); 
      return res.status(201).json({ message: "Post creado exitosamente", post });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el post", error: error.message });
    }
  }
}
  
  
