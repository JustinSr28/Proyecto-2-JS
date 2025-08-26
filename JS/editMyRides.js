document.addEventListener('DOMContentLoaded', function () {
    // Ensure the DOM is fully loaded before attaching event listeners
    loadRidesEdit(); // Load users when the document is ready
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
//Elimina el registro loggedUser al cerrar sesion
function logout() {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}


function loadRidesEdit() {
    const params = new URLSearchParams(window.location.search);
    const rideId = params.get('id'); //traemos el id pasada por URL


    let rides = JSON.parse(localStorage.getItem('myRides')) || []; //cargamos los rides
    let ride = rides.find(r => r.id === rideId); //buscamos el ride con el id pasado por URL



    // Rellenamos los campos con la info del ride
    document.getElementById('departure').value = ride.departure;
    document.getElementById('arrive').value = ride.arrive;
    document.getElementById('seats').value = ride.seats;
    document.getElementById('make').value = ride.car.make;
    document.getElementById('model').value = ride.car.model;
    document.getElementById('year').value = ride.car.year;
    document.getElementById('fee').value = ride.fee;
   

    //Guardar cambios del ride
    document.getElementById('editRideForm').addEventListener('submit', (e) => {
        e.preventDefault();

        ride.departure = document.getElementById('departure').value;
        ride.arrive = document.getElementById('arrive').value;
        ride.seats = document.getElementById('seats').value;
        ride.car.make = document.getElementById('make').value;
        ride.car.model = document.getElementById('model').value;
        ride.car.year = document.getElementById('year').value;
        ride.fee = document.getElementById('fee').value;
        ride.days = Array.from(document.querySelectorAll('input[name="days"]:checked')) //Array para guardar Los dias marcados
            .map(day => day.value); //Array de dias

        // Actualizar en localStorage
        localStorage.setItem('myRides', JSON.stringify(rides));

        // Redireccionar a la página de mis rides
        window.location.href = "myRides.html";
    });

}



