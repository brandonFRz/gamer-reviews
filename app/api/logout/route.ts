import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Elimina la cookie de sesión
  const cookieStore = cookies();
  cookieStore.delete('session');

  // Redirecciona al usuario o devuelve una respuesta adecuada
  return NextResponse.json({ message: 'Sesión cerrada correctamente' });
}
