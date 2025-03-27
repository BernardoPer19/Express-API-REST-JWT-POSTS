import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";
import { JWT_PASSWORD } from "../confing.js";

class AuthModel {
  static async createToken(user) {
    if (!JWT_PASSWORD) {
      throw new Error("JWT_SECRET_PASSWORD no está definido");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createAt: user.createAt,
      },
      JWT_PASSWORD,
      { expiresIn: "2h" }
    );

    if (!token) {
      throw new Error("El token no pudo ser generado.");
    }

    return token;
  }
  static comparePasswords(plainPassword, hashedPassword) {
    try {
      const isMatch = bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error("Error comparing passwords: " + error.message);
    }
  }

  static async hashPassword(password) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password: " + error.message);
    }
  }

  static async registerUser({ name, email, password, phone, createAt }) {
    try {
      const hashedPassword = await this.hashPassword(password);

      const query = `
          INSERT INTO users_tb (name, email, password, phone, "createAt")
          VALUES ($1, $2, $3, $4, $5)
          RETURNING user_id, name, email, phone, "createAt";
        `;

      const values = [name, email, hashedPassword, phone, createAt];

      const result = await pool.query(query, values);

      return { success: true, user: result.rows[0] };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error(
        "Error registering user: AAAAAAAAAAAAAAAAAAA" + error.message
      );
    }
  }

  static async verifyByEmail(email) {
    try {
      const query = `SELECT * FROM users_tb WHERE email = $1;`;
      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
        return { success: false, message: "Usuario no encontrado" };
      }

      return { success: true, user: result.rows[0] };
    } catch (error) {
      throw new Error("Error verifying email: " + error.message);
    }
  }
}
export default AuthModel;
