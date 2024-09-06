"use client";
// Importa el spinner
import PacmanLoader from "react-spinners/PacmanLoader";

function LoadingSpinner() {

  //Muestra un spinner de carga centrado en la pantalla.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <PacmanLoader color="#f1d664" speedMultiplier={2} size={50} />
    </div>
  );
}

export default LoadingSpinner;
