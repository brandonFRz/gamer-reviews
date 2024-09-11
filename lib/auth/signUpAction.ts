"use server";

import type { ActionError } from "../../app/reviews/[slug]/actions";
import { setSessionCookie } from "@/lib/auth/auth";
const CMS_URL = process.env.NEXT_PUBLIC_API_URL;

// Maneja la acción de registro de usuario
export async function signUpAction(
  formData: FormData
): Promise<undefined | ActionError> {
  // Extrae los datos del formulario
  const data = {
    email: formData.get("email") as string,
    username: formData.get("name") as string,
    password: formData.get("password") as string,
  };

  // Validación básica para asegurar que todos los campos estén completos
  if (!data.email || !data.username || !data.password) {
    return { isError: true, message: "Todos los campos son obligatorios" };
  }

  try {
    const response = await fetch(
      `${CMS_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    // Validación en el backend (verifica si el correo o el username ya están en uso)
    if (!response.ok) {
      let errorMsg = result.error?.message || "Error al registrarse";
      if (
        errorMsg
          .toLowerCase()
          .includes("password must be at least 6 characters")
      ) {
        errorMsg = "La contraseña debe tener al menos 6 caracteres";
      } else if (errorMsg.toLowerCase().includes("email already taken")) {
        errorMsg = "El correo electrónico ya está registrado";
      } else if (errorMsg.toLowerCase().includes("username already taken")) {
        errorMsg = "El nombre de usuario ya está en uso";
      } else if (errorMsg.toLowerCase().includes("2 errors occurred")) {
        errorMsg = "La contraseña y el nombre de usuario deben ser mas largos";
      }
      return { isError: true, message: errorMsg };
    }

    // Establece la cookie de sesión con el token JWT
    const { jwt, user } = result;
    await setSessionCookie({
      jwt: jwt,
      id: user.id,
      email: user.email,
      name: user.username,
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return { isError: true, message: "Hubo un error al procesar el registro" };
  }
}
