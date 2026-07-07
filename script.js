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

/* fetch API pokémon*/

/*const pokemonList = []*/
const pokemonList = []
const firstGen = [...Array(151).keys()]


const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/"
const pokemondURL = "https://pokeapi.co/api/v2/pokemon/"

const loadPokedex = async () => {
    for (const pokemon of firstGen) {
        try {
            const pokemonId = pokemon + 1 /* -> take FirstGen Array index (which start at 0) to load the first 151 data */
            
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

            pagination(pokemonList[pokemonId - 1])


        }
        catch(error) {
            console.log("Erreur: " + error)
        }
    }
}

loadPokedex()

/*const loadFirstGen = async () => {
    for (const pokemon of firstGen) {
        try {
            const pokemonId = pokemon + 1

            const speciesResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
            )

            if (!speciesResponse.ok) {
                throw new Error(`Erreur species pour le Pokémon ${pokemonId}`)
            }

            const speciesData = await speciesResponse.json()

            const frenchName = speciesData.names.find(
                (nameData) => nameData.language.name === "fr"
            ).name

            const pokemonResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            )

            if (!pokemonResponse.ok) {
                throw new Error(`Erreur pokemon pour le Pokémon ${pokemonId}`)
            }

            const pokemonData = await pokemonResponse.json();

            const artwork =
                pokemonData.sprites.other["official-artwork"].front_default;

            const types = pokemonData.types

            pokemonList[pokemonId - 1] = {
                id: pokemonId,
                name: frenchName,
                img: artwork,
                types: types
            }

            pagination(pokemonList[pokemonId - 1])

        } catch (error) {
            console.error(error)
        }
    }

    console.log(pokemonList)
}

loadFirstGen()*/

/* Pagination */

const pagination = (pokemonList) => {
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


    if(pokemonType.length === 1) {
        createDiv.appendChild(typeTag).setAttribute("class", `type-tag ${pokemonType[0]}`)
        typeTag.innerText = `${pokemonType[0]}`
    } else {
        createDiv.appendChild(typeTag).setAttribute("class", `type-tag ${pokemonType[0]}`)
        typeTag.innerText = `${pokemonType[0]}`

        createDiv.appendChild(typeTagSecond).setAttribute("class", `type-tag ${pokemonType[1]}`)
        typeTagSecond.innerText = `${pokemonType[1]}`
    }

 
}



