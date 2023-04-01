console.log("conected...");

// contenedores
const searchData = document.getElementById("searchPokemon");
const resultApi = document.querySelector(".contentApi");
const contentBtn = document.getElementById("contentBtn");

// variables para navigate
let next;
let previous;

//create elements
const pokemonItem = document.createElement("DIV");
pokemonItem.classList = "pokemon-item";
const fragment = document.createDocumentFragment();

// URLS
const seePokemosURL = "https://pokeapi.co/api/v2/pokemon/";

const searchPokemon = async (value) => {
  let data = value.toLowerCase();

  try {
    const response = await fetch(seePokemosURL + data);

    // Valida el resonse
    if (!response.ok) {
      resultApi.innerHTML = `<div class="messageError">ERROR en el nombre o numero del Pokemon: ${data}</div>`;
      return;
    }

    const result = await response.json();
    let img = await result.sprites.front_default;
    //Result = pokemon del search
    if (result) {
      resultApi.innerHTML = `
                  <img src ="${img}" >
                  <div class="namePokemon">Name: ${result.name.toUpperCase()}</div>
                  <div class="numeroPokemon">Numero: ${result.id}</div>
                  <div class="altura">Altura: ${result.height} m</div>
                  <div class="peso">Peso: ${result.weight} kg</div>
                  
                  <br>
              `;
    }
  } catch (err) {
    if (searchData.value != "") {
      console.log(err);
      resultApi.innerHTML = `<div class="messageError">ERROR la carga de los pokemons ${err}</div>`;
    }
  }
};

const searchUrl = "https://pokeapi.co/api/v2/pokemon/";

const callApi = async (url) => {
  const getApi = await fetch(url);
  const result = await getApi.json();

  seePokemons(result.results);

  next = result.next
    ? `<button class="btn" data-url=${result.next}> > </button>`
    : ``;

  previous = result.previous
    ? `<button class="btn" data-url=${result.previous}> < </button>`
    : ``;

  contentBtn.innerHTML = previous + " " + next;
};

const seePokemons = async (data) => {
  //PARA PODER CARGAR LOS SIGUIENTES DATOS, POR QUE CARGARIA CON LOS ANTERIORES
  pokemonItem.innerHTML = "";
  resultApi.innerHTML = "";

  try {
    for (let index of data) {
      const respuesta = await fetch(index.url);
      if (!respuesta.ok) {
        resultApi.innerHTML = `<div class="messageError">ERROR en la carga de datos de  los Pokemon</div>`;
        return;
      }

      const result = await respuesta.json();
      let dataPokemon

      let imgPokemon = await result.sprites.front_default;
      let tipoPokemon = await result.types.map(
        (type) => `<p class = "${type.type.name}">${type.type.name}</p>`
      );
      tipoPokemon = tipoPokemon.join("");

    //   let numeroPokemon = result.id.toString();
    //     if(numeroPokemon == 1){

    //     }
        
      infoPokemons = `
                <div class = "poke_info" >
                    <img src="${imgPokemon}" alt="${result.name}">
                    <div class="dataBasic">
                        <p>${result.id}</p>
                        <h3 class="namePokemon">Name: ${result.name}</h3>
                    </div>

                    <div class ="atributePokemon">
                        ${tipoPokemon}
                    </div>
                    <div class = "features">
                        <p>${result.height} M</p>
                        <p>${result.weight} Kg</p>
                    </div>

                    <a href="../templates/fichaTecnicaPokemon.html" target = "_blank">See More</a>

                </div>
                `;
      pokemonItem.innerHTML += infoPokemons;

      fragment.appendChild(pokemonItem);
      infoPokemons = "";
    }
    resultApi.appendChild(fragment);
    
  } catch (err) {
    console.log(err);
    return (resultApi.innerHTML = `ERROR EN EL Cargar los datos`);
  }
};

searchData.addEventListener("keyup", (e) => {
  e.preventDefault();
  console.log(e);
  let { value } = e.target;

  value === "" ? callApi(seePokemosURL) : searchPokemon(value);
});

callApi(seePokemosURL);

contentBtn.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    let value = event.target.dataset.url;
    console.log(value);
    callApi(value);
  }
});

