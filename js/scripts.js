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
//add new pokemon to pokemonList array
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
//return all items on pokemonList array
    function getAll()   {
        return pokemonList;
    }
//add pokemon to list with format of button
    function addListItem(pokemon){
        
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement ('button');
    button.innerText = pokemon.name;
    button.classList.add ('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(pokemonList);
    //add event listener to show details when clicked pokemon
    button.addEventListener("click", function() {
        showDetails(pokemon);
    });

        }
    return  {
        add : add,
        getAll : getAll,
        addListItem : addListItem,
        showDetails : showDetails,
    };

    function showDetails(pokemon) {
        console.log(pokemon);
    }
})();


pokemonRespository.add({name: 'Mewtwo', height: 6, types: ["pressure"]});

console.log(pokemonRespository.getAll());

pokemonRespository.getAll().forEach(function(pokemon) {
    pokemonRespository.addListItem(pokemon);
});
