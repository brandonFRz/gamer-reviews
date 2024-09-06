"use client";
import { useState } from "react";
import Modal from "./Modal";
import SignInForm from "../sign/SignInForm";
import SignUpForm from "../sign/SignUpForm";

type AuthModalProps = {
  initialMode: "signIn" | "signUp" | null;
  onClose: () => void;
};

// Componente que maneja el estado y la representación del modal de autenticación
export default function AuthModal({ initialMode, onClose }: AuthModalProps) {
   // Estado para controlar qué formulario mostrar ("signIn" o "signUp")
  const [isModalOpen, setIsModalOpen] = useState<"signIn" | "signUp" | null>(initialMode);

   // Dependiendo del valor de isModalOpen, muestra SignInForm o SignUpForm
  return (
    <Modal isOpen={!!isModalOpen} onClose={onClose}>
      {isModalOpen === "signIn" && <SignInForm openSignUp={() => setIsModalOpen("signUp")} />}
      {isModalOpen === "signUp" && <SignUpForm openSignIn={() => setIsModalOpen("signIn")} />}
    </Modal>
  );
}
