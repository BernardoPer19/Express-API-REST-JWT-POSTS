import pool from "../db/db.js";

export class PostModel {
  static async getAll(id) {
    try {
      const query = `SELECT * FROM post_tb WHERE user_id = $1`;
      const result = await pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      throw new Error("Error al obtener los posts");
    }
  }

  static async createPost(text, img_url, createAt, userId) {
    try {
      const query = `
        INSERT INTO post_tb (text, img_url, "createAt", user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const values = [text, img_url, createAt, userId];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Error al crear el post: " + error.message);
    }
  }

  static async getPostById(postId) {
    try {
      const query = `SELECT * FROM post_tb WHERE post_id = $1`;
      const result = await pool.query(query, [postId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al obtener el post:", error);
      throw new Error("Error al obtener el post");
    }
  }

  static async deletePost(postId, userId) {
    try {
      const query = `
        DELETE FROM post_tb
        WHERE post_id = $1 AND user_id = $2
        RETURNING *;
      `;
      const values = [postId, userId];

      const { rows } = await pool.query(query, values);

 
      return rows;
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw new Error("Error al eliminar el post");
    }
  }

  static async updatePost(post_id, text, img_url, user_id) {
    try {
      const query = `UPDATE post_tb
                     SET text = $2, img_url = $3, "createAt" = current_timestamp, user_id = $4
                     WHERE post_id = $1
                     RETURNING *`;

      const values = [post_id, text, img_url, user_id];

      const { rows, rowCount } = await pool.query(query, values);

      if (rowCount === 0) {
        throw new Error("No se encontró el post con el ID proporcionado.");
      }

      return rows[0];
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      throw new Error("Error al actualizar el post");
    }
  }
}
