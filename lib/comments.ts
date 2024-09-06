import { z } from "zod";
import { db } from "./db";
import { Comment } from "@prisma/client";

// Define el tipo 'CreateCommentData' como una versión del tipo 'Comment' sin los campos 'id' y 'postedAt'.
export type CreateCommentData = Omit<Comment, "id" | "postedAt">;

// Crea un nuevo comentario en la base de datos.
export async function createComment({
  slug,      // Identificador de la reseña a la que pertenece el comentario.
  userId,    // ID del usuario que realizó el comentario.
  message,   // Contenido del mensaje del comentario.
}: CreateCommentData) {
  return await db.comment.create({
    data: { slug, userId, message },  // Datos a insertar en la tabla 'comment'.
  });
}

// Obtiene los comentarios de la base de datos para una reseña o artículo específico.
export async function getComments(slug: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return await db.comment.findMany({
    where: { slug },// Condición para filtrar comentarios por el 'slug' dado.
    orderBy: { postedAt: "desc" }, // Ordena los comentarios por fecha de publicación en orden descendente.
    include:{
      user:{
        select:{name:true} // Incluye el nombre del usuario en los resultados
      }
    }
  });
}

// Esquema de validación utilizando Zod.
export const commentSchema = z.object({
  slug: z.string().min(1, "El identificador de la reseña es obligatorio"),
  userId: z.string().min(1, "El nombre de usuario es obligatorio"),
  message: z.string().min(1, "Necesitas escribir un mensaje").max(500, "El mensaje no puede ser mayor a 500 caracteres"),
});
