
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
            item.types = details.types.map((type) => type.type.name);
            item.abilities = details.abilities.map((abilities) => abilities.ability.name);
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRespository.loadDetails(pokemon).then(function () {
            showModal(
                pokemon.name,
                pokemon.name + "'s heoght is:" + pokemon.height,
                pokemon.imageURL
            );
        });
    }

    return {
        add: add,
        getAll:getAll,
        addListItem : addListItem,
        loadList:loadList,
        loadDetails : loadDetails,
        showDetails : showDetails
    };
})();

//ADD MODAL AND DIALOG - 1.8
(function(){ 
    let modalContainer = document.querySelector('#modal-container');
    let dialogPromiseReject; //This can be set later, by showDialog
    
    function showModal(title, text) {
    //Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}
    
    modalContainer.addEventListener('click', (e) => {
      //since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
    });
}); 
    
function hideModal() {
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
    }
}

function showDialog(title, text) {
    showModal(title, text);

      //We want to add a confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';
    
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
    
  // We want to focus the confirm Button so that the user can simply press Enter
    confirmButton.focus();

    //Return a promise that resolves when confirmed, else rejects
    return new Promise ((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; //Reset this
        hideModal();
        resolve();
    }); 
      //This can be used to reject from other functions
    dialogPromiseReject = reject;
    });
}

    document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
});

    document.querySelector('#show-dialog').addEventListener('click',() => {
    showDialog('Confirm Action', 'Are you sure you want to do this?').then(function() {
        alert('confirmed!');
    }, () => {
        alert('not confirmed');
    });
    });
    
    window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
    });
    
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal container,
      // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
    hideModal();
    }
})();
    //THE RETURN STATEMENT HERE - end of 1.8

pokemonRespository.loadList().then(function(){
    //data is loaded
    pokemonRespository.getAll().forEach(function(pokemon){
        pokemonRespository.addListItem(pokemon);
    });
});
