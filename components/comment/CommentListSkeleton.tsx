import { UserCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

//Despliega un esqueleto para mostrar mientras se cargan los comentarios.
export default function CommentListSkeleton() {
  return (
    <ul className=" mt-3 rounded p-2">
      {[1, 2, 3].map((index) => (
        <li
          key={index}
          className=" m-4 rounded-md bg-white px-3 py-2 last:border-none"
        >
          <div className="flex items-center gap-3 pb-1 font-semibold">
            <UserCircleIcon className="h-6 w-6" />
            <div className=" animate-pulse h-3 w-24 rounded bg-gray-400" />
          </div>
          <p className="italic">
            <div className=" animate-pulse h-3 w-full rounded bg-gray-400" />
          </p>
        </li>
      ))}
    </ul>
  );
}
