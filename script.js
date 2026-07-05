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
console.log(pokemonList);


for(let i = 1; i <= 151; i++) {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
        .then(response => response.json())
        .then(data => {
            /*console.log(data.sprites.other["official-artwork"].front_default) /*sprite de face*/
            
            const frenchName = data.names[4].name
            const pokemonId = data.id
    
            pokemonList.push(frenchName)
            
            fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
                .then(response => response.json())
                .then(data => {
    
                    pagination(data)
                    
                    
                })
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
}

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
    pokemonName.innerText = `${pokemonList[data.id]}`

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


