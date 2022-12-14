
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
    function getAll()   {
        return pokemonList;
    }
    return  {
        add: add,
        getAll: getAll
    };
})();

console.log(pokemonRespository.getAll());
pokemonRespository.add({name: 'Mewtwo'});
console.log(pokemonRespository.getAll())

pokemonRespository.getAll()forEach(function(pokemon) {
    if (pokemon.height > 4) {
    document.write(pokemon.name + " is " + pokemon.height + " feet tall and it is a " + pokemon.types + " type! Wow! It is really tall" + "</br>");
}
// i am a bit confused as to how to include the if/else here
else {
    document.write(pokemon.name + " is " + pokemon.height + " feet tall and it is a " + pokemon.types + "type!" + "</br>");
}
});