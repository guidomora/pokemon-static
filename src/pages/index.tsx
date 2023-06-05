import pokeApi from "@/api/pokeApi"
import Layout from "@/components/Layout/Layout"
import { PokemonsListResponse, SmallPokemon } from "@/interfaces/pokemon-list"
import { NextPage, GetStaticProps } from 'next'



interface Props {
  pokemons: SmallPokemon[]
}

// props del getStaticProps
const HomePage: NextPage<Props> = ({pokemons}) => {
  

  return (
    <Layout title="Listado de Pokemons">
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            #{pokemon.id} - {pokemon.name}
          </li>
        ))}
      </ul>
    </Layout>
  )
}


// Sirve para decirle a next que esto va a ser generado de forma estatica,
// ya va a estar todo generado en el build y brinda mayor rapidez

export const getStaticProps: GetStaticProps = async (ctx) => {

  // Agregamos la interface creada
  const { data } = await pokeApi.get<PokemonsListResponse>("/pokemon?limit=1400")
  console.log(data);

  // se lo pasamos como props al componentes de arriba
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg
  `
  }))

  // la constante de arriba
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage