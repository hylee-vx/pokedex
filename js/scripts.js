let pokemonRepository = (function() {
  let repository = [
    {name: 'Bulbasaur', height: 0.7, weight: 6.9, types:['grass', 'poison']},
    {name: 'Weedle', height: 0.3, weight: 3.2, types:['bug', 'poison']},
    {name: 'Onix', height: 8.8, weight: 210, types: ['rock', 'ground']},
    {name: 'Pidgey', height: 0.3, weight: 1.8, types: ['flying', 'normal']},
    {name: 'Fearow', height: 1.2, weight: 38, types: ['flying', 'normal']},
    {name: 'Nidoqueen', height: 1.3, weight: 60, types: ['ground', 'poison']}
  ];

  function add(pokemon) {
    if
    (typeof pokemon === 'object')
    {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

function getPokemonHeight(character) {
  //Shows each pokemon's height
  let pokemonHeight =
  `<h2>${character.name}</h2>
  <p>Height: ${character.height}m</p>`;
  //Comment for tallest pokemon
  let bigHeight =
  `<span id="big-height">Wow, that's big!</span>`;
  //Highlights tallest pokemon with var bigHeight
  if(character.height < 2) {
    document.write(pokemonHeight)
  } else if (character.height >= 2) {
    document.write(pokemonHeight + bigHeight)
  }
}

pokemonRepository.getAll().forEach(getPokemonHeight);
