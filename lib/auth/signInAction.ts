"use server";

import type { ActionError } from "../../app/reviews/[slug]/actions";
import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth/auth";
import { authenticateUser } from "@/lib/users";

// Maneja la acción de inicio de sesión.
export async function signInAction(formData: FormData,): Promise<undefined | ActionError> {

  // Extrae el correo electrónico y la contraseña del formulario.
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Llama a la función de autenticación para validar las credenciales proporcionadas.
  const user = await authenticateUser(email, password);
  if (!user) {
    return { isError: true, message: "Ingrese el nombre de usuario o la contraseña correcta" };
  }
 // Si la autenticación es exitosa, establece las cookies de sesión para el usuario.
  await setSessionCookie(user);
  redirect("/");
}
