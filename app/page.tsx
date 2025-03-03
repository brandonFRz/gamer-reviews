import Header from "@/components/navigation/Header";
import { getGameDetails } from "@/lib/rawg";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";


//Configura la revalidación  de la pagina cada 30seg para obtener datos acualizados.
export const revalidate = 30;

export default async function HomePage() {
  //Obtiene las 5 reseñas mas recientes
  const { reviews } = await getReviews(8);

    //Crea un array de promesas para obtener las imágenes de los juegos.
    const gameDetailsPromises = reviews.map((review)=>
      getGameDetails(review.slug)
    )

      // Renderiza la lista de reseñas junto con la paginación y la caja de búsqueda
  const gameDetailsList = await Promise.all(gameDetailsPromises);


  return (
    <div className="max-w-screen-lg mx-auto px-4">
      {/* Sección del encabezado con el titulo y la caja de búsqueda */}
        <Header/>
      
      {/* Lista de reseñas */}
        <h1 className="mt-8 font-orbitron text-2xl font-bold ">
          Reseñas recientes
        </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {reviews.map((review, index) => {
          const gameDetails = gameDetailsList[index]
          return(
            <li
            className="rounded border border-gray-300 bg-white shadow-md hover:shadow-lg transition-all duration-200"
            key={review.slug}
            >
            <Link
              className="flex flex-col sm:flex-row"
              href={`/reviews/${review.slug}`}
              >
              <Image
                className="w-full h-auto sm:w-1/3 rounded-t sm:rounded-l sm:rounded-r-none object-cover"
                src={gameDetails.background_image}
                alt="game-image"
                width={320}
                height={180}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                priority
                />
              <div className="px-4 py-3 flex flex-col justify-center text-center sm:text-left">
                <h2 className="font-orbitron font-bold text-lg">{review.title}</h2>
                <p className="hidden pt-2 sm:block text-gray-600">{review.subtitle}</p>
              </div>
            </Link>
          </li>
              )
})}
      </ul>
    </div>
  );
}
