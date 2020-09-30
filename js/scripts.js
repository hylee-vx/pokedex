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

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  //Creates list of pokemon from var repository to be displayed inside buttons
  //Prints details to console with click event
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-standard');
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    button.addEventListener('click', showDetails);
    }

  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem
  };
})();

//Loops through all pokemon in var repository in IIFE and displays in buttons
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  }
);
