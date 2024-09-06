import Heading from "@/components/ui/Heading";
import React from "react";

export const metadata = {
  title: "Sobre Nosotros ",
};

//Pagina que describe de que trata la pagina.
export default function About() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="rounded-t-md bg-red-900 p-6 text-gray-100">
        <Heading>Acerca de la pagina</Heading>
      </header>
      <div className="p-6 shadow-lg border-black rounded-b-lg">
        <section>
          <h2 className="text-2xl font-semibold ">
            Nuestra Misión
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Creemos que los videojuegos son una forma de arte y una poderosa
            herramienta para contar historias. Nuestra misión es destacar lo
            mejor que la industria tiene para ofrecer y también ser críticos
            cuando sea necesario. Queremos ser tu fuente confiable para todo lo
            relacionado con videojuegos, desde los títulos más esperados hasta
            gemas ocultas que merecen tu atención.
          </p>
        </section>

        <section className="mt-8">
        <h2 className="text-2xl font-semibold ">¿Quiénes Somos?</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Somos un equipo de jugadores apasionados con una amplia experiencia en la industria del videojuego. Cada miembro de nuestro equipo aporta su propio estilo y perspectiva, asegurando que nuestras reseñas sean completas y variadas. Estamos comprometidos a mantener la integridad en nuestras opiniones y a proporcionar contenido de alta calidad para nuestra comunidad.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Únete a Nuestra Comunidad</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Queremos que Gamer Review sea un espacio donde los jugadores puedan conectarse, compartir sus experiencias y descubrir nuevos títulos. No dudes en unirte a nosotros en nuestras redes sociales, dejar comentarios en nuestras reseñas, o enviarnos tus sugerencias y opiniones.
        </p>
      </section>
      </div>
    </div>
  );
}
