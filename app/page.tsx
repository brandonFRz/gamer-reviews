import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import { getReviews } from "@/lib/reviews";
import SearchBox from "@/components/ui/SearchBox";
import { getGameDetails } from "@/lib/rawg";


//Configura la revalidación  de la pagina cada 30seg para obtener datos acualizados.
export const revalidate = 30;

export default async function HomePage() {
  //Obtiene las 5 reseñas mas recientes
  const { reviews } = await getReviews(5);

    //Crea un array de promesas para obtener las imágenes de los juegos.
    const gameDetailsPromises = reviews.map((review)=>
      getGameDetails(review.slug)
    )

      // Renderiza la lista de reseñas junto con la paginación y la caja de búsqueda
  const gameDetailsList = await Promise.all(gameDetailsPromises);


  return (
    <div>
      {/* Sección del encabezado con el titulo y la caja de búsqueda */}
        <header className="header-bg flex justify-between">
          <Heading>Game Reviews</Heading>
          <SearchBox />
        </header>
      
      {/* Lista de reseñas */}
      <ul className="flex flex-col gap-3">
        <h1 className="mt-8 font-orbitron text-2xl font-bold">
          Reseñas recientes
        </h1>
        {reviews.map((review, index) => {
          const gameDetails = gameDetailsList[index]
          return(
            <li
            className="rounded border-b-2 border-r-2 bg-white py-2 shadow hover:shadow-xl sm:w-full"
            key={review.slug}
            >
            <Link
              className="flex flex-col sm:flex-row"
              href={`/reviews/${review.slug}`}
              >
              <Image
                className="h-48 rounded-t object-fill sm:rounded-l sm:rounded-r-none"
                src={gameDetails.background_image}
                alt="game-image"
                width={320}
                height={180}
                />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-orbitron font-bold">{review.title}</h2>
                <p className="hidden pt-2 sm:block">{review.subtitle}</p>
              </div>
            </Link>
          </li>
              )
})}
      </ul>
    </div>
  );
}
