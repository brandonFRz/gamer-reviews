import { ActionError } from "@/app/reviews/[slug]/actions";
import { FormEvent, useState } from "react";

///Interfaces///
interface SubmissionState {
  loading: boolean;
  error: ActionError | null;
}

export type ActionFunction = (
  formData: FormData,
) => Promise<undefined | ActionError>;


//Custom Hook que gestiona el estado del envío del formulario.
export function useFormState(
  action: ActionFunction, 
): [SubmissionState, (event: FormEvent<HTMLFormElement>) => Promise<void>] {

  // Estado para hacer seguimiento del estado de carga y posibles errores.
  const [state, setState] = useState<SubmissionState>({
    loading: false,
    error: null,
  });

  // Función para manejar el envío del formulario
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();  
    setState({ loading: true, error: null });

    const form = event.currentTarget;// Obtiene el formulario actual del evento.
    const formData = new FormData(form);// Crea un objeto formData con los datos del formulario.

    //Llama a la función de acción con los datos del formulario y espera el resultado.
    const result = await action(formData);
    if (result?.isError) {
      // Si hay un error, actualiza el estado con el mensaje de error
      setState({ loading: false, error: result });
    } else {
      // Si el envío es exitoso, resetea el formulario y actualiza el estado para indicar éxito.
      form.reset();
      setState({ loading: false, error: null });
    }
  }
  // Devuelve el estado de carga y error, y la función handleSubmit.
  return [state, handleSubmit];
}
