
//add api w pokemon details
let pokemonRespository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//add new pokemon to pokemonList array
function add(pokemon) {
    if (
        typeof pokemon === "object" &&
        "name" in pokemon
    ){
    pokemonList.push(pokemon);
} else {
    console.log("pokemon is not correct")
}
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
pokemonList.appendChild(button);
//add event listener to show details when clicked pokemon
button.addEventListener("click", function() {
    showDetails(pokemon);
});
}

function loadList(){
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function (json){
        json.results.forEach(function (item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function (e){
        console.error(e);
    })
}

    // detailsUrl to load detailed data for given pokemon
    function loadDetails (item){
        let url = item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then(function(details) {
            //add details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            DataTransferItemList.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRespository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    return {
        add: add,
        getAll:getAll,
        loadList:loadList,
        loadDetails : loadDetails,
        showDetails : showDetails
    };
})();

pokemonRespository.loadList().then(function(){
    //data is loaded
    pokemonRespository.getAll().forEach(function(pokemon){
        pokemonRespository.addListItem(pokemon);
    });
});

// Not sure what this is anymore
pokemonRespository.add({name: 'Mewtwo', height: 6, types: ["pressure"]});

console.log(pokemonRespository.getAll());

pokemonRespository.getAll().forEach(function(pokemon) {
    pokemonRespository.addListItem(pokemon);
});
