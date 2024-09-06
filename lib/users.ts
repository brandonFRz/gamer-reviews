import type { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { db } from './db';

// Define el tipo de datos para crear un nuevo usuario, excluyendo 'id' y 'passwordHash', e incluyendo 'password'
export type CreateUserData = Omit<User, 'id' | 'passwordHash'> & { password: string };

// Valida el correo electrónico y la contraseña del usuario
export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  });
    // Verifica si el usuario existe y si la contraseña proporcionada coincide con el hash almacenado.
  if (user && await compare(password, user.passwordHash)) {
    return user;// Retorna el usuario si la autenticación es exitosa
  }
}

// Crea un nuevo usuario
export async function createUser({ email, name, password }: CreateUserData) {
  // Cifra la contraseña proporcionada
  const passwordHash = await hash(password, 10);

  // Crea un nuevo usuario en la base de datos con el correo, nombre y el hash de la contraseña
  return await db.user.create({
    data: { email, name, passwordHash }, 
  });
}
