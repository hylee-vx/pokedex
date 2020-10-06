let pokemonRepository = (function() {
  let repository = [];

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
    button.addEventListener('click', function() {
      showDetails(pokemon)
      });
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
