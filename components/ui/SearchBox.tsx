"use client";
import { useDebounce } from "use-debounce";
import type { SearchableReview } from "@/lib/reviews";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Componente que renderiza un cuadro de búsqueda para buscar reseñas.
export default function SearchBox() {
  const router = useRouter();
  
  // Almacena la cadena de búsqueda actual ingresada por el usuario
  const [query, setQuery] = useState("");

  //Espera 500ms después de que el usuario deje de escribir
  const [debouncedQuery] = useDebounce(query, 500)

  // Almacena las reseñas que coinciden con la búsqueda actual
  const [reviews, setReviews] = useState<SearchableReview[]>([]);

  // Realiza una búsqueda cuando el query cambia después de 500ms.
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      (async () => {
        const url = "/api/search?query=" + encodeURIComponent(debouncedQuery);
        const response = await fetch(url);
        const reviews = await response.json();
        setReviews(reviews);
      })();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  // Maneja el cambio cuando se selecciona una opción en el cuadro de búsqueda
  const handleChange = (review: SearchableReview | undefined) => {
    if (review) {
      router.push(`/reviews/${review.slug}`);
    }
  };

  //Renderiza el componente SearchBox, que incluye un Combobox con su campo de entrada y opciones
  return (
    <div className=" p-1">
      <Combobox onChange={handleChange}>

    {/* ComboboxInput es el campo de entrada donde el usuario escribe su búsqueda.
            El valor de 'query' se actualiza cada vez que cambia */}        
          <ComboboxInput
          placeholder="Buscar..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={"w-[18rem] rounded border px-2 py-1"}
        />

  {/* ComboboxOptions muestra las opciones que coinciden con la búsqueda.
            Cada opción (ComboboxOption) representa una reseña. */}
        <ComboboxOptions
          className="min-w-[18rem] absolute bg-white py-1 cursor-pointer shadow-xl"
        >
          {reviews.map((review) => (
            <ComboboxOption key={review.slug} value={review}>
              {({ focus }) => (
                <span
                  className={`px-2 ${
                    focus ? "font-bold" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}


