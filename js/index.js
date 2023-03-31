console.log("conected...");

// const btn = document.getElementById("btn");
// const btnSearch = document.getElementById("btnSearch");
const searchData = document.getElementById("searchPokemon");
const resultApi = document.querySelector(".seeResultApi");
// const seeAll = document.querySelector(".resultAll");

const searchUrl = "https://pokeapi.co/api/v2/pokemon/";

const seePokemosURL = "https://pokeapi.co/api/v2/pokemon/";


const searchPokemon = async () =>{
    // alert("Conected");
    let data = searchData.value.toLowerCase();

    try{
        const response = await fetch(searchUrl + data);
        // Valida el resonse
        if(!response.ok){
            resultApi.innerHTML = `<div class="messageError">ERROR en el nombre o numero del Pokemon: ${data}</div>`;
            return;
        }

        const result = await response.json();
        let img = await result.sprites["front_default"];
        
        //Result = pokemon del search
        if(result){
            resultApi.innerHTML = `
                <img src ="${img}" >
                <div class="namePokemon">Name: ${result.name.toUpperCase()}</div>
                <div class="numeroPokemon">Numero: ${result.id}</div>
                <div class="altura">Altura: ${result.height} m</div>
                <div class="peso">Peso: ${result.weight} kg</div>
                
                <br>
            `;

        }


    }catch(err){
        if(searchData.value != ""){
            console.log(err);
            resultApi.innerHTML = `<div class="messageError">ERROR la carga de los pokemons ${err}</div>`;
        }
    }
}


const seePokemons = async () => {
    try{        
        let getUrlPokemos = await fetch(searchUrl);
        let responseUrlPokemon = await getUrlPokemos.json();
        let countPokemon = responseUrlPokemon.results.length;
        // let nextCountPokemon = responseUrlPokemon.results.length + 20;
        console.log(countPokemon);

        for (let initial = 1; initial < countPokemon; initial++) {
            const response = await fetch((seePokemosURL + initial));
            // || (response.readyState == 4 && response.status == 200)

            if(!response.ok){
                resultApi.innerHTML = `<div class="messageError">ERROR en la carga de datos de los Pokemon</div>`;
                return;
            }

            const result = await response.json();
            let imgPokemon = await result.sprites.front_default;
    
            console.log(result);
            // console.log(imgPokemon);

            resultApi.innerHTML += `
                <div class="pokemon-item">
                    <div class="namePokemon">Name: ${result.name}</div>
                    <img src="${imgPokemon}" alt="${result.name}">
                </div>
            `;

            
        }

    }catch(err){
        console.log(err);
        return resultApi.innerHTML = `ERROR EN EL Cargar los datos`;
    }
}


searchData.addEventListener("keyup" , (e) =>{
    e.preventDefault();
    searchPokemon()

    if(searchData.value == ""){
        seePokemons();
    }
})

window.addEventListener("load", seePokemons());