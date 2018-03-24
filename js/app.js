 $('#modal1').modal();


//Primer request
fetch(`https://swapi.co/api/films/`).then(function (data){
  data.json().then(allFilms)
}).catch(function(err){
console.log(err);
})


//Función para pintar los datos del primer request en el HTML
function allFilms(data){
  console.log(data);
  let films = data.results;
  let template = ` `;
  let listCharacters = ` `;
  //console.log(films);
  films.forEach(function(film){
    let title = film.title;
    let episode = film.episode_id;
    let characters = film.characters;
    //charactersRequest(characters);

    //forEach anidado
    characters.forEach(function(person){
      listCharacters +=
      //ancor para que haga referencia la modal
      //se le pone una clase al li para iterarla y el data para obtener esa info
      `<a href="#modal1" class="modal-trigger">
      <li class="character-list" data-character="${person}" >${person}</li>
      </a> 
      `
    })
    template +=
    `<div class="row">
        <div class="col s12 m12">
          <div class="col s12 card blue-grey darken-1">
            <div class="col s12 card-content white-text">
              <span class="card-title"><strong>Título de la película:</strong>
              ${title}</span>
              <p><strong>Número de episodio: </strong>
              ${episode}</p>
              <ul id"characters"><strong>Conoce a los personajes haciendo click sobre los links: </strong>${listCharacters}</ul>
            </div>
          </div>
        </div>
      </div>
      `
     
  })
  let filmsContainer = document.getElementById("films");
  filmsContainer.innerHTML = template;

  let liCollectionHtml = document.getElementsByClassName("character-list"); //collecion de li
  getCharacter(liCollectionHtml);
}


function getCharacter(liCollectionHtml){
  //convertimos la coleccion de li en un array
  let liCharacter = Array.from(liCollectionHtml);
  console.log(liCharacter);
  //iterar el array de li
  liCharacter.forEach(function(li){
    //poner un evento a cada uno de los li y ejecutar funcion al ver ese evento
  li.addEventListener("click", getDetailsCharacters);
  })
}


function getDetailsCharacters(e){
  e.preventDefault;
  //this en = a event.target
  //obtener data-character="${person}" 
  //e.target.getAttribute("data-character")
let characterUrl = e.target.dataset.character;
console.log(characterUrl);
console.log(e.target.value);
//segundo request para sacar info de cada uno de los personajes
fetch(characterUrl).then(function(response){
  response.json().then(function(result){
    paintModall(result);
  })
})
}


function paintModall(item){
  console.log(item);
  //metodo de jquery para pintar modal. Ponerlo al principio
  //pintar modal en usando los selecteros y poniendoles el texto como .html
  $("#name").html("Name: " + item.name);
  $("#height").html("Height: " + item.height);
  $("#hair-color").html("Hair color: " + item.hair_color);
  $("#mass").html("Mass: " + item.mass);
  $("#skin-color").html("Skin color: " + item.skin_color);
 // $("#picture").attr("src",`${item.name}.png`);
  console.log(document.getElementById("modal1"))
}


/*(function ($) {
  $(function () {

      //initialize all modals          
      $('.modal').modal();

      //now you can open modal from code
      $('#modal1').modal('open');

      //or by click on trigger
      $('.trigger-modal').modal();

  }); // end of document ready
})(jQuery);*/

/*//Modal
$(document).on("click", ".modal-character", viewModal);
//Selección de character modal
function viewModal(){
  let selectCharacter= $(this).data("character");
  console.log(selectCharacter);
   charactersJson(selectCharacter);
}

//json e información de character seleccionado para pintar en templete
function charactersJson(selectCharacter){
  console.log("listo");
  fetch(`${selectCharacter}`).then(function(data){
            data.json().then(function(item){
              let name = item.name;
              let height = item.height;
              let hairColor = item.hair_color;
              let mass = item.mass;
              let skinColor = item.skin_color;

              console.log(name);
              console.log(height);
              console.log(hairColor);
              console.log(mass);
              console.log(skinColor);

              let nameModal = document.getElementById("name");
              let heightModal = document.getElementById("height");
              let hairColorModal = document.getElementById("hair-color");
              let massModal = document.getElementById("mass");
              let skinColorModal = document.getElementById("skin-color");

              nameModal.innerHTML = name;
              heightModal.innerHTML = height;
              hairColorModal.innerHTML = hairColor;
              massModal = innerHTML = mass;
              skinColorModal.innerHTML = skinColor;


                let modalTemplate =
                `
                <div id="" class="modal modal-fixed-footer">
                  <div class="modal-content">
                    <h4>${name}</h4>
                    <p>${height}</p>
                    <p>${hairColor}</p>
                    <p>${mass}</p>
                    <p>${skinColor}</p>
                  </div>
                </div>
                `
                console.log(modalTemplate);
                  let modalContainer = document.getElementById('modal1');
                  filmsContainer.innerHTML = modalTemplate;
            })
        })
      }
*/