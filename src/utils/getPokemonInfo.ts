import pokeApi from "@/api/pokeApi"
import { Pokemon } from "@/interfaces/pokemon-full"


export const getPokemonInfo = async (nameOrId: string) => {

  try {
    // Pokemon es la nueva interface creada
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`)

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    }
  } catch (error) {
    return null;
  }



}

