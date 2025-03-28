import { Router } from "express";
import { AuthController } from "../controllers/Auth.Controller.js";
import { authoticate } from "../middlewares/authoticate.js";
import { PostController } from "../controllers/Post.Controller.js";

export const AuthRoutes = Router();

AuthRoutes.post("/register", AuthController.registerUsers);
AuthRoutes.post("/login", AuthController.loginUser);
AuthRoutes.get("/protected", authoticate, AuthController.protectedRoute);
AuthRoutes.post("/posts", authoticate, PostController.createPost);
AuthRoutes.post("/logout", authoticate, AuthController.logout); 
