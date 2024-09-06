'use server';

import type { ActionError } from '../../app/reviews/[slug]/actions'; 
import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth/auth';
import { createUser } from '@/lib/users';
import { db } from '@/lib/db';

// Maneja la acción de registro de usuario
export async function signUpAction(formData: FormData): Promise<undefined | ActionError> {

  // Extrae los datos del formulario
  const data = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
  };

  // Validación básica para asegurar que todos los campos estén completos
  if (!data.email || !data.name || !data.password) {
    return { isError: true, message: 'Todos los campos son obligatorios' };
  }

  // Verifica si el correo electrónico ya está registrado en la base de datos
  const existingUser = await db.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    return { isError: true, message: 'El correo electrónico ya está registrado' };
  }

  // Crea un nuevo usuario en la base de datos y redirige al usuario a la pagina e inicio
    const user = await createUser(data);
    await setSessionCookie(user);
    redirect('/');
}