
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';

let pokemonList = [
    {name: 'Lucario', height: 4, types: ['steel', 'speed']}
    {name: 'Vaporeon', height: 3, types: 'water'}
    {name: 'Snorlax', height: 7, types: ['fat', 'immunity']}
    {name: 'Mewtwo', height: 6, types: 'pressure'}
    {name: 'Ninetales', height: 3, types: 'fire'}
];

for (let i = 0;  
    i < pokemonList.length; i++) {
        if (pokemonList [i].height > 3) {
            document.write(pokemonList[i].name + " is " + pokemonList[i].height + " feet tall and it is a " + pokemonList[i].types + " type! Wow! It is really tall")
        }
        else {
            document.write (pokemonList[i].name + " is " + pokemonList[i].height) + "feet tall and it is a " + pokemonList[i].types + "type!"
        }
    
}