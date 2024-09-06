'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

///Interfaces///
interface NavLinkProps{
    children: ReactNode;
    href: string;
    prefetch?: boolean;
}

//Proporciona un estilo de navegación y maneja la condición para evitar recargar la página que ya está activa.
export default function NavLink({children, href, prefetch}:NavLinkProps) {
    const pathname = usePathname();
    if(href === pathname){
        return(
            <span className='text-orange-800'>
                {children}
            </span>
        )
    }


  return (
    <Link href={href} prefetch={prefetch} className='text-orange-800 hover:underline'>
      {children}
    </Link>
  )
}
