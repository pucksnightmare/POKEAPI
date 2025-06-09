// Buscar datos del Pokémon dependiendo de su número o nombre
function buscarPokemon(contenedorNumero) {
  let inputId = `pokemonInput${contenedorNumero}`;
  let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  fetch(urlApi)
    .then(response => {
      if (!response.ok) throw new Error("Pokémon no encontrado");
      return response.json();
    })
    .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
    .catch(() => mostrarError(contenedorNumero));
}

// Mostrar información del Pokémon
function mostrarPokemon(pokemon, contenedorNumero) {
  let infoDiv = document.getElementById(`pokemonInfo${contenedorNumero}`);

  const tipos = pokemon.types.map(t => t.type.name).join(", ");
  const habilidades = pokemon.abilities.map(a => a.ability.name).join(", ");

  // Construcción de estadísticas con barras
  const stats = pokemon.stats.map(stat => {
    const nombre = stat.stat.name;
    const valor = stat.base_stat;
    const clase = getStatClass(nombre);

    return `
      <div class="stat">
        <span class="stat-name">${nombre}</span>
        <div class="stat-bar stat ${clase}" style="width: ${valor / 2}%"></div>
        <span>${valor}</span>
      </div>
    `;
  }).join("");

  infoDiv.innerHTML = `
    <h2 class="pk-name">${pokemon.name.toUpperCase()}</h2>
    <img class="pk-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
    <p>Número: ${pokemon.id}</p>
    <p>Peso: ${pokemon.weight / 10} kg</p>
    <p>Altura: ${pokemon.height / 10} m</p>
    <p class="info-extra"><strong>Tipos:</strong> ${tipos}</p>
    <p class="info-extra"><strong>Habilidades:</strong> ${habilidades}</p>
    <div class="stats">${stats}</div>
  `;
}

// Mostrar error si no se encuentra el Pokémon
function mostrarError(contenedorNumero) {
  let infoDiv = document.getElementById(`pokemonInfo${contenedorNumero}`);
  infoDiv.innerHTML = `
    <p style="color: red;">No se encontró el Pokémon. Verifica el nombre o número.</p>
  `;
}

// Obtener clase CSS para cada stat
function getStatClass(nombreStat) {
  if (nombreStat.includes("hp")) return "hp";
  if (nombreStat.includes("attack")) return "attack";
  if (nombreStat.includes("defense")) return "defense";
  if (nombreStat.includes("speed")) return "speed";
  return "special";
}

// Cargar pokemones por defecto al inicio
window.onload = function () {
  document.getElementById("pokemonInput1").value = "25"; // Pikachu
  buscarPokemon(1);
  document.getElementById("pokemonInput2").value = "4"; // Charmander
  buscarPokemon(2);
};
