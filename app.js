
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


