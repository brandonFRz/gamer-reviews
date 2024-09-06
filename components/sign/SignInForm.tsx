"use client";
import { signInAction } from "@/lib/auth/signInAction"; 
import Heading from "../ui/Heading";
import { useFormState } from "@/lib/hooks";

type SignInFormProps = {
  openSignUp: () => void;
};

//Componente formulario de inicio de sesión
export default function SignInForm({ openSignUp }: SignInFormProps) {
  
  // Hook personalizado para manejar el estado del formulario y la lógica de envío.
  const [state, handleSubmit] = useFormState(signInAction);

  // Función que se ejecuta cuando se envía el formulario.
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="m-auto rounded-md border-2 border-black">
        <div className="w-[28rem] rounded-t-md bg-red-700 p-5 text-center">
          <Heading>Inicia sesión con tu cuenta</Heading>
        </div>

        <div className="p-8 bg-white rounded-md">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-2">
              <label className="font-semibold" htmlFor="email">
                Dirección de correo
              </label>
              <input
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="font-semibold" htmlFor="password">
                Contraseña
              </label>
              <input
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                type="password"
                id="password"
                name="password"
                required
                autoComplete="current-password"
              />
            </div>
            {Boolean(state.error) && (
              <p className="text-red-700">{state.error?.message}</p>
            )}
            <button
              type="submit"
              className="mt-6 w-full justify-center rounded-lg bg-red-700 p-2 font-bold text-white hover:bg-red-800"
            >
              Inicia sesión
            </button>
          </form>
          <p className="mt-2">
            ¿Aun no tienes una cuenta?{" "}
            <button className="font-semibold hover:underline" onClick={openSignUp}>
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
