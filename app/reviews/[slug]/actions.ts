"use server";
import { createComment, commentSchema, CreateCommentData } from "@/lib/comments";
import { getUserFromSession } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

///Interfaces///
export interface ActionError {
  isError: boolean;
  message: string;
}

// Maneja la creación de comentarios
export async function createCommentAction(formData: FormData): Promise<undefined | ActionError> {
  const user = await getUserFromSession();
  if (!user) {
    throw new Error('Acceso no autorizado');
  }

   // Extrae los datos del formulario y los asigna a un objeto `data`
  const data: CreateCommentData = {
    slug: formData.get("slug") as string,
    userId: user.id,
    message: formData.get("message") as string,
  };

   // Valida los comentarios usando el esquema definido en `commentSchema`.
  const validationResults = commentSchema.safeParse(data);
  if (!validationResults.success) {
    return { isError: true, message: validationResults.error.errors[0].message };
  }

  // Crea el comentario si la validación es exitosa
  await createComment(data);
  
  //Revalida el cache y redirige al usuario de vuelta a la pagina de la reseña.
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}
