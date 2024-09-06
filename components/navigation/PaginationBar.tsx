import React, { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

///Interfaces///
interface PaginationBarPromps {
  page: number;
  pageCount: number;
  href: string;
}

interface PaginationLinkPromps {
  href: string;
  children: ReactNode;
  enabled: boolean;
}

// Maneja los enlaces de navegación mostrando si está deshabilitado o habilitado.
function PaginationLink({ children, href, enabled }: PaginationLinkPromps) {
  if (!enabled) {
    return (
      <span className="cursor-not-allowed rounded border text-sm text-slate-300">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="rounded border text-sm text-slate-500 hover:bg-red-900 hover:text-slate-100"
    >
      {children}
    </Link>
  );
}

//Renderiza la página actual y el total de páginas
export default function PaginationBar({
  page,
  pageCount,
  href,
}: PaginationBarPromps) {
  return (
    <div className="flex gap-2 pb-2">
      <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className="h-5 w-5" />
      </PaginationLink>
      <span>
        Pagina {page} de {pageCount}
      </span>
      <PaginationLink
        href={`${href}?page=${page + 1}`}
        enabled={page < pageCount}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </PaginationLink>
    </div>
  );
}

