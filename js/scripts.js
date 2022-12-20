
let pokemonRespository = (function() {
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

    function addListItem(pokemon){
        let PokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
    
        let button = document.createElement ('button');
        button.innerText = pokemon.name;
        button.classList.add ('name-button');
        
        PokemonList.appendChild(listItem);
        listItem.appendChild(button);
    }

    function getAll()   {
        return pokemonList;
    }
    return  {
        add: add,
        getAll: getAll
    };

})();

pokemonRespository.add({name: 'Mewtwo'});

pokemonRespository.getAll().forEach(function(pokemon) {
    pokemonRespository.aadListItem(pokemon);
});
