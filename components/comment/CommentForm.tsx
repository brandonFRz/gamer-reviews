"use client";
import { createCommentAction } from "@/app/reviews/[slug]/actions";
import { useFormState } from "@/lib/hooks";

///Interfaces///
interface CommentFormProps {
  slug: string;
  title: string;
  userName: string
}


export default function CommentForm({ slug, title, userName }: CommentFormProps) {
  
  // Se utiliza el hook useFormState para gestionar el estado del formulario y la función de envío
  const [state, handleSubmit] = useFormState(createCommentAction)

return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 mt-4 flex flex-col gap-2 rounded-md border-2 border-gray-400 bg-white p-3"
    >
      {/* Mensaje de bienvenida que invita al usuario a dejar un comentario */}
      <p className="pb-1">
        Ya has jugado a <strong>{title}</strong>, comparte tu opinión.
      </p>
      {/* Campo oculto para enviar el slug al servidor */}
      <input type="hidden" name="slug" value={slug} />

      {/* Mostrar el nombre del usuario que está dejando el comentario */}
      <div className="flex">
        <label className="w-32 text-lg">Tu nombre</label>
        <span className="font-semibold">{userName}</span>
      </div>

      {/* Campo de texto donde el usuario escribe su comentario */}
      <div className="flex">
        <label className="w-32 shrink-0 text-lg">Tu comentario</label>
        <textarea
          name="message"
          className="h-24 w-80 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
          id="messageField"
        />
      </div>
      
      {/* Mostrar mensaje de error si ocurre alguno al enviar el comentario */}
      {Boolean(state.error) && <p className="text-red-700">{state.error?.message}</p>}
      <button
        className="ml-auto self-center rounded-md border bg-red-800 px-6 py-1 font-bold text-white hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-80"
        type="submit"
        disabled={state.loading}
      >
        {state.loading ? 'Enviando' : 'Enviar'}
      </button>
    </form>
  );
}

