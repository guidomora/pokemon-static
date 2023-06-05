export interface PokemonsListResponse {
    count:    number;
    next?:     string; // Le agregamos que fuera opcional
    previous?: string; // Le agregamos que fuera opcional y de tipo string
    results:  SmallPokemon[]; //Le cambiamos el nombre
}
//Le cambiamos el nombre
export interface SmallPokemon {
    name: string;
    url:  string;
    id: number; // Agregado
    img: string; // Agregado
}