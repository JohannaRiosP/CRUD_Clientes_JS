import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento)=>{ //recibe el evento submit y una funcion flecha que se dispara cuando le dan click en submit
    evento.preventDefault(); //Evita qye formulario funcione como deberia
    const nombre = document.querySelector("[data-nombre]").value; // Nos trae la info de cada data atribute
    const email = document.querySelector("[data-email]").value;
    clientServices.crearCliente(nombre, email)
        .then(() => { // quitamos respuesta pues no la utlizamos
            window.location.href = "/screens/registro_completado.html"; // asi redirigimos para el html de registro completado
        })
        .catch((err) => console.log(err));
});