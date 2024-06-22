'use strict'

let imagenes = ["6HJH6CTN", "EXXTENHK", "XYHNXCDR"];

let posicion = Math.floor(Math.random() *2);

let imagencaptcha = document.getElementById("captcha");
let captchasrc = imagencaptcha.src;
imagencaptcha.src = "images/captchas/"+ imagenes[posicion] +".jpg";

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", validar);

let mensaje= document.getElementById("mensaje-captcha");

function validar(e){
    e.preventDefault();
    let formData = new FormData(formulario);
    let valor = formData.get('valor-captcha');
    if(valor == imagenes[posicion]){
        mensaje.innerHTML = "El captcha es correcto*";
    }
    else{
       mensaje.innerHTML = "El captcha es incorrecto*";
    }
}