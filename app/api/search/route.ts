import { NextRequest, NextResponse } from 'next/server';
import { searchReviews } from '@/lib/reviews';

// Maneja las solicitudes GET al path /api/search
export async function GET(request: NextRequest) {
    // Obtiene el valor de los parámetros de búsqueda, en este caso 'query'
  const query = request.nextUrl.searchParams.get('query') || '';
    // Llama a la función searchReviews con el query para buscar coincidencias en las reseñas
  const reviews = await searchReviews(query);
    // Devuelve las reseñas obtenidas en formato JSON
  return NextResponse.json(reviews);
}
