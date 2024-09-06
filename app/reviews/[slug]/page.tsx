import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Heading from "@/components/ui/Heading";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { getUserFromSession } from "@/lib/auth/auth";
import { getReview, getSlugs } from "@/lib/reviews";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";
import { Suspense } from "react";
import CommentListSkeleton from "@/components/comment/CommentListSkeleton";
import AuthButton from "@/components/modal/AuthButton";
import { getGameDetails, getGameScreenshots } from "@/lib/rawg";
import ImageCarousel from "@/components/coclusion/ImageCarousel";
import ConclusionSheet from "@/components/coclusion/ConclusionSheet";

///Interfaces///
interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

//Genera los metadatos dinámicos basados en los parámetros de la página
export async function generateMetadata({
  params: { slug },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

// Genera parámetros estáticos para rutas dinámicas.
export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug: any) => ({ slug }));
}


export default async function ReviewPage({params: { slug }}: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }

  // Obtiene las capturas del juego desde la API y el usuario actual de la sesión.
  const gameScreenshots = await getGameScreenshots(slug);
  const gameDetails = await getGameDetails(slug);
  const user = await getUserFromSession();

  return (
    <div className="max-w-[1140px] mx-auto ">
       {/* Encabezado */}
      <div className="header-bg">
        <Heading>{review.title}</Heading>
      </div>
      
      <div className="py-6 max-w-screen-sm mx-auto">
        <p className="pb-3 font-semibold">{review.subtitle}</p>
        <div className="flex items-baseline gap-3 pb-3">
          <p className="pb-2 italic">{review.date}</p>
        </div>

        {/* // Imagen destacada de la reseña */}
        <Image
          src={gameDetails.background_image}
          alt={review.title}
          priority
          width="640"
          height="360"
          className="mb-6 rounded"
        />

        {/* Cuerpo de la reseña */}
        <article
          dangerouslySetInnerHTML={{ __html: review.body }}
          className="prose prose-slate text-lg"
        />

        {/* Carrusel de imágenes del juego */}
        <section className="mt-8">
              <ImageCarousel images={gameScreenshots.results} />
        </section>
      </div>

      {/* Hoja de conclusión */}
      <section className="mt-8 bg-white p-4 rounded-md">
        <ConclusionSheet slug={slug} />
      </section>

      {/* Sección de comentarios */}
      <section className="mt-8 bg-gray-300 p-4 rounded-lg">
        <h2 className="flex items-center gap-2 p-4 text-xl font-bold text-gray-600">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comentarios
        </h2>
        {user ? (
          // Si el usuario está autenticado, muestra el formulario de comentarios
          <CommentForm
            slug={slug}
            title={review.title}
            userName={user.name}
          />
        ) : (
          // Si el usuario no está autenticado, muestra un botón para iniciar sesión
          <div className="mx-4 mt-4 flex flex-col gap-2 rounded-md border-2 border-gray-400 bg-white p-3">
            <p>Tienes algo que comentar.</p>
            <AuthButton mode="signIn" />
          </div>
        )}
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </div>
  );
}
