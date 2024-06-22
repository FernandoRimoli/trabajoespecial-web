'use strict'

let botonMenu = document.getElementById("menu-hamburguesa");
botonMenu.addEventListener("click", abrirmenu);

function abrirmenu(){
  let nav = document.getElementById("nav");
  nav.classList.toggle("mostrar-menu");
}

document.getElementById("boton-modo-claro").addEventListener("click", cambiarmodo);

function cambiarmodo(){
  document.getElementById("fondo").classList.toggle("modo-claro");
}
