import React from "react";
import { getGameDetails } from "@/lib/rawg";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import controller from '@/public/controller.svg'
import { getReview } from "@/lib/reviews";
import Image from "next/image";

interface ConclusionSheetProps {
  slug: string;
}

// Componente que muestra la hoja de conclusión de una reseña de juego
export default async function ConclusionSheet({ slug }: ConclusionSheetProps) {

  // Obtiene los detalles del juego y la reseña correspondiente a la reseña.
  const gameDetails = await getGameDetails(slug);
  const review = await getReview(slug);

  // Extrae las plataformas y las almacena en una cadena
  const platforms = gameDetails?.platforms.map((platform: any) => platform.platform.name).join(", ");
  const website = gameDetails?.website;

  return (
    <div className="relative max-w-[1140px] bg-white p-4">
       {/* Título y puntuación */}
      <div className="flex justify-between rounded-md bg-black p-3 font-semibold text-white">
        <h2 className="text-xl">Conclusión</h2>
        <p className="absolute right-0 top-0 -translate-y-2 translate-x-3 transform rounded-full border-2 border-white bg-red-600 p-6 text-5xl">
          {gameDetails?.metacritic === null  ? 'tbd' :  gameDetails?.metacritic}
        </p>
      </div>

      {/* Detalles del juego */}
      <div className="mt-5 flex justify-center gap-14 border-b-8 pb-6 border-black">
        <div className="w-1/2 flex-col justify-around px-4">
          <p className="text-justify">{review?.conclusion}</p>
          <div className="mt-4">
            <p className="flex items-center ">
              <ClockIcon className="mr-2 h-5 w-5" />
              {/* Muestra las horas de juego estimadas */}
              <strong>Horas de juego:</strong> 
              <span className="ml-2">{gameDetails?.playtime === 0 ? 'tbd' : `${gameDetails?.playtime}hrs`}.</span>
            </p>
            {/* Muestra las plataformas en las que está disponible el juego */}
            <p className="flex items-center mt-3">
              {<Image className="mr-2 h-5 w-5" src={controller} alt="controller" />}
              <strong>Plataformas:</strong>
              <span className=" ml-2">{platforms}</span> 
            </p>
            {/* Muestra el enlace al sitio web oficial del juego si hay */}
            <p className="mt-4">
              {website && (
                <a
                  href={website}
                  className="bg-red-600 px-4 py-2 text-white rounded-lg font-semibold hover:bg-red-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitio Web
                </a>
              )}
            </p>
          </div>
        </div>
        
        {/* Puntos positivos y negativos */}
        <div className="flex w-1/2 flex-col justify-around pl-4">
          <div>
            <h3 className="font-bold">Puntos Positivos</h3>
            <ul className="list-inside list-disc">
              {review?.points.positivePoints.map((positive, index) => (
                <li key={index} className="flex items-center">
                  <HandThumbUpIcon className="min-w-5 w-5  min-h-max-5 text-green-500 mr-2"/>
                  {positive}
                  </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Puntos Negativos</h3>
            <ul className="list-inside list-disc">
              {review?.points.negativePoints.map((negative, index) => (
                <li key={index} className="flex items-center">
                  <HandThumbDownIcon className="min-w-5 w-5 text-red-500 mr-2 "/>
                  {negative}
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
