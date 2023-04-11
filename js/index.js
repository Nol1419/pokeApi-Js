try {
  console.log("conected...");

  // contenedores
  const loadPage = document.getElementById("loadPage");
  const searchData = document.getElementById("searchPokemon");
  const resultApi = document.querySelector(".contentApi");
  const loadContent = document.getElementById("loadContent");
  const contentBtn = document.getElementById("contentBtn");
  const contentBtnButton = document.getElementById("contentBtnButton");

  const btnHeader = document.querySelectorAll(".btn-list");

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
      // console.log(response)

      const result = await response.json();
      // let img = await result.sprites.front_default;
      let img = await result.sprites.other.home.front_default;
      let tipoPokemon = await result.types.map(
        (type) =>
          `<p class = "${type.type.name}">${type.type.name.toUpperCase()}</p>`
      );
      tipoPokemon = tipoPokemon.join("");

      let classPokemonColor = await result.types.map(
        (type) => `${type.type.name}`
      );

      classPokemonColor = classPokemonColor.join("");

      let numeroPokemon = result.id.toString();
      if (numeroPokemon.length == 1) {
        numeroPokemon = "00" + numeroPokemon;
      } else if (numeroPokemon.length == 2) {
        numeroPokemon = "0" + numeroPokemon;
      }

      if (document.documentElement.clientWidth <= 800) {
        console.log("aaaa");
        if (result) {
          infoPokemons = `
                    <div class="poke_info" style ="width: 80%; margin: 0 auto; ">
                        <img src="${img}" alt="${result.name}" >
                        
                        <div class="dataBasic">
                            <p># ${numeroPokemon}</p>
                            <h2 class="namePokemon"> ${result.name.toUpperCase()}</h2>
                        </div>
    
                        <div class ="atributePokemon">
                            ${tipoPokemon}
                        </div>
                        <div class = "features">
                            <p>${result.height} M</p>
                            <p>${result.weight} Kg</p>
                        </div>
    
                    </div>  
                `;
          pokemonItem.innerHTML = infoPokemons;
          pokemonItem.style.gridTemplateColumns = "1fr";

          fragment.appendChild(pokemonItem);
        }
      } else if (result) {
        infoPokemons = `
                  <div class="poke_info" style ="width: 32%; margin: 0 auto;"
                      >
                      
                      <img src="${img}" alt="${result.name}" >
                      
                      <div class="dataBasic">
                          <p># ${numeroPokemon}</p>
                          <h2 class="namePokemon"> ${result.name.toUpperCase()}</h2>
                      </div>
  
                      <div class ="atributePokemon">
                          ${tipoPokemon}
                      </div>
                      <div class = "features">
                          <p>${result.height} M</p>
                          <p>${result.weight} Kg</p>
                      </div>
  
                  </div>  
              `;

        pokemonItem.innerHTML = infoPokemons;
        pokemonItem.style.gridTemplateColumns = "1fr";

        fragment.appendChild(pokemonItem);
        // console.log(infoPokemons);
      }
      resultApi.appendChild(fragment);
    } catch (err) {
      if (searchData.value != "") {
        resultApi.innerHTML = `<div class="messageError">ERROR la carga de los pokemons ${err}</div>`;
      }
    }
  };

  const searchUrl = "https://pokeapi.co/api/v2/pokemon/";

  // llama y envia los datos a la funcion de seePokemnos
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

    contentBtn.innerHTML = previous + next;
    contentBtnButton.innerHTML = previous + next;
  };

  // mostrar todos los pokemons por navegacion o secciones
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
        // console.log(result);

        // let imgPokemon = await result.sprites.front_default;
        let imgPokemon = await result.sprites.other.home.front_default;

        let tipoPokemon = await result.types.map(
          (type) =>
            `<p class = "${type.type.name}">${type.type.name.toUpperCase()}</p>`
        );

        tipoPokemon = tipoPokemon.join("");

        let numeroPokemon = result.id.toString();
        if (numeroPokemon.length == 1) {
          numeroPokemon = "00" + numeroPokemon;
        } else if (numeroPokemon.length == 2) {
          numeroPokemon = "0" + numeroPokemon;
        }

        infoPokemons = `
                <div class = "poke_info">
                    <div class="loadContent" id="loadContent"></div>

                    <img src="${imgPokemon}" alt="${result.name}" >
                                                          
                    <div class="dataBasic">
                        <p># ${numeroPokemon}</p>
                        <h2 class="namePokemon"> ${result.name.toUpperCase()}</h2>
                    </div>

                    <div class ="atributePokemon">
                        ${tipoPokemon}
                    </div>
                    <div class = "features">
                        <p>${result.height} M</p>
                        <p>${result.weight} Kg</p>
                    </div>

                </div>

                <div class="more">aaaaaa</div>
              `;

        pokemonItem.innerHTML += infoPokemons;
        pokemonItem.style.gridTemplateColumns = "repeat(3, 1fr)";
        // pokemonItem.style.gridTemplateColumns = "repeat(3, 1fr)";
        fragment.appendChild(pokemonItem);
        infoPokemons = "";
      }
      resultApi.appendChild(fragment);
    } catch (err) {
      // console.log(err);
      return (resultApi.innerHTML = `<div class="messageError">ERROR en la carga de datos de  los Pokemon</div>`);
    }
  };

  // categorias de los tipos de pokemon
  const seePokemonsCategori = async (data) => {
    //PARA PODER CARGAR LOS SIGUIENTES DATOS, POR QUE CARGARIA CON LOS ANTERIORES
    resultApi.innerHTML = "";

    try {
      // let imgPokemon = await data.sprites.front_default;
      let imgPokemon = await data.sprites.other.home.front_default;

      let tipoPokemon = await data.types.map(
        (type) =>
          `<p class = "${type.type.name}">${type.type.name.toUpperCase()}</p>`
      );

      tipoPokemon = tipoPokemon.join("");

      let numeroPokemon = data.id.toString();
      if (numeroPokemon.length == 1) {
        numeroPokemon = "00" + numeroPokemon;
      } else if (numeroPokemon.length == 2) {
        numeroPokemon = "0" + numeroPokemon;
      }

      infoPokemons = `
                <div class = "poke_info">
                    <img src="${imgPokemon}" alt="${data.name}" >
                                                          
                    <div class="dataBasic">
                        <p># ${numeroPokemon}</p>
                        <h2 class="namePokemon"> ${data.name.toUpperCase()}</h2>
                    </div>

                    <div class ="atributePokemon">
                        ${tipoPokemon}
                    </div>
                    <div class = "features">
                        <p>${data.height} M</p>
                        <p>${data.weight} Kg</p>
                    </div>

                </div>

                <div class="more">aaaaaa</div>
              `;

      pokemonItem.innerHTML += infoPokemons;
      pokemonItem.style.gridTemplateColumns = "repeat(3, 1fr)";
      fragment.appendChild(pokemonItem);

      infoPokemons = "";
      // console.log(infoPokemons);

      resultApi.appendChild(fragment);
    } catch (err) {
      // console.log(err);
      return (resultApi.innerHTML = `<div class="messageError">ERROR en la carga de datos de  los Pokemon</div>`);
    }
  };

  // ejecuta el buscador / funcion searchPokemon
  searchData.addEventListener("keyup", (e) => {
    e.preventDefault();
    let { value } = e.target;

    if (value === "") {
      contentBtn.style.display = "flex";
      contentBtnButton.style.display = "flex";
      callApi(seePokemosURL);
    } else {
      contentBtn.style.display = "none";
      contentBtnButton.style.display = "none";
      searchPokemon(value);
    }
  });

  // muestra la interfaz de inicio
  callApi(seePokemosURL);

  // start navegadores boton
  contentBtn.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
      let value = event.target.dataset.url;
      callApi(value);
    }
  });

  contentBtnButton.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
      let value = event.target.dataset.url;
      callApi(value);
    }
  });
  // end navegadores boton

  // boton de categorias
  btnHeader.forEach((boton) =>
    boton.addEventListener("click", async (event) => {
      const btnId = event.currentTarget.id;
      pokemonItem.innerHTML = "";

      if (btnId === "ver-todo") {
        contentBtn.style.display = "flex";
        contentBtnButton.style.display = "flex";
        callApi(seePokemosURL);
      }

      for (let i = 0; i < 1010; i++) {
        fetch(seePokemosURL + i)
          .then((respon) => respon.json())
          .then((data) => {
            const tipos = data.types.map((type) => type.type.name);

            if (tipos.some((tipo) => tipo.includes(btnId))) {
              contentBtn.style.display = "none";
              contentBtnButton.style.display = "none";
              seePokemonsCategori(data);
            }
          });
      }
    })
  );

  window.addEventListener("scroll", () => {
    let scrollUp = document.getElementById("scrollUp");
    let btnScroll = document.getElementById("btnScroll");

    let scrollLimit = document.documentElement.scrollTop;
    let scrollInitial = 100;

    if (scrollLimit > scrollInitial) {
      scrollUp.style.display = "block";
    } else {
      scrollUp.style.display = "none";
    }

    // btn regres top = 0
    btnScroll.addEventListener("click", () => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("load", () => {
    loadPage.style.display = "none";
  });

} catch (err) {
  console.log(err);

}
