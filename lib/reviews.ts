import { marked } from "marked";
import qs from "qs";
export const CACHE_TAG_REVIEWS = 'reviews';// Etiqueta de caché para las reseñas
const CMS_URL = process.env.NEXT_PUBLIC_API_URL;// URL del CMS


///Interfaces///
interface CmsItem {
  id: string;
  attributes: any;
}

export interface Review {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  conclusion:string
  points:{
    positivePoints:[],
    negativePoints:[]
  }
}
 interface FullReview extends Review {
  body: any;
  
}

 interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}

export type SearchableReview = Pick<Review, 'slug' | 'title'>

// Obtiene una reseña por su slug, incluyendo el cuerpo convertido de markdown a HTML.
export async function getReview(slug: string): Promise<FullReview | null> {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body', 'conclusion' , 'points'],
    // populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;// Retorna null si no se encuentra la reseña
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),// Convierte el cuerpo de markdown a HTML
  };
}

// Obtiene un conjunto de reseñas, ordenadas por su fecha de publicación en orden descendente.
export async function getReviews(pageSize: number, page?: number): Promise<PaginatedReviews> {
  const { data, meta } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    // populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page },
  });
  
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview),
  };
}

// Obtiene una lista de slugs de todas las reseñas.
export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  });
  return data.map((item: CmsItem) => item.attributes.slug);
}

// Busca reseñas por título que contengan la cadena 'query'.
export async function searchReviews(query: string): Promise<SearchableReview[]> {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ['slug', 'title'],
    sort: ['title'],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }:any) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}


/// Funciones auxiliares ///

// Realiza una solicitud HTTP al CMS con los parámetros dados y maneja los errores.
async function fetchReviews(parameters: any) {
  const url = `${CMS_URL}/api/reviews?`
    + qs.stringify(parameters, { encodeValuesOnly: true });

  const response = await fetch(url, {
    next: {
      // revalidate:30, 30sec
      tags: [CACHE_TAG_REVIEWS],
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}


// Convierte un item del CMS a un objeto 'Review'.
function toReview(item: CmsItem): Review {
  const { attributes, id } = item;
  return {
    id,
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    conclusion: attributes.conclusion,
    points: attributes.points,
  };
}

