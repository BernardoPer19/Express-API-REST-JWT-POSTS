import { z } from "zod";

const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" }),
  email: z
    .string()
    .email({ message: "Formato de email inválido" })
    .max(100, { message: "El email no puede exceder los 100 caracteres" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100, { message: "La contraseña no puede exceder los 100 caracteres" }),
  phone: z
    .string()
    .optional(),
  createAt: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
  password: z.string().min(6, { message: "Contraseña inválida" }),
});

export const validateRegister = (input) => {
  return RegisterSchema.parse(input);
};

export const validateLogin = (input) => {
  return LoginSchema.parse(input);
};
