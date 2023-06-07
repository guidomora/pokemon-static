



const toggleFavorite = (id: number) => {
    console.log("id:");

    // favorites va a ser un arreglo de numeros, puede que no exista en el localStorage,
    // por eso le decimos que si no existe devuelva "[]"
    let favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    
    
    if(favorites.includes(id)) {
        // si incluye el id devuelve un array sin el pokemon con ese id
        favorites = favorites.filter(pokeId => pokeId !== id)
    } else {
        // pero si no lo incluye lo voy a insertar 
        favorites.push(id)
    }
    // se vuelve a guardar en el localStorage, como solo deja guardar strings aplicamos el JSON..
    localStorage.setItem("favorites", JSON.stringify(favorites) )
}

const existPokemonInFavorites = (id: number):boolean => {

    // si esto se genera del lado del servidor, devuelve false
    if (typeof window === "undefined") return false;

    const favorites : number[] = JSON.parse(localStorage.getItem("favorites") || "[]")

    // si incluye regresa true y sino false
    return favorites.includes(id);
}

const pokemons = ():number[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]")

}

export {
    toggleFavorite,
    existPokemonInFavorites,
    pokemons
}