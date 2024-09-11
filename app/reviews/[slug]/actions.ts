"use server";
import { createComment, commentSchema, CreateCommentData } from "@/lib/comments";
import { getUserFromSession } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

///Interfaces///
export interface ActionError {
  isError: boolean;
  message: string;
}

// Maneja la creación de comentarios
export async function createCommentAction(formData: FormData): Promise<undefined | ActionError> {

  // Obtiene el usuario de la sesión
  const user = await getUserFromSession();

  // Verifica si el usuario está autenticado
  if (!user) {
    throw new Error('Acceso no autorizado');
  }

  // Extrae el token JWT y el ID del usuario desde la sesión
  const token = user.jwt; // Asegúrate de que 'jwt' sea parte del objeto `user`
  const userId = user.id;

  // Extrae los datos del formulario y los asigna a un objeto `data`
  const data: CreateCommentData = {
    reviewId: formData.get("id") as string,
    userId: userId as string,      
    message: formData.get("message") as string,
    token: token         
  };

  
  // Valida los comentarios usando el esquema definido en `commentSchema`.
  const validationResults = commentSchema.safeParse(data);
  if (!validationResults.success) {
    return { isError: true, message: validationResults.error.errors[0].message };
  }

  // Crea el comentario si la validación es exitosa, pasando el JWT
  await createComment(data);

  // Revalida el cache y redirige al usuario de vuelta a la página de la reseña.
  revalidatePath(`/reviews`);
}
