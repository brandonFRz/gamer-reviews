import { MouseEvent, ReactNode } from "react";

// Props que el componente Modal recibe
type ModalProps = {
  isOpen: boolean;// Indica si el modal está abierto o no
  onClose: () => void; // Función para cerrar el modal
  children: ReactNode; // Contenido del modal
};

// Componente Modal para mostrar un formulario de inicio de sesión o registro
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Si el modal no está abierto, no se renderiza nada
  if (!isOpen) return null;

  // Maneja el clic en el fondo para cerrar el modal
  function handleBackgroundClick(event: MouseEvent<HTMLDivElement>){
    if(event.target === event?.currentTarget){
      onClose();
    }
  }

  // Renderiza el modal en el centro de la página
  return (
    <div onClick={handleBackgroundClick} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative">
        <button
          className="absolute top-12 right-10 p-2 text-white hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}