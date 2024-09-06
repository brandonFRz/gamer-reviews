import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import { getReviews } from "@/lib/reviews";
import PaginationBar from "@/components/navigation/PaginationBar";
import SearchBox from "@/components/ui/SearchBox";
import { getGameDetails } from "@/lib/rawg";


////Interfaces////
interface ReviewsPageProps {
  searchParams: { page?: string };
}


export const metadata = {
  title: "Reseñas",
};

// Define el tamaño de la página
const PAGE_SIZE = 9;


//Función auxiliar para analizar y convertir el parámetro de página de string a número válido
function parsePageParam(paramValue?: string): number {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;// Si no hay parámetro o es inválido, regresa la primera página
}

// Componente principal de la página de reseñas
export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page);// Obtiene la página actual a partir de los parámetros
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);  // Obtiene las reseñas y el número total de páginas

  //Crea un array de promesas para obtener las imágenes de los juegos.
  const gameDetailsPromises = reviews.map((review)=>
    getGameDetails(review.slug)
  )

  // Renderiza la lista de reseñas junto con la paginación y la caja de búsqueda
  const gameDetailsList = await Promise.all(gameDetailsPromises);
  
  return (
    <div>
      <header className="header-bg flex justify-between">
        <Heading>Reseñas</Heading>
          <SearchBox />
      </header>
      <ul className="grid grid-cols-1 gap-x-24 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {reviews.map((review, index) => {
          const gameDetails = gameDetailsList[index]
          return(
            <li
            key={review.slug}
            className="w-80 bg-gradient-to-r from-red-900 to-red-950  shadow hover:shadow-xl"
            >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                className="rounded-t object-fill h-48 w-96 "
                src={gameDetails.background_image}
                alt="thumbnail"
                width={320}
                height={180}
                
                />
              <h1 className="border-t-2 py-3 px-1 text-center font-orbitron font-bold text-white">
                {review.title}
              </h1>
            </Link>
          </li>
)
})}
      </ul>
      <div className="my-4 flex justify-center">
        <PaginationBar page={page} pageCount={pageCount} href="/reviews" />
      </div>
    </div>
  );
}
