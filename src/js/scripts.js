const pokemonRepository = (function() {
  const repository = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  //Creates list of pokemon from API loaded via showDetails() to be displayed inside buttons
  //Displays details in modal with click event
  function addListItem(pokemon) {
    const pokemonList = $('.list-group');
    const pokemonListItem = $('<li></li>');
    pokemonListItem.addClass('group-list-item');

    const button = $('<button>' + pokemon.name + '</button>');
    button.addClass('btn btn-primary');
    button.attr('data-toggle', 'modal');
    button.attr('data-target', '#modal-container');

    pokemonListItem.append(button);
    pokemonList.append(pokemonListItem);

    button.on('click', function() {
      showDetails(pokemon);
    });
  }

  //loads pokemon list in JSON format from API
  //parses data into JavaScript
  //adds each pokemon with name and URL
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  //adds details to item from detailsURL
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        //Array.map() loops over array and returns modified version of that array
        //to access object values nested inside array
        item.types = details.types.map(function(typeObject) {
          return typeObject.type.name;
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  //creates modal
  function showModal(item) {
    const modalHeader = $('.modal-header');
    const modalTitle = $('.modal-title');
    const modalBody = $('.modal-body');

    //clears existing modal content
    modalTitle.empty();
    modalBody.empty();

    const titleElement = $('<h2>' + item.name + '</h2>');

    const imageElement = $('<img class="pokemon-image" style="width:100%">');
    imageElement.attr('src', item.imageUrl);

    //formats integers returned by loadDetails into floats with one decimal place
    function insertDecimal(num) {
      return (num / 10).toFixed(1);
    }

    const modifiedHeight = insertDecimal(item.height);
    const heightElement = $(
      '<p>' +
        '<span class="detail-category">Height: </span>' +
        modifiedHeight +
        'm' +
        '</p>'
    );
    heightElement.addClass('pokemon-height');

    const modifiedWeight = insertDecimal(item.weight);
    const weightElement = $(
      '<p>' +
        '<span class="detail-category">Weight: </span>' +
        modifiedWeight +
        'kg' +
        '</p>'
    );
    weightElement.addClass('pokemon-weight');

    const modifiedTypes = item.types.join(', ');
    const typesElement = $(
      '<p>' +
        '<span class="detail-category">Types: </span>' +
        modifiedTypes +
        '</p>'
    );
    typesElement.addClass('pokemon-types');

    //adds wrappers to manipulate modal content
    const detailsContainer = $('<div></div>');
    detailsContainer.addClass('container-fluid');

    const row = $('<div></div>');
    row.addClass('row');

    const imageWrapper = $('<div></div>');
    imageWrapper.addClass('col-sm-6');
    imageWrapper.addClass('image-wrapper');

    const nonImageElements = $('<div></div>');
    nonImageElements.addClass('col-sm-6');
    nonImageElements.addClass('non-image-elements');

    modalTitle.append(titleElement);
    modalBody.append(detailsContainer);

    detailsContainer.append(row);
    row.append(imageWrapper);
    row.append(nonImageElements);

    imageWrapper.append(imageElement);
    nonImageElements.append(heightElement);
    nonImageElements.append(weightElement);
    nonImageElements.append(typesElement);
  }

  //shows details in a modal
  function showDetails(item) {
    loadDetails(item).then(function() {
      showModal(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
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
