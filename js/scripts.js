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

//function add(pokemon) {
//    if(
//        typeof pokemon === "object" &&
//        "name" in pokemon &&
//        "height" in pokemon &&
//        "types" in pokemon 
//    ) {
//        respository.push(pokemon);
//    } else {
//        console.log("pokemon is not correct");
//    }
//}

//add api w pokemon details
let pokemonRespository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
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

    return {
        add: add,
        getAll:getAll,
        loadList:loadList,
        loadDetails : loadDetails
    };
})();

pokemonRespository.loadList().then(function(){
    //data is loaded
    pokemonRespository.getAll().forEach(function(pokemon){
        pokemonRespository.addListItem(pokemon);
    });
});


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
    pokemonList.appendChild(button);
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
