import { clientServices } from "../service/client-service.js";

console.log(clientServices);

const crearNuevaLinea = (nombre, email, id) => { // le pasamos los parametros de nombre e email y luego le adicionamos el id
    const lineaTabla = document.createElement("tr"); // genera la linea de la tabla
    const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td> 
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
        </li>
      </ul>
    </td>`;
  lineaTabla.innerHTML = contenido; // Muestra la nueva información en cada linea de la tabla.
  const btn =lineaTabla.querySelector("button"); // accedemos al boton y lo ponemos en una const
  btn.addEventListener("click", () => {
    const id = btn.id; // asi relacionamos el boton con el listener, importate poner el id en el html
    clientServices.eliminarCliente(id).then((respuesta) => { // le mando el id 
      console.log(respuesta); 
    }).catch((err) => alert ("Ocurrio un error"));
  });
  return lineaTabla;
};
const table = document.querySelector("[data-table]");

clientServices
  .listaClientes()
  .then((data) => { //Llamamos la funcion y que entonces haga la iteracion de perfiles
    data.forEach(({nombre, email, id})=> {// le podemos pasar el perfil, o le podemos pasar direct/ los paremetros en corchetes {}
      const nuevaLinea = crearNuevaLinea(nombre, email, id); // le pasamos los parametros
      table.appendChild(nuevaLinea);
    });
})
.catch((error) => alert("Ocurrio un error"));//Atrapa el error
