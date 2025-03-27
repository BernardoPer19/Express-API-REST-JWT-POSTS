import AuthModel from "../models/AuthModel.js";
import { validateRegister } from "../schemas/AuthSchema.js";

export class AuthController {
  static async registerUsers(req, res) {
    try {
      const validatedData = validateRegister(req.body);

      const { name, email, password, phone, createAt } = validatedData;

      const foundUser = await AuthModel.verifyByEmail(email);
      if (foundUser) {
        return res
          .status(400)
          .json({ message: "El correo ya está registrado" });
      }

      const hashedPassword = await AuthModel.hashPassword(password);

      const newUser = await AuthModel.registerUser({
        name,
        email,
        password: hashedPassword,
        phone,
        createAt,
      });

      return res.status(201).json({
        message: "Usuario registrado",
        newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;


      const userResult = await AuthModel.verifyByEmail(email);
      if (!userResult.success) {
        return res
          .status(401)
          .json({ message: "El correo NO está registrado" });
      }
      const user = userResult.user;

      const isValidPassword =  AuthModel.comparePasswords(
        password,
        user.password
      );

      if (!isValidPassword) {
        return res.status(401).json({ message: "La contraseña es incorrecta" });
      }

      const token = await AuthModel.createToken(user);

      const options = {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60,
      };

      res
        .cookie("access_token", token, options)
        .status(200)
        .json({ message: "Login exitoso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el login", error: error.message });
    }
  }

  static protectedRoute = (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Usuario no autorizado" });
      }
      return res
        .status(200)
        .json({ message: "Usuario autorizado", user: req.user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en la solicitud", error: error.message });
    }
  };
}
