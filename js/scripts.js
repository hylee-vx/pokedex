let pokemonRepository = (function() {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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

  //adds details to item from detailsURL
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function(error) {
      console.error(error);
    });
  }

  //creates modal
  function showModal(item) {
      //clears existing modal content
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = item.name;

      let imageElement = document.createElement('img');
      imageElement.classList.add('pokemon-image');
      imageElement.src = item.imageUrl;

      let heightElement = document.createElement('p');
      heightElement.classList.add('pokemon-height');
      heightElement.innerText = 'Height: ' + item.height;

      let weightElement = document.createElement('p');
      weightElement.classList.add('pokemon-weight');
      weightElement.innerText = 'Weight: ' + item.weight;

      //will only print out first type
      let typesElement = document.createElement('p');
      item.types.forEach(function(index) {
        typesElement.innerText = 'Types: ' + index.type.name;
      })

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      modal.appendChild(weightElement);
      modal.appendChild(typesElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Calls loadList(), then executes getAll()
//Calls addListItem() to display list of pokemon inside buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
