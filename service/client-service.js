/*
const http = new XMLHttpRequest();

//http.funcion(metodo, url)
http.open("GET", "http://localhost:3000/perfil");

http.send();

http.onload = () => {
    const data = JSON.parse(http.response);
    console.log(data)
    data.forEach(perfil => {
        const nuevaLinea = crearNuevaLinea(perfil.nombre, perfil.email);
        table.appendChild(nuevaLinea);
    });
};

console.log(http);

*/ 

//Se pasa a una funcion con promesa

/*const listaClientes = () =>{
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open("GET", "http://localhost:3000/perfil");

        http.send();

        http.onload = () => {
            const response = JSON.parse(http.response); // data cambia a response
            console.log(response)
            if(http.DONE.status >=400){
                reject(response);
            }else{
                resolve(response)
            }
    };
    })
    return promise;
};
*/
const listaClientes = () => 
    fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());
//De la anterior promesa pasamos a un solo reglon sin algunas llaves
//hacemos conexion y entonces recibimos respuesta y luego la pasamos a formato js

const crearCliente = (nombre, email)=>{
    return fetch("http://localhost:3000/perfil", { // ecibe la url y un segundo parametro que es el objeto con el metodo, los encabezados que le dice el tipo de archivo que recibira,  el content-type y el body
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({nombre,email, id:uuid.v4()}) // Es todo la info que queremos que se muestre
    });
}

const eliminarCliente = (id) =>{
    return fetch(`http://localhost:3000/perfil/${id}`,{ // Debemos agregarle el id con signo pesos y corchetes todo dentro de backsticks
        method : "DELETE" // el segundo parametro solo es el metodo
    });
}

const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`).then ((respuesta) => respuesta.json()); // nos conectamos con el id, recibimos la respuesta y lo pasamos a objeto json
};

const actualizarCliente = (nombre, email, id) =>{
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({nombre, email}),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(error));
   
};

export const clientServices = { //creamos objeto
    listaClientes, // Solo con llamarlo una vez es como si pusieramos que la llave es lista clientes : y el valor es la funcion anterior de listaClientes
    crearCliente,
    eliminarCliente,
    detalleCliente,
    actualizarCliente,

};

