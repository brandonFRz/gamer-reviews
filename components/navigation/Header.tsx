import React from 'react'
import SearchBox from '../ui/SearchBox'
import Heading from '../ui/Heading'

export default function Header() {
  return (
    <header className="header-bg flex flex-col sm:flex-row justify-between items-center py-4">
    <Heading>Reseñas</Heading>
      <SearchBox />
  </header>
  )
}
