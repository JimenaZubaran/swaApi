// $('.modal').modal();

//Primer request
fetch(`https://swapi.co/api/films/`).then(function (data){
  data.json().then(allFilms)
})


//Función para pintar los datos del primer request en el HTML
function allFilms(data){
  console.log(data);
  let films = data.results;
  let template = " ";
  //console.log(films);
  films.forEach(function(film){
    let title = film.title;
    let episode = film.episode_id;
    let characters = film.characters;
    //charactersRequest(characters);

    let listCharacters = " ";
    characters.forEach(function(person){
      listCharacters +=
      `<a class="modal-character modal-trigger"  id="modal" data-character="${person}" href="#modal1"><li>${person}</li></a>
      `
    })
    template +=
    `<div class="row">
        <div class="col s12 m6">
          <div class="col s12 card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title"><strong>Peli:</strong>
              ${title}</span>
              <p><strong>Episodio: </strong>
              ${episode}</p>
              <ul id"characters"><strong>Todos los personajes: </strong>${listCharacters}</ul>
            </div>
          </div>
        </div>
      </div>
      `
  })
  let filmsContainer = document.getElementById("films");
  filmsContainer.innerHTML = template;
}


//Modal
$(document).on("click", ".modal-character", viewModal);
//Selección de character modal
function viewModal(){
  let selectCharacter= $(this).data("character");
  console.log(selectCharacter);
  return charactersJson(selectCharacter);
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
                modalContainer.innerHTML = modalTemplate;
            })
        })
      }
