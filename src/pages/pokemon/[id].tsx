import { useState } from "react";
import Layout from "@/components/Layout/Layout"
import { Pokemon } from "@/interfaces/pokemon-full";
import { existPokemonInFavorites, toggleFavorite } from "@/utils/localFavorites";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import confetti from "canvas-confetti"
import { getPokemonInfo } from "@/utils/getPokemonInfo";


interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    // usamos la funcion creada que devuelve true o false para que sirva de estado inicial
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


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// Los dinamic routes son las [] del nombre del archivo
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    // <------- El static paths siempre va a necesitar al static props ----------->

    // Se crea un array que va de 1 a 500
    const pokemons500 = [...Array(500)].map((val, i) => `${i + 1}`)

    return {
        // La cantidad de paths es la cant de paginas que va a generar en el build
        // paths: [
        //     {
        //         // los parametros tienen que conicidir con el id en este caso y tiene que ser
        //         // string si o si
        //         params: {id:"1"}
        //     }
        // ],
        paths: pokemons500.map(id => ({
            params: { id }
        })),
        // Por defecto esta en "blocking", cambiandolo a false al buscar una pag inexistente
        // Nos da un 404
        fallback: "blocking"
    }
}

// desestructuramos ctx (context) para obtener los params, que son los parametros (id) que
// pasamos arriba en getStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }

    const pokemon = await getPokemonInfo(id)

    // Si el pokemon no existe, nos redirecciona al home
    if (!pokemon) {
        return {
            redirect: {
                destination: "/",
            // Ayuda a los bots diciendole que la redireccion no es permanente, no existe mas
            // Al poner en false le decimos que puede ser que en un futuro, exista 
            permanent: false
            }
        }
    }

    // -----------------------------------------------
    // Sin centralizar la data del pokemon

    // // Pokemon es la nueva interface creada
    // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

    // const pokemon ={
    //     id: data.id,
    //     name: data.name,
    //     sprites : data.sprites
    //   }

    // return {
    //     props: {
    //         pokemon
    //     }
    // }
    // ----------------------------------------------------

    // Antes del ISR
    // Utilizamos la funcion centralizada y le pasamos el id
    // return {
    //     props: {
    //         pokemon: await getPokemonInfo(id)
    //     }
    // }

    // -------------------------------------------

    return {
        props: {
            pokemon
        },
        revalidate: 86400,   // esto equivaldria a un dia en segundos
    }
}

export default PokemonPage


