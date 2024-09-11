import { jwtVerify } from "jose"; //Verify and sign JWT from jose library
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);//Cifra el JWT utilizando una clave secreta obtenida de las variables de entorno.

// Obtiene el usuario autenticado de la sesión actual.
export async function getUserFromSession() {
  // Obtiene el valor del token de la cookie de sesión.
  const sessionToken = cookies()
  const token = sessionToken.get('session'); // Obtén la cookie de sesión con el JWT

  if (!token) {
    return null
  }


try{
  // Verifica y decodifica el JWT 
const {payload} = await jwtVerify(token.value, JWT_SECRET)

    // Retorna el payload decodificado
    return {
      id: payload.id,
      email: payload.email,
      name: payload.username,
      jwt: token.value, 
    };


}catch(error){
  console.error("Error al verificar el JWT:", error);
  return null;
}

}

export async function setSessionCookie({ jwt, id, email, name }: { jwt: string, id: string, email: string, name: string }) {
  const cookieStore = cookies();

  // Guarda el token en una cookie llamada 'session' con opciones adecuadas
  cookieStore.set('session', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

}
