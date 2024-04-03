/*entonce solo voy a hacer analisis de este, pq para q al otro sabiendo q luche por intentar hacerlo un poco funcional*/

document.addEventListener("DOMContentLoaded", ()=>{ // cuando el documento cargue por completo

    const btnagregar = document.querySelector("#btnAdd") //designar las variables d elos botones
    btnagregar.addEventListener("click", agregar) //cuando suceda el evento "click" aplicar la funcion

    const btncancelar = document.querySelector('#btncancel') //asi mismo como en el anterior
    btncancelar.addEventListener('click', cancelar)

})

/*
let subtotal = 0
*/

function agregar(){ // jeje pues creamos las funciones con los mismos nombres

    const desc1 = document.querySelector("#description") //designar las variables de cada uno de los elementos - descripcion
    const cant1 = document.querySelector("#quantity")// cantidad
    const prec1 = document.querySelector("#price")//precio
    
    if(desc1.length < 1 || cant1.value < 1 || isNaN(cant1.value) || prec1.value < 1 || isNaN(cant1.value) ){
        return alert("Debes escribir todos los datos") 

//si la longitud de la descripcion es menor a 1 o el valor de cantidad es menor a 1 o no es un numero 
//o el valor del precio es menor a 1 o no es un numero entonces mostramos alerta y retornamos

}

    let tr = document.createElement("tr")// creamos la fila

    let td = document.createElement("td")//primer columna
    td.textContent = cant1.value//asignamos el valor
    tr.appendChild(td)//agregamos la columna a la fila

    td = document.createElement("td") //reseteamos el valor para crear la segunda columna
    td.textContent = desc1.value
    tr.appendChild(td)

    td = document.createElement("td")
    td.textContent = Number(prec1.value).toFixed(2)
    tr.appendChild(td)

    /*
    Number = Un objeto que representa un número de cualquier tipo.

    toFixed() = Método que formatea un número con un número específico de decimales.
    Devuelve una cadena que representa un número en notación de punto fijo.
    */

    let importe = Number(prec1.value) * Number(cant1.value) // calcular importe por medio de una constante

    td = document.createElement("td") //vendria siendo la 4 columna
    td.textContent = importe.toFixed(2)
    td.style.textAlign = "right" //lo alineamos a la derecha
    tr.appendChild(td)


    td = document.createElement("td")
    let btnEliminar = document.createElement("button") //creamos el boton para eliminar
    btnEliminar.textContent = "Eliminar" //contenido
    btnEliminar.classList = "btn btn-danger btn-sm" //clasesita
    btnEliminar.onclick = ()=> eliminar(tr)

    /*
    Agregamos un evento onclick al boton eliminar 
    para que cuando se haga click llame a la función eliminar pasandole como parametro la fila
    */

    td.appendChild(btnEliminar) //agregamos a la fila el boton eliminar
    tr.appendChild(td) //agregamos la ultima columna con el boton a la fila
        


    const detalle = document.querySelector("#detalle")
    detalle.appendChild(tr)


    totales()

/*
    subtotal = parseFloat(subtotal) + Number(prec1.value) * Number(cant1.value)
    console.log(subtotal)

*/

    limpiar()

}


function totales(){

    const detalle = document.querySelector("#detalle") // seleccionar el elemento detalle
    const filas = detalle.querySelectorAll("tr") //selecciona todas las tr dentro de detalle
    //q vendrian siendo subtotal - iva - total

    let subtotal = 0 // valor inicial

    filas.forEach((fila)=>{ 
        // recorremos cada fila - asignamos el valor fila a la variable a la cual le estamos dando la vuelta

        let columnas = fila.querySelectorAll("td")
        //precisamente habiendo seleccionado la fila, seleccionamos dentro de ella las columnas

        subtotal += Number(columnas[3].textContent) 
        //a medida de que va pasando va agarrando el valor de la columna 3 (importe) y lo va sumando al subtotal

    })

    let iva = subtotal * 0.16 //ya tneiendo el valor de subtotal debemos multiplicarlo por el 16% de iva
    let total = subtotal + iva //luego sumar este valor con el subtotal para el agregado total 


    document.querySelector("#subtotal").textContent = subtotal.toFixed(2)
    document.querySelector("#iva").textContent = iva.toFixed(2)
    document.querySelector("#total").textContent = total.toFixed(2)
   
    //como ya mencionamos el toFixed es para la cantidad de decimales
}

function limpiar(){ 

/* esta fuancion va a limpiar los espacios en los que escribimos las variables ya usadas 
y como no queremos que estorben despues de usadas, recalcando que si necesitamos cantidad podemos ponerla en su respectiva 
casilla, cambia su valor por uno nulo y hace focus en la casilla descripcion para volver a escribir otro producto si asi lo necesitamos
*/

    document.querySelector("#description").value = null
    document.querySelector("#quantity").value = null
    document.querySelector("#price").value = null
    document.querySelector("#description").focus()
}

//para q el boton funcione
function eliminar(tr){ // teniendo como parametro la fila
    const response = confirm("¿Desea eliminar el producto de su lista?") //verificamos
    if(response){
    tr.remove() //removemos la fila
    totales() //volver a hacer el calculo de totales
}}


//cancelar toda la factura
function cancelar(){//ya habiendo creado el boton, q llama esta funcion
    const response = confirm("¿Desea cancelar la operación?")//verificamos
    if(response){
        location.reload()//reseteamos la pagina
    }
}