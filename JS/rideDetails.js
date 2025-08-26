document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const rideId = params.get("id");

    if (rideId) {
        cargarDatos(rideId); // <-- solo si se venía desde un "Book"
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const requestBtn = document.getElementById("requestBtn");

    requestBtn.addEventListener("click", function () { //Si se da click en el boton de request
        const params = new URLSearchParams(window.location.search);
        const rideId = params.get("id");

        if (rideId) {

            window.location.href = `bookings.html?id=${rideId}`; //Pasamos id a bookings
        }
    });

});

function cargarDatos(rideId) { //carga todos los datos del ride seleccionado
   

    let rides = JSON.parse(localStorage.getItem("myRides")) || [];
    let ride = rides.find(r => r.id === rideId);

    if (ride) {

        document.getElementById("nombreUsuario").innerText = ride.driverName;
        document.getElementById("departure").innerText = ride.departure;
        document.getElementById("arrive").innerText = ride.arrive;
        document.getElementById("time").value = ride.time;
        document.getElementById("seats").value = ride.seats;
        document.getElementById("fee").value = ride.fee;


        const checkboxes = document.querySelectorAll('input[name="days"]'); //cargamos los dias que habian en el arrayDias
        checkboxes.forEach(chk => {
           
            chk.checked = ride.days.includes(chk.value);
        });

        document.getElementById("marca").value = ride.car.make;
        document.getElementById("model").value = ride.car.model;
        document.getElementById("year").value = ride.car.year;
    }
}



//Cambiamos la clase del menu desplegable, para que se muestre
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