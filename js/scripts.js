var pokemonRespository = (function() {
let pokemonList = [
    {
        name: 'Lucario', 
        height: 4, 
        types: ['steel', 'speed']
    }, 
    {
        name: 'Vaporeon', 
        height: 3, 
        types: 'water'
    }, 
    {
        name: 'Snorlax', 
        height: 7, 
        types: ['fat', 'immunity']
    }, 
    {
        name: 'Mewtwo', 
        height: 6, 
        types: 'pressure'
    }, 
    {
        name: 'Ninetales', 
        height: 3, 
        types: 'fire'
    }, 
];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll()   {
        return pokemonList;
    }

    function addListItem(pokemon){
        
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement ('button');
    button.innerText = pokemon.name;
    button.classList.add ('button-class');
    pokemonList.appendChild(button);
    listItem.appendChild(pokemonList);

        }
    return  {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };

})();

console.log(pokemonRespository.getAll());
pokemonRespository.add({name: 'Mewtwo'});

console.log(pokemonRespository.getAll());

pokemonRespository.getAll().forEach(function(pokemon) {

    pokemonRespository.addListItem(pokemon);
});
