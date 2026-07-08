/* Search Bar Activates */

const searchBar = document.querySelector("#search-bar-container > label")
const searchBarState = document.getElementById("search-bar")


searchBar.addEventListener("click", (e) => {
    e.preventDefault()
    if(!searchBarState.classList.contains("active")){
        searchBarState.classList.remove("not-active")
        searchBarState.classList.add("active")
    } else {
        searchBarState.classList.remove("active")
        setTimeout(() => {
            searchBarState.classList.add("not-active")
        }, 200)
    }
})

/* Load More Button */

const loadButton = document.getElementById("loadMore")

loadButton.addEventListener("click", (e) => {
    
    if (isLoading) {
        return
    }

    e.preventDefault()
    currentLoad += 1
    loadPokedex()
})

/* fetch API pokémon*/

const pokemonList = []
const pokemonPerLoad = 20
const maxPokemon = 151
let currentLoad = 1

const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/"
const pokemondURL = "https://pokeapi.co/api/v2/pokemon/"

let isLoading = false

const loadPokedex = async () => {

    if(isLoading){
        return
    }

    isLoading = true
    loadButton.disabled = true

    const startId = (currentLoad - 1) * pokemonPerLoad + 1
    const endId = Math.min(startId + pokemonPerLoad - 1, maxPokemon)

    for (let pokemonId = startId; pokemonId <= endId; pokemonId++) {
        try {
            
            const speciesResponse = await fetch(`${speciesURL}${pokemonId}`) /* for each call, we await the response data */
            
            if (!speciesResponse.ok) {
                throw new Error(`Erreur de l'appel API vers 'pokemon-species' pour le Pokémon ${pokemonId}`)
            } /* Check if the call to the API response is different than okay */

            const speciesData = await speciesResponse.json() /*transform the response into usable JSON */

            const frenchName = speciesData.names.find((french) => french.language.name === "fr").name
            
            /* Second call API to a different URL */
            const pokemonResponse = await fetch(`${pokemondURL}${pokemonId}`) 
            
            if (!pokemonResponse.ok) {
                throw new Error(`Erreur de l'appel API vers 'pokemon' pour le Pokémon ${pokemonId}`)
            }

            const pokemonData = await pokemonResponse.json()
            
            const artwork =  pokemonData.sprites.other["official-artwork"].front_default
            const pokemonType = pokemonData.types
            
            pokemonList[pokemonId - 1] = {
                id: pokemonId,
                name: frenchName,
                img: artwork,
                types: pokemonType
            } /* Inject pokemonList array with all the data necessary */

            createPokemonCards(pokemonList[pokemonId - 1])


        }
        catch(error) {
            console.log("Erreur: " + error)
        }
        finally {
            isLoading = false

            if(endId >= maxPokemon) {
                loadButton.hidden = true
            } else {
                loadButton.disabled = false
            }
        }
    }
}

loadPokedex()

/* Pagination */

const createPokemonCards = (pokemonList) => {
    /*
    Pagination in HTML -> 
    -----------------
    <div class="poke-cards">
    <h2>Caninos</h2>
    <img src="res/img/250px-template.png" alt="Une image de Caninos">
    <p class="id" data-id="n">n°58</p>
    <span class="type-tag fire">Feu</span>
    </div>
    */

    const start = document.querySelector("main")
    const createDiv = document.createElement("div")

    start.appendChild(createDiv).classList.add("poke-cards")

    const pokemonName = document.createElement("h2")

    createDiv.appendChild(pokemonName)
    pokemonName.innerText = `${pokemonList.name}`  

    const pokemonImg = document.createElement("img")

    createDiv.appendChild(pokemonImg).src = `${pokemonList.img}`

    const pokemonNumber = document.createElement("p")

    createDiv.appendChild(pokemonNumber).classList.add("id")
    pokemonNumber.innerText = `n°${pokemonList.id}`

    const typeTag = document.createElement("span")
    const typeTagSecond = document.createElement("span")
    
    const pokemonType = []
    pokemonList.types.forEach(element => {
        pokemonType.push(element.type.name) 
    })
    
    const pokemonTypeInFrench = {
        grass: "plante",
        poison: "poison",
        fire: "feu",
        flying: "vol",
        water: "eau",
        bug: "insecte",
        normal: "normal",
        ground: "sol",
        rock: "roche",
        fairy: "fée",
        fighting: "combat",
        psychic: "psy",
        dark: "ténèbres",
        ghost: "spectre",
        steel: "acier",
        electric: "électrik",
        ice: "glace",
        dragon: "dragon"
    }

    const typeTranslated = pokemonTypeInFrench[pokemonType[0]]
    const secondTypeTranslated = pokemonTypeInFrench[pokemonType[1]]


    if(pokemonType.length === 1) {
        createDiv.appendChild(typeTag).setAttribute("class", `type-tag ${pokemonType[0]}`)
        typeTag.innerHTML = typeTranslated

    } else {
        createDiv.appendChild(typeTag).setAttribute("class", `type-tag ${pokemonType[0]}`)
        typeTag.innerHTML = typeTranslated
        createDiv.appendChild(typeTagSecond).setAttribute("class", `type-tag ${pokemonType[1]}`)
        typeTagSecond.innerHTML = secondTypeTranslated
    }

}