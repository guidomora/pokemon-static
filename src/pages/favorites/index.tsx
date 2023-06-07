import Layout from '@/components/Layout/Layout'
import FavoritePokemons from '@/components/pokemon/FavoritePokemons'
import NoFavorites from '@/components/ui/NoFavorites'
import { pokemons } from '@/utils/localFavorites'
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
      {favoritePokemons.length === 0 ? (<NoFavorites />) :(
        <FavoritePokemons pokemons={favoritePokemons}/>
      )}
    </Layout>
    
  )
}

export default favorites