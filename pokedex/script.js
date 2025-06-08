// Buscar datos del Pokémon dependiendo de su número o nombre
function buscarPokemon(contenedorNumero) {
  let inputId = `pokemonInput${contenedorNumero}`;
  let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  fetch(urlApi)
    .then(response => response.json())
    .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
    .catch(() => mostrarError(contenedorNumero));
}

// Mostrar información del Pokémon
function mostrarPokemon(datosPokemon, contenedorNumero) {
  let infoDivId = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivId);

  infoDiv.innerHTML = `
    <h2 class="pk-name">${datosPokemon.name.toUpperCase()}</h2>
    <img class="pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}">
    <p>Número: ${datosPokemon.id}</p>
    <p>Peso: ${datosPokemon.weight / 10} kg</p>
    <p>Altura: ${datosPokemon.height / 10} m</p>
  `;
}

// Mostrar error si no se encuentra el Pokémon
function mostrarError(contenedorNumero) {
  let infoDivId = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivId);

  infoDiv.innerHTML = `
    <p style="color: red;">No se encontró el Pokémon. Verifica el nombre o número.</p>
  `;
}
