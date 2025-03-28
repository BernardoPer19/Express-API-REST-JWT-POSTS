import { Router } from "express";
import { authoticate } from "../middlewares/authoticate.js";
import { PostController } from "../controllers/Post.Controller.js";

export const PostRoutes = Router();

PostRoutes.get("/", authoticate, PostController.getAllPosts);
PostRoutes.post("/", authoticate, PostController.createPost);
PostRoutes.delete("/:id", authoticate, PostController.deletePost);
