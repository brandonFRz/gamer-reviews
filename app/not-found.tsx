import React from "react";
import notFound from '@/public/404.gif'
import Image from "next/image";
import Link from "next/link";

//Componente para la pagina del error 404
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-grow mt-12 justify-center">
      <div className="p-8 text-center">
        <h1 className="font-bold pb-3 text-2xl font-orbitron justify-center">404 Not Found</h1>
          <Image src={notFound} alt="Not-Found" />
        <p className="font-semibold text-red-700 text-xl mt-4">
          Oops! La pagina que buscas no se encuentra.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded  bg-red-950 px-4 py-2 font-semibold text-white hover:bg-black"
        >
          {" "}
          De vuelta al inicio{" "}
        </Link>
      </div>
    </div>
  );
}
