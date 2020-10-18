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
  //Displays details in modal with click event
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
      //Array.map() loops over array and returns modified version of that array
      //to access object values nested inside array
      item.types = details.types.map(function(typeObject) {
        return typeObject.type.name;
      });
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
      titleElement.classList.add('pokemon-name');
      titleElement.innerText = item.name;

      let imageElement = document.createElement('img');
      imageElement.classList.add('pokemon-image');
      imageElement.src = item.imageUrl;

      let imageWrapper = document.createElement('div');
      imageWrapper.classList.add('pokemon-image-wrapper');

      //formats integers returned by loadDetails into floats with one decimal place
      function insertDecimal(num) {
        return (num / 10).toFixed(1);
      }

      let heightElement = document.createElement('p');
      heightElement.classList.add('pokemon-height');
      let modifiedHeight = insertDecimal(item.height);
      heightElement.innerHTML = `<span class='detail-category'>Height: </span>${modifiedHeight}m`;

      let weightElement = document.createElement('p');
      weightElement.classList.add('pokemon-weight');
      let modifiedWeight = insertDecimal(item.weight);
      weightElement.innerHTML = `<span class='detail-category'>Weight: </span>${modifiedWeight}kg`;

      let typesElement = document.createElement('p');
      typesElement.classList.add('pokemon-types');
      let modifiedTypes = item.types.join(', ');
      typesElement.innerHTML = `<span class='detail-category'>Types: </span>${modifiedTypes}`;

      let detailsContainer = document.createElement('div');
      detailsContainer.classList.add('details-container');

      let nonImageElements = document.createElement('div');
      nonImageElements.classList.add('non-image-elements');

      modal.appendChild(closeButtonElement);
      modal.appendChild(detailsContainer);
      detailsContainer.appendChild(titleElement);
      detailsContainer.appendChild(imageWrapper);
      detailsContainer.appendChild(nonImageElements);
      imageWrapper.appendChild(imageElement);
      nonImageElements.appendChild(heightElement);
      nonImageElements.appendChild(weightElement);
      nonImageElements.appendChild(typesElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
  }

  //shows details in a modal
  function showDetails(item) {
    loadDetails(item).then(function() {
        showModal(item);
    });
  }

  //closes modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', function(e) {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
    hideModal: hideModal
  };
})();

//Calls loadList(), then executes getAll()
//Calls addListItem() to display list of pokemon inside buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
