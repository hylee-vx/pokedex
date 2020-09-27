let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, weight: 6.9, types:['grass', 'poison']},
  {name: 'Weedle', height: 0.3, weight: 3.2, types:['bug', 'poison']},
  {name: 'Onix', height: 8.8, weight: 210, types: ['rock', 'ground']},
  {name: 'Pidgey', height: 0.3, weight: 1.8, types: ['flying', 'normal']},
  {name: 'Fearow', height: 1.2, weight: 38, types: ['flying', 'normal']},
  {name: 'Nidoqueen', height: 1.3, weight: 60, types: ['ground', 'poison']}
];

//Shows each pokemon's name and height
for (let i = 0; i < pokemonList.length; i++) {
  let pokemonHeight = '<h2>' + pokemonList[i].name + '</h2>' +
  '<p>' + 'Height: ' + pokemonList[i].height + 'm' + '</p>';
  //Highlights tallest pokemon
  if (pokemonList[i].height < 2) {
    document.write(pokemonHeight)
  } else if (pokemonList[i].height >= 2) {
    document.write(
      pokemonHeight +
      '<span id="big-height">' + 'Wow, that\'s big!' + '</span>'
    )
  }
}
