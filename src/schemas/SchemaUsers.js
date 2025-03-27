import { z } from 'zod';

// Esquema de validación con Zod
const userSchema = z.object({
    user_id: z.string().nonempty("user_id es requerido"),
    name: z.string().nonempty("El nombre es requerido"),
    email: z.string().email("Debe ser un email válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    createdAt: z.date().default(() => new Date()),
    phone: z.string().nonempty("El teléfono es requerido")
});

// Función para validar los datos
const validateUser = (data) => {
    try {
        return { valid: true, data: userSchema.parse(data) };
    } catch (error) {
        return { valid: false, errors: error.errors };
    }
};

export default { validateUser };