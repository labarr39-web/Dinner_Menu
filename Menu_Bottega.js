/*
Cree un menú Diner en JAVASCRIPT.
Aquí están sus instrucciones para construir ese restaurante.
Restaurante Bottega
Tener el menú principal y un menú lateral
Obtienes un plato principal y dos opciones secundarias a un costo
regular.
- muéstrales el menú completo (imprimir)
- Un usuario selecciona una entrada.
- Waitress hace un comentario basado en su selección“”
- el comentario puede ser una comparación de los dos elementos o un
comentario aleatorio extraído de una bóveda de comentarios.
- Diles el precio
- repita las opciones anteriores para opciones secundarias (comentario
y precio)
- suma el costo
BONIFICACIÓN
Disfrute del menú de desayuno, almuerzo y cena. El desayuno tiene
diferentes artículos, el almuerzo y la cena tienen los mismos artículos
pero tienen precios diferentes.
BONIFICACIÓN: Permitir la personalización de artículos (cómo se
preparan los artículos, decidir las implicaciones de costos adicionales)
Video explicativo:
https://youtu.be/j6O3f9WD_qQ


*/

// Función para convertir la hora en minutos y validar el formato

/*
Explicación de la validación
regex es una expresión regular que verifica:

([01]\d|2[0-3]): La parte de las horas puede ser de 00 a 19 ([01]\d) o de 20 a 23 (2[0-3]).
: separador literal.
([0-5]\d): Los minutos pueden ser de 00 a 59.
regex.test(hora) devuelve true si el string cumple el formato, false si no.

Si no pasa la validación, se lanza un error con un mensaje claro.
*/

// Definición de los horarios de desayuno, almuerzo y cena //


const horarioDesayuno = {
    inicio: "07:00",
    fin: "11:00"
};

const horarioAlmuerzo = {
    inicio: "12:00",
    fin: "15:30"
};
    
const horarioCena = {
    inicio: "20:00",
    fin: "23:30"
};

const comentarios = [
    "¡Excelente elección! Este plato es uno de nuestros favoritos.",
    "¡Buena elección! Este plato es muy popular entre nuestros clientes.",
    "¡Perfecto! Este plato es una excelente opción.",
    "¡Interesante elección! Este plato tiene un sabor único.",
    "¡Delicioso! Este plato es una de nuestras especialidades.",
    "¡Sabroso! Este plato es muy recomendado por nuestro chef.",
    "¡Fantástico! Este plato es una excelente combinación de sabores.",
    "¡Maravilloso! Este plato es una opción saludable y deliciosa.",
    "¡Increíble! Este plato es una experiencia culinaria única.",
    "¡Exquisito! Este plato es una obra maestra de la cocina."
];

const menuDesayuno = [
    { nombre: "Croissant", tipo: "principal", precio: 2.75 },
    { nombre: "Huevos Revueltos", tipo: "principal", precio: 3.50 },
    { nombre: "Tortitas con Miel", tipo: "principal", precio: 4.00 },
    { nombre: "Café", tipo: "segundo", precio: 1.75 },
    { nombre: "Infusión", tipo: "segundo", precio: 1.65 },
    { nombre: "Cacao", tipo: "segundo", precio: 1.85 },
    { nombre: "Zumo de Naranja", tipo: "postre", precio: 2.50 },
    { nombre: "Yogurt con Frutas", tipo: "postre", precio: 2.75 },
    { nombre: "Fruta Fresca", tipo: "postre", precio: 2.50},
    { nombre: "Tostada con Tomate, aceite y jamón ibérico", tipo: "extra", precio: 4.50 },
    { nombre: "Tostada con Aguacate", tipo: "extra", precio: 2.00 },
    { nombre: "Tostada con Jamón y Queso", tipo: "extra", precio: 1.50 },
    { nombre: "Tostada con Salmón Ahumado", tipo: "extra", precio: 2.50 }
];

const menuAlmuerzoCena = [
    { nombre: "Ensalada César", tipo: "principal", precio: 5.50 },
    { nombre: "Patatas a la Riojana", tipo: "principal", precio: 6.00 },
    { nombre: "Lasagna", tipo: "principal", precio: 6.50 },
    { nombre: "Pollo asado", tipo: "segundo", precio: 8.50 },
    { nombre: "Carrilleras", tipo: "segundo", precio: 10.75 },
    { nombre: "Merluza rebozada", tipo: "segundo", precio: 9.50 },
    { nombre: "Helado variado", tipo: "postre", precio: 3.00 },
    { nombre: "Tarta de Manzana", tipo: "postre", precio: 3.50 },
    { nombre: "Fruta Fresca", tipo: "postre", precio: 2.50},
    { nombre: "Pan de Ajo", tipo: "extra", precio: 1.50 },
    { nombre: "Croquetas", tipo: "extra", precio: 5.25 },
    { nombre: "Nachos", tipo: "extra", precio: 4.50 }
];



let hora ='00:00'; // Inicialización de la variable hora con un valor por defecto
let horaCorrecta = false;
let turno = 0;
let horaActual = 0;
let inicioDesayuno = 0;
let finDesayuno = 0;
let inicioAlmuerzo = 0;
let finAlmuerzo = 0;
let inicioCena = 0;
let finCena = 0;

let platoPrincipal = '';
let platoSegundo = '';
let platoPostre = '';
let platoExtra = '';
const incrementoCena = 1.20; // Incremento del 20% para el menú de cena





//FUNCIONES//





const horaEnMinutos = (horaStr) => {
    // Expresión regular para validar formato HH:MM (24 horas) //
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!regex.test(horaStr)) {
      console.log("hora NO correcta\n" + "Formato de hora inválido. Debe ser HH:MM con 00 ≤ HH ≤ 23 y 00 ≤ MM ≤ 59");
        horaCorrecta = false;
      //throw new Error("Formato de hora inválido. Debe ser HH:MM con 00 ≤ HH ≤ 23 y 00 ≤ MM ≤ 59");}
    } else {
    const [horas, minutos] = horaStr.split(':').map(Number);
    horaCorrecta = true;
    return horas * 60 + minutos;
    }
}

const comprobarHorario = (hora, horario) => {
    const horaMinutos = horaEnMinutos(hora);
    const inicioMinutos = horaEnMinutos(horario.inicio);
    const finMinutos = horaEnMinutos(horario.fin);

    if (horaMinutos >= inicioMinutos && horaMinutos <= finMinutos) {
        return true;
    }else {
        return false;
    }
};


const pedirHora = () => {

do {
    try {
    hora = prompt("¿Qué hora es?");
    if (hora===null) {
        console.log("Entrada cancelada por el usuario.");
        horaCorrecta = false;
        break; // Salir del bucle si el usuario cancela la entrada
    }

    /* NOTA : prompt devuelve null si el usuario cancela la entrada 
    y por tanto no se puede convertir a minutos, lo que causaría un error.
    */
    horaEnMinutos(hora); // Validar la hora ingresada
    } catch (error) {   // --- Esto no sé si es necesario, ya que la función horaEnMinutos ya maneja la validación y establece horaCorrecta en false.
        console.log('pedirHora - Error: ' + error.message);
        horaCorrecta = false; // Mantener en false si la hora es incorrecta
    }
    } while (!horaCorrecta);
    return hora;
}


const elegirHorario = (turnoComida) => {

    try {
    if (horaActual < inicioDesayuno) {
        alert("El restaurante aún no está abierto. El horario de desayuno es de " + horarioDesayuno.inicio + " a " + horarioDesayuno.fin + ".");
        turnoComida = 0; // Antes del desayuno
    } else if (comprobarHorario(hora,horarioDesayuno)) {
        turnoComida = 1; // Durante el desayuno
        alert("Bienvenido, estamos en horario de desayuno. \nNuestro horario es de " + horarioDesayuno.inicio + " a " + horarioDesayuno.fin + ".");
    } else if (comprobarHorario(hora,horarioAlmuerzo)) {
            turnoComida = 2; // Durante el almuerzo
            alert("Bienvenido, estamos en horario de almuerzo. \nNuestro horario es de " + horarioAlmuerzo.inicio + " a " + horarioAlmuerzo.fin + ".");
    } else if (comprobarHorario(hora,horarioCena)) {
            turnoComida = 3; // Durante la cena
            alert("Bienvenido, estamos en horario de cena. \nNuestro horario es de " + horarioCena.inicio + " a " + horarioCena.fin + ".");
    } else if (horaActual > finCena) {
        alert("El restaurante está cerrado. El horario de cena es de " + horarioCena.inicio + " a " + horarioCena.fin + ".");
        turnoComida = 4; // Después de la cena
    } else {
        alert("Lo sentimos, estamos fuera de los horarios de servicio.\n\nEl horario de desayuno es de " + horarioDesayuno.inicio + " a " + horarioDesayuno.fin + ",\nel horario de almuerzo es de " + horarioAlmuerzo.inicio + " a " + horarioAlmuerzo.fin + ",\ny el horario de cena es de " + horarioCena.inicio + " a " + horarioCena.fin + ".");
        turnoComida = 5; // Entre el desayuno y el almuerzo o entre el almuerzo y la cena
    }
    }catch (e){
        console.log(e.message);
    }
    return turnoComida;
}



const comentarioAleatorio = (comentario) => {
    const indice = Math.floor(Math.random() * comentario.length);
    return comentario[indice];
}


const mostrarMenu = (turnoMenu, tipo) => {
        let menu= "";
        let platoSeleccionado = "";
        switch (turnoMenu) {
        case 1:
            menuDesayuno.forEach(item => {
                if (item.tipo === tipo) {
                    menu += "- " + item.nombre + " : $" + item.precio.toFixed(2) + "\n";
                }
            });
            platoSeleccionado = prompt("Menú de desayuno:\n\n" + tipo + ":\n" + menu);
            return platoSeleccionado;
            break;
        case 2:
            menuAlmuerzoCena.forEach(item => {
                if (item.tipo === tipo) {
                    menu += "- " + item.nombre + " : $" + item.precio.toFixed(2) + "\n";
                }
            });
            platoSeleccionado = prompt("Menú de almuerzo:\n\n" + tipo + ":\n" + menu);
            return platoSeleccionado;
            break;

        case 3:
            menuAlmuerzoCena.forEach(item => {
                if (item.tipo === tipo) {
                    menu += "- " + item.nombre + " : $" + (item.precio * incrementoCena).toFixed(2) + "\n";
                }
            });
            platoSeleccionado = prompt("Menú de cena:\n\n" + tipo + ":\n" + menu);
            return platoSeleccionado;
            break;
        default:
            alert("No hay menú disponible para el horario seleccionado.");
            return platoSeleccionado;
            break; // Esto no debería ocurrir, ya que la función elegirHorario debería manejar los casos fuera de horario    
    }
};



const comprobarPlato = (plato, turnoMenu, tipo) => {
    let menu = turnoMenu === 1 ? menuDesayuno : menuAlmuerzoCena;
    let platoEncontrado = menu.find(item => item.nombre.toLowerCase() === plato.toLowerCase() && item.tipo === tipo);
    return !!platoEncontrado; // Devuelve true si se encuentra el plato, false si no
}




function mostrarFactura(platoPrincipal, platoSegundo, platoPostre, platoExtra, turnoMenu, hora) {
    
    const menu = turnoMenu === 1 ? menuDesayuno : menuAlmuerzoCena;
    const platoPrincipalObj = menu.find(item => item.nombre.toLowerCase() === platoPrincipal.toLowerCase() && item.tipo === "principal");
    const platoSegundoObj = menu.find(item => item.nombre.toLowerCase() === platoSegundo.toLowerCase() && item.tipo === "segundo");
    const platoPostreObj = menu.find(item => item.nombre.toLowerCase() === platoPostre.toLowerCase() && item.tipo === "postre");
    const platoExtraObj = menu.find(item => item.nombre.toLowerCase() === platoExtra.toLowerCase() && item.tipo === "extra");
    
    let total = 0;
    let factura = "Factura:\n\n";
    let linea ="";
    let espacios = "   ";
    let fecha = new Date();
    factura += "Fecha: " + fecha.toLocaleDateString() + "\n";
    factura += "Hora: " + hora + "\n\n";
    if (turnoMenu === 3) { // Si es cena, aplicar incremento del 20%
        factura += "El menú de cena tiene un incremento del 20% \nrespecto al menú de almuerzo.\n\n";
    }
    
    linea = ("Plato principal: " + platoPrincipalObj.nombre + (turnoMenu === 3 ? (platoPrincipalObj.precio * incrementoCena).toFixed(2) : platoPrincipalObj.precio.toFixed(2)) + " €\n");
    factura += "Plato principal: " + platoPrincipalObj.nombre + espacios.padEnd(70-linea.length, "-") + espacios + (turnoMenu === 3 ? (platoPrincipalObj.precio * incrementoCena).toFixed(2) : platoPrincipalObj.precio.toFixed(2)) + " €\n";
    total += turnoMenu === 3 ? (platoPrincipalObj.precio * incrementoCena) : platoPrincipalObj.precio;
    
    linea = ("Segundo plato: " + platoSegundoObj.nombre + (turnoMenu === 3 ? (platoSegundoObj.precio * incrementoCena).toFixed(2) : platoSegundoObj.precio.toFixed(2)) + " €\n");
    factura += "Segundo plato: " + platoSegundoObj.nombre + espacios.padEnd(70-linea.length, "-") + espacios + (turnoMenu === 3 ? (platoSegundoObj.precio * incrementoCena).toFixed(2) : platoSegundoObj.precio.toFixed(2)) + " €\n";
    total += turnoMenu === 3 ? (platoSegundoObj.precio * incrementoCena) : platoSegundoObj.precio;
    
    linea = ("Postre: " + platoPostreObj.nombre + (turnoMenu === 3 ? (platoPostreObj.precio * incrementoCena).toFixed(2) : platoPostreObj.precio.toFixed(2)) + " €\n");
    factura += "Postre: " + platoPostreObj.nombre + espacios.padEnd(70-linea.length, "-") + espacios + (turnoMenu === 3 ? (platoPostreObj.precio * incrementoCena).toFixed(2) : platoPostreObj.precio.toFixed(2)) + " €\n";
    total += turnoMenu === 3 ? (platoPostreObj.precio * incrementoCena) : platoPostreObj.precio;
    
    if (platoExtra !== null && platoExtra.toLowerCase() !== "nada") {
        linea = ("Extras: " + platoExtraObj.nombre + (turnoMenu === 3 ? (platoExtraObj.precio * incrementoCena).toFixed(2) : platoExtraObj.precio.toFixed(2)) + " €\n");
        factura += "Extras: " + platoExtraObj.nombre + espacios.padEnd(70-linea.length, "-") + espacios + (turnoMenu === 3 ? (platoExtraObj.precio * incrementoCena).toFixed(2) : platoExtraObj.precio.toFixed(2)) + " €\n";
        total += turnoMenu === 3 ? (platoExtraObj.precio * incrementoCena) : platoExtraObj.precio;
    }
   
    linea = "Total: " + total.toFixed(2) + " €"
    factura += "\n" + linea.padStart(100-linea.length, ' ') + "\n";
    alert(factura);
}





//FIN FUNCIONES//




const miturno = elegirHorario(pedirHora());


horaActual = horaEnMinutos(hora);
inicioDesayuno = horaEnMinutos(horarioDesayuno.inicio);
finDesayuno = horaEnMinutos(horarioDesayuno.fin);
inicioAlmuerzo = horaEnMinutos(horarioAlmuerzo.inicio);
finAlmuerzo = horaEnMinutos(horarioAlmuerzo.fin);
inicioCena = horaEnMinutos(horarioCena.inicio);
finCena = horaEnMinutos(horarioCena.fin);


let todoCorrecto = false;
let extraSeleccionado = false;



// Bucle principal para la selección de platos //


do {
    if (miturno === 0 || miturno === 4 || miturno === 5) {
        console.log("No se puede realizar un pedido fuera del horario de servicio.");
        break;
    }
    for (let i = 1; i <= 4; i++) {
    
    switch (i) {
        case 1:

            platoPrincipal = mostrarMenu(miturno, "principal");  
            if (platoPrincipal === null) {
                alert("El usuario canceló la selección del plato principal.");
                todoCorrecto = false;
                i-=1; // Decrementar i para repetir la selección del plato principal
            break;
            }else if (!comprobarPlato(platoPrincipal, miturno, "principal")) {
                alert("El plato seleccionado no está disponible en el menú. Por favor, seleccione un plato válido.");
                todoCorrecto = false; 
                i-=1; 
            break;
            }
          
            console.log(comentarioAleatorio(comentarios));
            break;

        case 2:
            platoSegundo = mostrarMenu(miturno, "segundo");
            if (platoSegundo === null) {
                alert("El usuario canceló la selección del segundo plato.");
                todoCorrecto = false; 
                i-=1; 
            break;
            }else if (!comprobarPlato(platoSegundo, miturno, "segundo")) {
                alert("El plato seleccionado no está disponible en el menú. Por favor, seleccione un plato válido.");
                todoCorrecto = false; 
                i-=1; 
            break;
            }
            console.log(comentarioAleatorio(comentarios));
            break;

        case 3:
            platoPostre = mostrarMenu(miturno, "postre");

            if (platoPostre === null) {
                alert("El usuario canceló la selección del postre.");
                todoCorrecto = false; 
                i-=1;
            break;
            }else if (!comprobarPlato(platoPostre, miturno, "postre")) {
                alert("El plato seleccionado no está disponible en el menú. Por favor, seleccione un plato válido.");
                todoCorrecto = false; 
                i-=1; 
            break;
            }
            console.log(comentarioAleatorio(comentarios));
            break;

        case 4:
            alert("Ahora puede seleccionar un plato extra si lo desea. Si no desea ningún plato extra, puede escribir 'nada' o cancelar la selección.");
            platoExtra = mostrarMenu(miturno, "extra");

            if (platoExtra === null || platoExtra.toLowerCase() === "nada") {
                alert("No se seleccionó ningún plato extra.");
                todoCorrecto = true; // Marcar como correcto si el usuario cancela la selección del plato extra o escribe "nada"
                extraSeleccionado = false;
            break;
            }else if (!comprobarPlato(platoExtra, miturno, "extra")) {
                alert("El plato seleccionado no está disponible en el menú. Por favor, seleccione un plato válido.");
                todoCorrecto = false; 
                i-=1; 
            break;
            }
            if (!i === 4 || !extraSeleccionado) {
                console.log(comentarioAleatorio(comentarios));
            }
            break;

        /*    
        default:
            console.log("No hay menú disponible para el horario seleccionado.");
        */
    }
}
    todoCorrecto = true; // Marcar como correcto si todas las selecciones se realizaron sin cancelaciones

} while (!todoCorrecto)


mostrarFactura(platoPrincipal, platoSegundo, platoPostre, platoExtra, miturno, hora);










