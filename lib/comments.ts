import { z } from "zod";
const CMS_URL = process.env.NEXT_PUBLIC_API_URL;// URL del CMS

// Define el tipo 'CreateCommentData'.
export type CreateCommentData = {
  reviewId: string;   // ID de la reseña relacionada.
  token: string;
  userId: string;     // ID del usuario.
  message: string;    // Contenido del comentario.
};


// Crea un nuevo comentario en Strapi.
export async function createComment(data: CreateCommentData) {  
  const response = await fetch(`${CMS_URL}/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}` // O el token adecuado según tu autenticación
    },
    body: JSON.stringify({
      data: {
        message: data.message,
        review: data.reviewId,
        user: data.userId
      }
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Error al crear comentario:", errorDetails);
    throw new Error(`Failed to create comment: ${errorDetails.message || "Sin mensaje de error"}`);
  }


  return response.json();
}

// Obtiene los comentarios desde Strapi relacionados con una reseña específica.
export async function getComments(reviewId: string) {
  const response = await fetch(`${CMS_URL}/api/comments?filters[review][id][$eq]=${reviewId}&populate=user`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  // Mapea los datos para un formato más fácil de usar en el componente
  const { data } = await response.json();
  return data.map((item:any)=>({
    id: item.id,
    message:item.attributes.message,
    username: item.attributes.user?.data?.attributes?.username,
  }));
}

// Validación del comentario
export const commentSchema = z.object({
  message: z.string().min(1, "Necesitas escribir un mensaje").max(500, "El mensaje no puede ser mayor a 500 caracteres"),
});
