
const form = document.getElementById("form-busqueda");
const input = document.getElementById("input-nombre");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";


form.addEventListener("submit", (evento) => {
  evento.preventDefault(); 
  const nombre = input.value.trim().toLowerCase();
  if (nombre) buscarPokemon(nombre);
});


async function buscarPokemon(nombre) {
  mostrarMensaje("Cargando...");
  resultado.innerHTML = "";

  try {
    const response = await fetch(API_URL + nombre);

    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();
    mostrarMensaje("");
    renderPokemon(data);
  } catch (error) {
    mostrarMensaje(error.message, true);
  }
}


function renderPokemon(data) {
  const tipos = data.types
    .map((t) => `<span class="tipo">${t.type.name}</span>`)
    .join("");

  const stats = data.stats
    .map(
      (s) => `<li><span>${s.stat.name}</span><strong>${s.base_stat}</strong></li>`
    )
    .join("");

  resultado.innerHTML = `
    <article class="pokemon-card">
      <h2>${data.name}</h2>
      <p class="pokemon-id">#${data.id}</p>
      <img
        class="pokemon-img"
        src="${data.sprites.other["official-artwork"].front_default}"
        alt="${data.name}"
      >
      <div class="tipos">${tipos}</div>
      <div class="medidas">
        <span>Altura: ${data.height / 10} m</span>
        <span>Peso: ${data.weight / 10} kg</span>
      </div>
      <ul class="stats">${stats}</ul>
    </article>
  `;
}


function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.classList.toggle("error", esError);
}