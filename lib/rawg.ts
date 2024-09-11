// lib/rawg.ts
const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY; // Guarda tu API key en las variables de entorno
const BASE_URL = "https://api.rawg.io/api";

// Función para hacer solicitudes GET genéricas con fetch
async function fetchFromRawg(endpoint:string) {
  const url = `${BASE_URL}${endpoint}?key=${RAWG_API_KEY}`;
  try{
    const response = await fetch(url)
    if(!response.ok){
      throw new Error(`Error en la solicitud: ${response.statusText}`)
    }

  const data = await response.json()
  return data;

  }catch(error){
    console.error("Error fetching the data from RAWG API: ", error)
  }
}

// Obtiene los detalles de un juego específico usando el slug.
export async function getGameDetails(slug: string) {
  return await fetchFromRawg(`/games/${slug}`);
}

// Obtiene las capturas de pantalla de un juego específico usando el slug.
export async function getGameScreenshots(slug: string) {
  const data = await fetchFromRawg(`/games/${slug}/screenshots`);
  return data || { results: [] };
}

// Obtiene los videos de un juego específico usando el slug.
// export async function getGameVideos(slug: string) {
//   const data = await fetchFromRawg(`/games/${slug}/movies`);
//   return data || { results: [] };
// }

