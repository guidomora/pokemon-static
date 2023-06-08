import Layout from '@/components/Layout/Layout'
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react'
import { GetStaticPaths, NextPage } from 'next'
import React, { useState } from 'react'
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '@/interfaces/pokemon-full'
import { GetStaticProps } from 'next'
import { PokemonsListResponse } from '@/interfaces/pokemon-list';
import { existPokemonInFavorites, toggleFavorite } from '@/utils/localFavorites';
import confetti from 'canvas-confetti';
import { getPokemonInfo } from '@/utils/getPokemonInfo';


interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(existPokemonInFavorites(pokemon.id))

  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id)
    // setea el valor opuesto que tenga el isInFavorites
    setIsInFavorites(!isInFavorites)
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2} >
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || "no image"}
                alt={pokemon.name} width="100%" height={200}>

              </Card.Image>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }} >
              <Text h1 transform="capitalize">{pokemon.name}</Text>
              <Button color="gradient" ghost={!isInFavorites} onPress={onToggleFavorite}>
                {isInFavorites ? "En Favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image src={pokemon.sprites.front_default}
                  alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default}
                  alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny}
                  alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny}
                  alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // Traemos los 500 pokemones
  const { data } = await pokeApi.get<PokemonsListResponse>(`/pokemon?limit=500`)
  // mapeamos data y solo nos llevamos los nombres
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

  // mapeamos los nombres para pasarselo a params
  return {
    paths: pokemonNames.map(name => ({
      params: { name }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Lo que voy a recibir es el name ([name].tsx --> name)
  const { name } = params as { name: string }


  // -------------------------------------------------------
  // El name que recibimos se lo pasamos a la url de la api
  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`)

  // funcion para procesar los archivos estaticos del servidor, solo llamamos los datos
  // que necesitamos para que no cargue el resto de datos que no utilizamos
  // const pokemon ={
  //   id: data.id,
  //   name: data.name,
  //   sprites : data.sprites
  // }

  // Aca llamamos a la constante de aca arriba, como se llaman igual queda solo pokemon,
  // aunque tambien podriamos poner pokemon:pokemon
  // ---------------------------------------------------------

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage