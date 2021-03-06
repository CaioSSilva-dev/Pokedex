let pokemonsNumber = 50
//Gerando lista de pokemons Inicial
const getpokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(pokemonsNumber).fill().map((_,index)=>fetch(getpokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator,{name, id, types}) => {

const Elementtypes = types.map(typeinfo => typeinfo.type.name)

    accumulator += `
    <li class="card ${Elementtypes[0]}" onclick="pokeShow(${id})">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle ${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</p>
    </li>`
    return accumulator
    }, ''
)


const insertPokemons = pokemons =>{
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}

const pokemonPomises = generatePokemonPromises()

Promise.all(pokemonPomises).then(generateHTML).then(insertPokemons)


//Funçao de pesquisa
function search(){
    pokeName = document.querySelector('.search').value
    fetch(getpokemonUrl(pokeName.toLowerCase()))
        .then((response)=> response.json())
        .then((pokemon)=>{
            const ul = document.querySelector('[data-js="pokedex"]')
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name)
            ul.innerHTML = `
            <li class="card ${Elementtypes[0]}" onclick="pokeShow(${pokemon.id})">
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle ${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</p>
            </li>`
        })
        .catch((erro) =>{
            alert("Nome ou Numero não encontrado"); 
        })
        //Loading aparecendo quando não deveria
        const loading = document.getElementById('pokeball-loading')
        loading.style.display = 'none';

}
//Mostrando Pokemon
function pokeShow(id){
    fetch(getpokemonUrl(id))
        .then(promises => promises.json())
        .then((pokemon) =>{
            const page = document.body
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name) 
            page.innerHTML = `
            <div class="pokemonPageContainer">
                <div class="pokemon-container ${Elementtypes[0]}">
                    <div class="headerContainer">
                        <button class="back-button" onclick="backHome()">
                            <img class="back-button-icon" src="https://cdn-icons-png.flaticon.com/64/507/507257.png"/>
                        </button>
                        <h1 class="pokepage-title">${pokemon.name}</h1>
                    </div>
                    <div class="image-container">
                        <img class="card-image-solo" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                        <div class="info1-container">
                            <p class="info-id">${'#0' + pokemon.id}</p>
                            <h1 class="info-title">${pokemon.name}</h1>
                            <h2 class="${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</h2>
                        </div>
                    </div>
                </div>
                <div class="other-stats-container">
                    <nav id="menus-container">
                        <ul>
                            <li class="menu-title ${Elementtypes[0] + '-color'}"onclick="about(${id})">About</li>
                            <li class="menu-title ${Elementtypes[0] + '-color'}"onclick="baseStatus(${id})">Base Stats</li>
                            <li class="menu-title ${Elementtypes[0] + '-color'}"onclick="evolution(${id})">Evolution</li>
                            <li class="menu-title ${Elementtypes[0] + '-color'}"onclick="moves(${id})">Movements</li>
                        </ul>
                    </nav>
                    <div id="about-div">
                        ${about(id)}
                    </div>
                </div>
            </div>`
            scrollReset()
        });
}
//Voltar Home
function backHome(){
    window.location.reload();
}
//Voltar ao topo quando carregar pokemon
function scrollReset(){
    window.scrollTo(0, 0);
}
const campoPesquisa = document.querySelector('.search')

campoPesquisa.addEventListener("keydown", (key) =>{
    if (key.code === "Enter") {
        search();
    }
})
//Loading
function showLoading() {
    const loading = document.getElementById('pokeball-loading')
    loading.classList.add('active')
    loading.classList += 'active'
    setTimeout(() => {
        loading.classList.remove('active')
        loading.classList -= 'active'
        setTimeout(() => {
            pokemonsNumber = pokemonsNumber + 6
            const pokemonPomises = generatePokemonPromises()
            Promise.all(pokemonPomises).then(generateHTML).then(insertPokemons)
        },400)
    }, 500)
}
window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if(scrollTop + clientHeight >= scrollHeight - 80){
        showLoading()
    }
})
//backtop-button
function backTop(){
    document.documentElement.scrollTop = 0
}
//About Pokemon
function about(id){
    fetch(getpokemonUrl(id))
        .then(promises => promises.json())
        .then((pokemon) =>{
            const statusWeight = pokemon.weight
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name)
            const forms = pokemon.forms.map(forms => forms.name).join(' & ')
            const height = pokemon.height
            const habilities = pokemon.abilities.map(ability => ability.ability.name).join(' & ')
            document.getElementById('about-div').innerHTML =
            `<div class="about-data">
                <div class="species-container">
                    <h1 class="${Elementtypes[0] + '-color'}">FORMS</h1>
                    <p>${forms}</p>
                </div>
                <div class="height-container">
                    <h1 class="${Elementtypes[0] + '-color'}">HEIGHT</h1>
                    <p>${height}</p>
                </div>
                <div class="weight-container">
                    <h1 class="${Elementtypes[0] + '-color'}">WEIGHT</h1>
                    <p>${statusWeight}</p>
                </div>
                <div class="abilities-container">
                    <h1 class="${Elementtypes[0] + '-color'}">ABILITIES</h1>
                    <p>${habilities}</p>
                </div>
            </div>`
        })
}
//Status Base Pokemon
function baseStatus(id){
    fetch(getpokemonUrl(id))
        .then(promises => promises.json())
        .then((pokemon) =>{
            const statusBaseExperience = pokemon.base_experience
            const statusBaseValue = pokemon.stats.map(statsinfo => statsinfo.base_stat)
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name) 
            document.getElementById('about-div').innerHTML =

            `<div class="status-div">
                <div class=" icon-container ${Elementtypes[0] + '-element-container'}">
                    <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/535/535234.png"/>
                </div>
                <h1 class="${Elementtypes[0] + '-color'}">HP</h1>
                <p>${statusBaseValue[0]}</p>
            </div>
            <div class="status-div">
                <div class="  icon-container ${Elementtypes[0] + '-element-container'}">
                    <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/842/842082.png"/>
                </div>
                <h1 class="${Elementtypes[0] + '-color'}">ATTACK</h1>
                <p>${statusBaseValue[1]}</p>
            </div>
            <div class="status-div">
                <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                    <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/786/786346.png"/>
                </div>
                <h1 class="${Elementtypes[0] + '-color'}">DEFENSE</h1>
                <p>${statusBaseValue[2]}</p>
            </div>
            <div class="status-div">
                <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                    <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/6997/6997647.png"/>
                </div>
                <h1 class="${Elementtypes[0] + '-color'}">SPECIAL-ATTACK</h1>
                <p>${statusBaseValue[3]}</p>
            </div>
            <div class="status-div">
                <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                    <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/2919/2919703.png"/>
                </div>
                <h1 class="${Elementtypes[0] + '-color'}">SPECIAL-DEFENSE</h1>
                <p>${statusBaseValue[4]}</p>
            </div>
            <div class="pokedex-data">
                <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                    <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/626/626075.png"/>
                </div>
                <h1 class="${Elementtypes[0] + '-color'}">BASE-XP</h1>
                <p>${statusBaseExperience}</p>
            </div>`
        }  
    )
}
//Evolution Pokemon
function evolution(id){
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((response) => response.json())
    .then((pokemonSpecie) => {
        const urlEvolution = pokemonSpecie.evolution_chain.url
        fetch(urlEvolution)
        .then((response) => response.json())
        .then((pokemonChain) => {
            const first = pokemonChain.chain.species.name
            const second = pokemonChain.chain.evolves_to.map(secinfo => secinfo.species.name)
            const third = pokemonChain.chain.evolves_to.map(secinfo => secinfo.evolves_to).map(evolves => evolves)
            document.getElementById('about-div').innerHTML =
            `
            <div class="evolution-container">
                <div id="first-div"></div>
                <div id="second-div"></div>
                <div id="third-div"></div>
            </div>
            `
            if(first != undefined){
                fetch(`https://pokeapi.co/api/v2/pokemon/${first}`)
                .then((response) => response.json())
                .then((poke) => {
                const photo1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + poke.id + ".gif"
                document.getElementById('first-div').innerHTML =`<img src="${photo1}"/>
                  <p>${first}</p>`
            })
            if(second[0] != undefined){
                fetch(`https://pokeapi.co/api/v2/pokemon/${second[0]}`)
                .then((response) => response.json())
                .then((poke) => {
                const photo2 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + poke.id + ".gif"
                document.getElementById('second-div').innerHTML =`<img src="${photo2}"/>
                  <p>${second[0]}</p>`
            })
            }
            if(third[0][0].species.name != undefined){
                fetch(`https://pokeapi.co/api/v2/pokemon/${third[0][0].species.name}`)
                .then((response) => response.json())
                .then((poke) => {
                const photo3 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + poke.id + ".gif"
                document.getElementById('third-div').innerHTML =`<img src="${photo3}"/>
                  <p>${third[0][0].species.name}</p>` 
                })
            }
        }})
    })
}
//Moves Pokemon
function moves(id){
    fetch(getpokemonUrl(id))
        .then(promises => promises.json())
        .then((pokemon) =>{
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name)
            const moves = pokemon.moves.map(move => move.move.name).join('<p/>');
            document.getElementById('about-div').innerHTML =
            `<div class="moves-div ${Elementtypes[0] + '-element-container'}"><p>${moves}</p></div>`
        })
}
