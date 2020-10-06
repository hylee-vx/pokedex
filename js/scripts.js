let pokemonRepository = (function() {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object'
    ) {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  //Creates list of pokemon from API loaded via showDetails() to be displayed inside buttons
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
      showDetails(pokemon);
      });
    }

  //loads pokemon list in JSON format from API
  //parses data into JavaScript
  //adds each pokemon with name and URL
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(error) {
      console.error(error);
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
