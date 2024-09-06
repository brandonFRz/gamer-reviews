import { jwtVerify, SignJWT } from "jose"; //Verify and sign JWT from jose library
import { cookies } from "next/headers";
import { cache } from "react";

const JWT_COOKIE = "sessionToken"; // Nombre de la cookie donde se almacena el token de sesión.
const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; //Duración del token de sesión (2 semanas en milisegundos).
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);//Cifra el JWT utilizando una clave secreta obtenida de las variables de entorno.

type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
};

// Función para eliminar la cookie de sesión.
export function deleteSessionCookie(){
    cookies().delete(JWT_COOKIE)
}

// Decodifica el token de sesión y verifica su validez.
const decodeSessionToken = cache(async(sessionToken:string)=>{
  try {
    // Verifica el token de sesión utilizando la clave secreta JWT.
    const { payload } = await jwtVerify<AuthenticatedUser>(
      sessionToken,
      JWT_SECRET,
    );
    return payload;
  } catch (error) {
    console.error("Invalid JWT", error);// Muestra un mensaje de error si el JWT no es válido.
  }
})

// Obtiene el usuario autenticado de la sesión actual.
export async function getUserFromSession(): Promise<
  AuthenticatedUser | undefined
> {
  // Obtiene el valor del token de la cookie de sesión.
  const sessionToken = cookies().get(JWT_COOKIE)?.value;

  // Decodifica y verifica el token si existe.
  if (sessionToken) {
    return decodeSessionToken(sessionToken)
  }
}

// Función para establecer la cookie de sesión.
export async function setSessionCookie({id, email, name}: AuthenticatedUser) {
  //Calculate the expedition token
  const expirationTime = new Date(Date.now() + JWT_DURATION);

  // Firma un nuevo token JWT con los datos del usuario autenticado.
  const sessionToken = await new SignJWT({id, email, name})
    .setProtectedHeader({ alg: "HS256" })// Establece el encabezado protegido con el algoritmo HS256.
    .setExpirationTime(expirationTime)// Establece el tiempo de expiración del token.
    .sign(JWT_SECRET);// Firma el token con la clave secreta.

  // Establece la cookie de sesión con el token JWT firmado.
  cookies().set(JWT_COOKIE, sessionToken,{
    expires: expirationTime,//tiempo de expiración
    httpOnly: true, // Marca la cookie como accesible solo desde HTTP.
    sameSite: 'lax', // Establece la política SameSite de la cookie como 'lax'.
  });
}