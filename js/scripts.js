
//add api w pokemon details
let pokemonRepository = (function(){
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
            item.types = details.types.map((type) => type.type.name);
            item.abilities = details.abilities.map((abilities) => abilities.ability.name);
        }).catch(function(e) {
            console.error(e);
        });
    }

// show modal w pokemon details

/*function showModal(title, text, img) {
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = title; 
    let contentElement = document.querySelector(".p");
    contentElement.innerText = text;
    let imageElement = document.querySelector(".img");
    imageElement.setAttribute("src", img);
    imageElement.setAttribute("alt", "Pokemon image");
    imageElement.setAttribute("width", 150);
    imageElement.setAttribute("height", 150);
}*/

//FIGURING OUT HOW TO SHOW DETAILS WHEN CLICKING ON BUTTON
/*    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(
                pokemon.name,
                pokemon.name + "'s height is:" + pokemon.height,
                pokemon.imageURL
            );
        });
    }*/


    //function to show details
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            showDetailsModal(pokemon);
        });
    }

//function to show details modal
function showDetailsModal(pokemon){
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.text(pokemon.name);

    let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
    let height = $("<p>" + "Height: " + pokemon.height + "</p>");
    let weight = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    let types = $("<p>" + "Types: " + pokemon.types + "</p>");
    /*let abilities = $("<p>" + "Abilities: " + pokemon.abilities + "</p>");*/

// Add the new modal content TRYING TO GET CLOSE BUTTON
/*let closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';*/



    modalBody.append(image);
    modalBody.append(height);
    modalBody.append(weight);
    modalBody.append(types);
    

modalBody.classList.add('is-visible');
}

    return {
        add: add,
        getAll:getAll,
        addListItem : addListItem,
        loadList:loadList,
        loadDetails : loadDetails,
        showDetails : showDetails,
        showDetailsModal : showDetailsModal
    };
})();

pokemonRepository.loadList().then(function(){
    //data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});