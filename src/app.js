import express from "express";
import morgan from "morgan";
import { AuthRoutes } from "./routes/Auth.routes.js";
import cookieParser from "cookie-parser";
import { PostRoutes } from "./routes/Post.Routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/user-home", PostRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
