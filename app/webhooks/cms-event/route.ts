import { CACHE_TAG_REVIEWS } from "@/lib/reviews";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// Implementa un webhook que, al recibir una solicitud POST, revalida las páginas relacionadas.
export async function POST(request: NextRequest) {
  const payload = await request.json();
  // Si el payload existe, procede a revalidar la caché asociada con CACHE_TAG_REVIEWS
  if(payload){
    revalidateTag(CACHE_TAG_REVIEWS)
  }
  // Devuelve una respuesta vacía con un estado HTTP 204 (sin contenido)
  return new Response(null, { status: 204 });
}
