document.addEventListener('DOMContentLoaded', function () {
    // 1. Llamar a llenarDatos apenas cargue el DOM
    llenarDatos();


    // 2. Agregar listener al formulario
    document.querySelector('.rides-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se recargue la página
        storeRide();
    });



    function llenarDatos() {

        // Obtener el valor del sessionStorage
        let usuarioStr = sessionStorage.getItem("loggedUser");

        // Convertir de string JSON a objeto
        let usuario = JSON.parse(usuarioStr);

        document.getElementById('marca').value = usuario.marca;
        document.getElementById('model').value = usuario.modelo;
        document.getElementById('year').value = usuario.year;


    };

    function storeRide() {

        const departure = document.getElementById('departure').value.trim();
        const arrive = document.getElementById('arrive').value.trim();
        const days = Array.from(document.querySelectorAll('input[name="days"]:checked')) //Array para guardar Los dias marcados
            .map(day => day.value);
        const time = document.getElementById('time').value;
        const seats = document.getElementById('seatsInput').value;

        const fee = document.getElementById('fee').value;

        //datos del carro
        const marca = document.getElementById('marca').value;
        const model = document.getElementById('model').value.trim();
        const year = document.getElementById('year').value;



        const rideData = {
            id: generateUUID(), // ID único interno
            idUser: JSON.parse(sessionStorage.getItem("loggedUser")).id, 
            driverName: JSON.parse(sessionStorage.getItem("loggedUser")).name, // Nombre del conductor
            estado: "activo", // Estado del viaje
            departure,
            arrive,
            days,   // array con los días
            time,
            seats,
            fee,
            car: {
                make: marca,
                model,
                year
            }
        };

        // Guardar en localStorage
        let rides = JSON.parse(localStorage.getItem('myRides')) || [];
        rides.push(rideData);
        localStorage.setItem('myRides', JSON.stringify(rides));

        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = "myRides.html";
        }, 1000);

        return true;
    }
}); 


function toggleMenu() {
    document.getElementById("userMenu").classList.toggle("show");
}


window.onclick = function (event) {
    if (!event.target.matches('.dropdown img')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function logout() {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}