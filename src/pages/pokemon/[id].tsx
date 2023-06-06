import pokeApi from "@/api/pokeApi";
import Layout from "@/components/Layout/Layout"
import { Pokemon } from "@/interfaces/pokemon-full";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router"


interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    return (
        <Layout title="Algun pokemon">
            <h1>{ pokemon.name }</h1>
        </Layout>
    )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// Los dinamic routes son las [] del nombre del archivo
export const getStaticPaths: GetStaticPaths = async (ctx) => {


    // Se crea un array que va de 1 a 500
    const pokemons500 = [...Array(500)].map((val, i) => `${i + 1}`)

    return {
        // La cantidad de paths es la cant de paginas que va a generar en el build
        // paths: [
        //     {
        //         // los parametros tienen que conicidir con el id en este caso y tiene que ser
        //         // string
        //         params: {id:"1"}
        //     }
        // ],
        paths: pokemons500.map(id => ({
            params: { id }
        })),
        // Por defecto esta en "blocking", cambiandolo a false al buscar una pag inexistente
        // Nos da un 404
        fallback: false
    }
}

// desestructuramos ctx (context) para obtener los params, que son los parametros (id) que
// pasamos arriba en getStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }
    // Pokemon es la nueva interface creada
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

    return {
        props: {
            pokemon: data
        }
    }
}

export default PokemonPage


