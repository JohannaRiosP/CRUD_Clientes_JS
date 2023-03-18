import { clientServices } from "../service/client-service.js";

const obtenerInformacion = async ()=>{
    const url = new URL(window.location); // Creamos objeto de URL q nos trae diferentes datos, nos interesa searchParams
    const id = url.searchParams.get("id"); // llamamos el searchParams y traemos el get

    if (id === null){ // cuando editamos se actualiza la url con la nueva info y nos trae erro pues se pierde el id, pues lo crea nuevamente
        window.location.href = "/screens/error.html"
    }

    const nombre = document.querySelector("[data-nombre]"); // Lo relacionamos con las casillas donde queremos que se muestre la info
    const email = document.querySelector("[data-email]");

    try {
        const perfil = await clientServices.detalleCliente(id) // con el await ya no necesitamos el then, 
        if(perfil.nombre && perfil.email){
            nombre.value = perfil.nombre; // llevamos la info a cada casilla
            email.value = perfil.email;
        }else {
            throw new Error
        }
        
    } catch (error) {
        //console.log("catch Error --", error);
        //alert("Hubo un error");
        window.location.href = "/screens/error.html";
    } 
};

obtenerInformacion();

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) =>{ // recibe la accion de submit y una funcion que se ejecutara cuando le den click en submit
    evento.preventDefault();
    const url = new URL(window.location); // Creamos objeto de URL q nos trae diferentes datos, nos interesa searchParams
    const id = url.searchParams.get("id"); 
    const nombre = document.querySelector("[data-nombre]").value // acedemos a la información
    const email = document.querySelector("[data-email]").value
    clientServices.actualizarCliente(nombre,email, id).then(()=>{ // llamamos la funcion que actualliza la info y nos trae la nueva vista de html.
        window.location.href = "/screens/edicion_concluida.html";
    });
});
