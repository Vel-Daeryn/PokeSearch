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

const pokemonList = []
console.log(pokemonList)
const firstGen = [...Array(151).keys()]
console.log(firstGen)


firstGen.forEach(pokemon => {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + [pokemon + 1])
        .then(response => response.json())
        .then(data => {
            /*console.log(data.sprites.other["official-artwork"].front_default) /*sprite de face*/
            
            const pokemonId = data.id
            const frenchName = data.names.find((nameData) => nameData.language.name === "fr").name
    
            pokemonList[pokemonId - 1] = {
                id: pokemonId,
                name: frenchName
            }
            
            fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonList[pokemonId - 1].id)
                .then(response => response.json())
                .then(data => {
                    
                    const artwork = data.sprites.other["official-artwork"].front_default
                    const types = data.types
                    
                    pokemonList[pokemonId - 1] = {
                        id: pokemonId,
                        name: frenchName,
                        img: artwork,
                        types: types
                    }

                    pagination(data)
                    
                    
                })
                .catch(error => console.error(error))
            
        })
        .catch(error => console.error(error))

})






/* Pagination */

const pagination = (data) => {
    /*
    Pagination in HTML -> 
    -----------------
    <div class="poke-cards">
    <h2>Caninos</h2>
    <img src="res/img/250px-template.png" alt="Une image de Caninos">
    <p class="id">n°58</p>
    <span class="type-tag fire">Feu</span>
    </div>
    */

    const start = document.querySelector("main")
    const createDiv = document.createElement("div")

    start.appendChild(createDiv).classList.add("poke-cards")

    const pokemonName = document.createElement("h2")

    createDiv.appendChild(pokemonName)
    pokemonName.innerText = `${pokemonList[data.id - 1].name}`
    

    const pokemonImg = document.createElement("img")

    createDiv.appendChild(pokemonImg).src = `${data.sprites.other["official-artwork"].front_default}`

    const pokemonNumber = document.createElement("p")

    createDiv.appendChild(pokemonNumber).classList.add("id")
    pokemonNumber.innerText = `n°${data.id}`

    const typeTag = document.createElement("span")
    const typeTagSecond = document.createElement("span")
    
    const pokemonType = []
    data.types.forEach(element => {
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



