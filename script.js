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

fetch("https://pokeapi.co/api/v2/pokemon-species/58")
    .then(response => response.json())
    .then(data => {
        /*console.log(data.sprites.other["official-artwork"].front_default) /*sprite de face*/
        
        const frenchName = data.names[4].name
        const pokemonId = data.id
        
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                const pokemonSprite = data.sprites.other["official-artwork"].front_default

                
                
            })
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))

/* Pagination */


const pagination = (data) => {
    /*<div class="poke-cards">
    <h2>Caninos</h2>
    <img src="res/img/250px-template.png" alt="Une image de Caninos">
    <p class="id"><span>n°</span>0058</p>
    <span class="type-tag fire">Feu</span>
    </div>*/
    const start = document.querySelector("main")
    const createDiv = document.createElement("div")

    start.appendChild(createDiv).classList.add("poke-cards")

    const pokemonName = document.createElement("h2").innerText = "Caninos"

    
}

pagination()


