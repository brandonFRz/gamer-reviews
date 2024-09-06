import React from "react";
import { deleteSessionCookie } from "@/lib/auth/auth";

// Componente para manejar el cierre de sesión
export default function SignOutButton() {
  // Acción que se ejecuta al hacer clic en el botón para cerrar sesión
  async function action() {
    "use server";
    // Elimina la cookie de sesión para cerrar la sesión del usuario
    deleteSessionCookie();
  }
  
  // Formulario que envía la acción de cierre de sesión cuando se hace clic en el botón
  return (
    <form action={action}>
      <button className="mr-2 text-orange-800 hover:underline">
        Cerrar Sesión
      </button>
    </form>
  );
}
