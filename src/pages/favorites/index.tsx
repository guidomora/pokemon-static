import Layout from '@/components/Layout/Layout'
import NoFavorites from '@/components/ui/NoFavorites'
import { pokemons } from '@/utils/localFavorites'
import { Container, Text, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    // seteamos el state, gracias que le pasamos la funcion que trae los pokemones
    // del localStorage al seter
    setFavoritePokemons(pokemons)
  }, [])
  

  return (
    <Layout title='Pokemons - Favoritos'>
      <NoFavorites />
    </Layout>
    
  )
}

export default favorites