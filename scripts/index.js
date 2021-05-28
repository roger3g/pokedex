let pokemonsNumber = 150 // 890

const getPokemon = async (value) => {
  for (let i = 1; i <= pokemonsNumber; i++) {
    try {
      let reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      let pokemon = await reponse.json()
      createPokemonCard(pokemon)
    } catch (error) {
      console.log(error)
    }
  }
}

const createPokemonCard = pokemon => {  
  const main = document.querySelector('#pokedex')
  const pokemonsTypes = pokemon.types.map(typeInfo => typeInfo.type.name)
  const pokemonsAbility = pokemon.abilities.map(teste => teste.ability.name.replace(/-/i , ' '))

  return main.innerHTML += `
  <div class="card">
    <div class="container-image ${pokemonsTypes[0]}">
     <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" class="poke-image" alt="${pokemon.name}">
    </div>

    <div class="container-info">
      <span class="poke-name">${pokemon.name} <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span></span>

      <section class="poke-info">
        <span class="poke-weight"><p class="value">${pokemon.weight / 10} kg</p> <p class="property">Weight</p></span>
        <div class="separator"></div>
        <span class="poke-type"><p class="value">${pokemonsTypes.join(' / ')}</p> <p class="property">Type</p></span>
        <div class="separator"></div>
        <span class="poke-type"><p class="value">${pokemon.height / 10} m</p> <p class="property">Height</p></span>
      </section>

      <h2>Ability</h2>
      <span class="poke-ability">${pokemonsAbility.join(', ')}</span>
    </div>
  </div>
  `
}

getPokemon()

setTimeout(() => {
  const load = document.querySelector('.pre-load')
  load.style.display = 'none'
  document.body.style.overflow = 'scroll'
}, 5000)
