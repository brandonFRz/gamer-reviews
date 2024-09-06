"use client";
import { signUpAction } from "@/lib/auth/signUpAction";
import Heading from "../ui/Heading";
import { useFormState } from "@/lib/hooks";

type SignUpFormProps = {
  openSignIn: () => void;
};

// Formulario de registro de usuario
export default function SignUpForm({  openSignIn }: SignUpFormProps) {

  // Usa el hook useFormState para manejar el estado del formulario y la función de envío
  const [state, handleSubmit] = useFormState(signUpAction);

  // Función que se ejecuta cuando se envía el formulario.
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="m-auto rounded-md border-2 border-black">
        <div className="w-[30rem] rounded-t-md bg-red-700 pt-8 pb-5 text-center">
          <Heading>Regístrate si no tienes cuenta</Heading>
        </div>

        <div className="p-8 bg-white rounded-md">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-2 flex justify-between">
              <label className="font-semibold" htmlFor="email">
                Dirección de correo
              </label>
              <input
                className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="mb-2 flex justify-between">
              <label className="font-semibold" htmlFor="name">
                Nombre de usuario
              </label>
              <input
                className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="flex justify-between">
              <label className="font-semibold" htmlFor="password">
                Contraseña
              </label>
              <input
                className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
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
              className="mt-5 w-full justify-center rounded-lg bg-red-700 p-2 font-bold text-white hover:bg-red-800"
            >
              Crea una cuenta
            </button>
          </form>
          <p className="mt-2">
            ¿Ya tienes cuenta?{" "}
            <button className="font-semibold hover:underline" onClick={openSignIn}>
              Inicia Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
