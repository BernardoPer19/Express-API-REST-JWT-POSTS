import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../confing.js";

export const authoticate = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado. No se encontró el token." });
    }

    const verify = jwt.verify(token, JWT_PASSWORD);

    req.user = verify;

    next();
  } catch(error) {
    return res
      .status(401)
      .json(error.message);
  }
};
