



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

export {
    toggleFavorite
}