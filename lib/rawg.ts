// lib/rawg.ts
import axios from "axios";

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY; // Guarda tu API key en las variables de entorno

// Configura una instancia de axios para interactuar con la API de RAWG
const rawgApi = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: RAWG_API_KEY,
  },
});

// Obtiene los detalles de un juego específico usando el slug.
export async function getGameDetails(slug: string) {
  try {
    const { data } = await rawgApi.get(`/games/${slug}`);
    return data;
  } catch (error) {
    console.error("Error fetching the details.", error);
    return null;
  }
}

// Obtiene las capturas de pantalla de un juego específico usando el slug.
export async function getGameScreenshots(slug: string) {
  try {
    const { data } = await rawgApi.get(`/games/${slug}/screenshots`);
    return data;
  } catch (error) {
    console.log("Error fetching the screenshots", error);
    return { results: [] };
  }
}

// Obtiene los videos de un juego específico usando el slug.
// export async function getGameVideos(slug: string) {
//   try {
//     const { data } = await rawgApi.get(`/games/${slug}/movies`);
//     return data;
//   } catch (error) {
//     console.log("Error fetching the videos", error);
//     return { results: [] };
//   }
// }
