"use server";

import type { ActionError } from "../../app/reviews/[slug]/actions";
import { setSessionCookie } from "@/lib/auth/auth";
const CMS_URL = process.env.NEXT_PUBLIC_API_URL;// URL del CMS

// Maneja la acción de inicio de sesión.
export async function signInAction(formData: FormData): Promise<undefined | ActionError> {
  // Extrae el correo electrónico y la contraseña del formulario.
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(`${CMS_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password }),
    });
    const result = await response.json();

    // Manejo de errores
    if (!response.ok) {
      // Error por credenciales incorrectas
      if (result.error?.message?.toLowerCase().includes("usuario no encontrado")) {
        return { isError: true, message: "Usuario no encontrado" };
      }
      if (result.error?.message?.toLowerCase().includes("contraseña incorrecta")) {
        return { isError: true, message: "Contraseña incorrecta" };
      }

      // Error genérico o del servidor
      return { isError: true, message: result.error?.message || "Hubo un error al intentar iniciar sesión" };
    }
      
      //Establece la cookie de sesión
      const { jwt, user } = result;
      await setSessionCookie({
        jwt: jwt,
        id: user.id,
        email: user.email,
        name: user.username,
      });

  } catch (error) {
    console.error("Error en el inicio de sesión");
    return { isError: true, message: "Hubo un error inesperado al procesar el inicio de sesión" };
  }
}
