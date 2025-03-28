import { PostModel } from "../models/PostModel.js";

export class PostController {
  static async getAllPosts(req, res) {
    try {
      const userId = req.user.id;
      const result = await PostModel.getAll(userId);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Error al ver los datos de el post",
        error: error.message,
      });
    }
  }

  static async createPost(req, res) {
    const { text, img_url, createAt } = req.body;
    const userId = req.user.id;

    if (!text || !img_url || !createAt) {
      return res.status(400).json({ message: "Faltan datos necesarios" });
    }

    try {
      const post = await PostModel.createPost(text, img_url, createAt, userId);
      return res
        .status(201)
        .json({ message: "Post creado exitosamente", post });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al crear el post", error: error.message });
    }
  }
  static async deletePost(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("Post ID:", id);
    console.log("User ID:", userId);

    try {
      const result = await PostModel.deletePost(id, userId);

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Post no encontrado o no pertenece al usuario" });
      }

      return res
        .status(200)
        .json({ message: "Post eliminado exitosamente", result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al eliminar el post", error: error.message });
    }
  }
}
