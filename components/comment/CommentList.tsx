import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { getComments } from '@/lib/comments'

///Interfaces///
interface CommentsListProps {
  reviewId: string
}

interface User {
  id: string;
  username: string; // Asegúrate de que este campo exista en tu API
}

interface Comment {
  username: string;
  id: string;
  user: User;
  message: string;
  postedAt: Date;
}

 // Componente que muestra la lista de comentarios
export default async function CommentList({reviewId}:CommentsListProps) {
    // Obtiene los comentarios de la review correspondiente a la reseña.
    const comments: Comment[] = await getComments(reviewId)

    //Muestra un mensaje si no hay comentarios.
    if (comments.length === 0){
        return <p className='italic mt-3'>Aun no hay comentarios.</p>
    }

  //Renderiza una lista de comentarios
  return (
    <ul className=' p-2 mt-3 rounded'>
      {comments.map((comment)=>(
        <li key={comment.id} className='px-3 py-2 last:border-none bg-white m-4 rounded-md'>
            <div className='flex gap-3 items-center pb-1 font-semibold'>
                <UserCircleIcon className='w-6 h-6'/>
                {comment.username}
            </div>
            <p className='italic'>
                {comment.message}
            </p>
        </li>
      ))}
    </ul>
  )
}
