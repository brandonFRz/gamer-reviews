"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Componente para manejar el cierre de sesión
export default function SignOutButton() {
  const router = useRouter();

  //Manejo del Cierre de sesión
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error en la solicitud de cierre de sesión:", error);
    }
  }

  // Formulario que envía la acción de cierre de sesión cuando se hace clic en el botón
  return (
    <form action={handleLogout}>
      <button className="mr-2 text-orange-800 hover:underline">
        Cerrar Sesión
      </button>
    </form>
  );
}
