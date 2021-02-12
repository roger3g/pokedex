const main = document.querySelector('#pokedex')
const pokemonsNumber = 150

const getContent = async () => {
  for (let i = 1; i <= pokemonsNumber; i++) {
    try {
      await getPokemon(i)
    } catch (error) {
      console.log(error)
    }
  }
}

const getPokemon = async id => {
  try {
    let reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokemon = await reponse.json()
    createPokemonCard(pokemon)
  } catch (error) {
    console.log(error)
  }
}

const createPokemonCard = pokemon => {  
  const pokemonsTypes = pokemon.types.map(typeInfo => typeInfo.type.name)

  return main.innerHTML += `
  <div class="card ${pokemonsTypes[0]}">
    <img class="image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
    <strong class="name">${pokemon.name}</strong>
    <span class="type">${pokemonsTypes.join(' / ')}</span>
  </div>
  `
}

getContent()