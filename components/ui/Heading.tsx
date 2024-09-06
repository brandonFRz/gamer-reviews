import React from 'react'

///Interfaces///
interface HeadingProps {
    children: React.ReactNode
    }

//Aplica unos estilos a la cabecera.
export default function Heading({children}: HeadingProps) {
  return (
    <h1 className={`font-bold pb-3 text-2xl font-orbitron text-white `} >
      {children}
    </h1>
  )
}
