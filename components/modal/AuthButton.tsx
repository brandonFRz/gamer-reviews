"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";

type AuthButtonProps = {
    mode: "signIn" | "signUp";
};

//Controla cuando el AuthModal deberia de abrirse y en que modo 'login' o 'registro'
export default function AuthButton({ mode }: AuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<"signIn" | "signUp" | null>(null);

  const handleOpen = () => setIsModalOpen(mode);
  const handleClose = () => setIsModalOpen(null);

  return (
    <>
      <button onClick={handleOpen} className="text-orange-800 hover:underline text-end">
        {mode === "signIn" ? "Inicia Sesión" : "Registrarse"}
      </button>
      {isModalOpen && <AuthModal initialMode={mode} onClose={handleClose} />}
    </>
  );
}
