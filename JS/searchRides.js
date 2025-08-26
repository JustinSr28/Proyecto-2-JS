document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("findRidesBtn").addEventListener("click", function (event) {
        event.preventDefault(); // evita que el <a> recargue la página

        // capturar "from" y "to"
        const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;

        // capturar días seleccionados
        const days = Array.from(document.querySelectorAll('input[name="days"]:checked'))
            .map(day => day.value);

        filterRides(from, to, days);
    });
});

//Cambia de clase el menú desplegable para poder mostrarlo
function toggleMenu() {
    document.getElementById("userMenu").classList.toggle("show");
}

//Verifica que el click se dió fuera del menú desplegable para cerrarlo
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
 //borramos el registro de sessionStorage al cerrar sesion
function logout() {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}


function filterRides(from, to, days) {
    const rides = JSON.parse(localStorage.getItem("myRides")) || [];
    const ridesList = document.querySelector(".rides-table tbody");
    const usuarioStr = sessionStorage.getItem("loggedUser");
    ridesList.innerHTML = ""; // limpiar resultados previos

    const filtered = rides.filter(ride =>
        ride.idUser !== usuarioStr.id && // no mostrar viajes del usuario logueado
        ride.departure === from && //Coincidancia de origen
        ride.arrive === to && //Coincidencia de destino
        ride.estado === "activo" && // solo viajes activos
        ride.days.some(d => days.includes(d)) // intersección con los días seleccionados
    );

    filtered.forEach(ride => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="userInfo">
                    <img src="imagenes/usuario.png" alt="Foto perfil" class="perfil"> 
                    <span class="username">${ride.driverName || "Driver"}</span>
                </div>
            </td>
            <td>${ride.departure}</td>
            <td>${ride.arrive}</td>
            <td>${ride.seats}</td>
            <td>${ride.car.make} ${ride.car.model} (${ride.car.year})</td>
            <td>${ride.fee}$</td>
            <td><a href="rideDetails.html?id=${ride.id}">Details</a></td>
        `;
        ridesList.appendChild(row);
    });

    if (filtered.length === 0) {
        ridesList.innerHTML = `<tr><td colspan="7">No rides found.</td></tr>`;
    }
}
