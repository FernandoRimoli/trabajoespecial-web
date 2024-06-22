'use strict'

const url = "https://6671c03de083e62ee43cf672.mockapi.io/api/libros";

document.getElementById("libros-form").addEventListener("submit", AgregarLibro);

async function CargarTabla() {
  let response = await fetch(url);
  let libros = await response.json();

  let body = document.getElementById("body");
  body.innerHTML = '';

  libros.forEach(libro => {
    let tr = document.createElement('tr');
    let tdTitulo = document.createElement('td');
    let tdTipo = document.createElement('td');
    let tdAnio = document.createElement('td');
    let btnEditar = document.createElement('button');
    let btnBorrar = document.createElement('button');

    tdTitulo.textContent = libro.nombre;
    tdTipo.textContent = libro.tipo;
    tdAnio.textContent = libro.anio;
    btnEditar.innerHTML = "Editar";
    btnBorrar.innerHTML = "Borrar";

    btnEditar.addEventListener("click", () => mostrarFormulario(libro.id));
    btnBorrar.addEventListener("click", () => BorrarLibro(libro.id));

    tr.appendChild(tdTitulo);
    tr.appendChild(tdTipo);
    tr.appendChild(tdAnio);
    tr.appendChild(btnEditar);
    tr.appendChild(btnBorrar);
    
    body.appendChild(tr);
  }); 
}  


async function AgregarLibro(event) { 
  event.preventDefault();

  let nombre = document.getElementById('nombre').value;
  let tipo = document.getElementById('tipo').value;
  let anio = document.getElementById('anio').value;

  let libro = { nombre, tipo, anio };

  await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(libro)
  });

  CargarTabla();
}
async function BorrarLibro(id) {
  try {
    await fetch(`${url}/${id}`,{
    method: 'DELETE'
  });

 } 
catch (error) {
console.log(error);
}
CargarTabla();
}

async function mostrarFormulario(id){

  let response = await fetch(`${url}/${id}`);
  let libro = await response.json();

  document.getElementById("nuevo_titulo").value = libro.nombre;
  document.getElementById("nuevo_tipo").value = libro.tipo;
  document.getElementById("nuevo_anio").value = libro.anio;

  let formEditar = document.getElementById("form_editar");

  let siExisteBtn = formEditar.querySelector("button");
  if (siExisteBtn) {
    formEditar.removeChild(siExisteBtn);
  }

  let button = document.createElement("button");
  button.textContent = "Editar";
  button.className = "boton-enviar";

  button.addEventListener("click", (event) => {
    event.preventDefault(); 

    EditarLibro(libro.id);
  
  });

  formEditar.appendChild(button);

  document.querySelector(".contenedor-form-editar").classList.toggle("mostrar");

}
async function EditarLibro(id){

  let titulo = document.getElementById("nuevo_titulo").value;
  let tipo = document.getElementById("nuevo_tipo").value;
  let anio = document.getElementById("nuevo_anio").value;

  let libroActualizado = {
    "nombre": titulo,
    "tipo": tipo,
    "anio": anio
  };

  try {
    await fetch(`${url}/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libroActualizado)
  });

 } 
  catch (error) {
  console.error("Error",error);
  }
  document.querySelector(".contenedor-form-editar").classList.toggle("mostrar");
  CargarTabla();
}


window.onload = CargarTabla;