document.addEventListener('DOMContentLoaded', function () {
    // Ensure the DOM is fully loaded before attaching event listeners
    loadRides(); // Load users when the document is ready
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

function logout() { //borramos el sessionStorage 
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}

function loadRides() {
    const rides = JSON.parse(localStorage.getItem('myRides')) || [];
    const ridesList = document.getElementById('rides_list');
    ridesList.innerHTML = '';

    // usuario logueado
    const usuarioStr = sessionStorage.getItem("loggedUser");
    if (!usuarioStr) return; // nadie logueado
    const usuario = JSON.parse(usuarioStr);

    const botonRides = document.getElementById('btnRide');

    if (!usuario.driver) { //Esto es para ocultar el boton dado caso que el usuario logueado no sea conductor
        botonRides.style.display = 'none';
        return;
    }

    // filtrar rides del driver actual
    const myRides = rides.filter(r => r.idUser === usuario.id && r.estado === 'activo');

    myRides.forEach(ride => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${ride.departure}</td>
      <td>${ride.arrive}</td>
      <td>${ride.seats}</td>
      <td>${ride.car.make} ${ride.car.model} (${ride.car.year})</td>
      <td>${ride.fee}$</td>
      <td>
        <a class="edit" href="EditRide.html?id=${ride.id}">Edit</a> |
       <a href="#" onclick="borrarRide('${ride.id}')">Delete</a>
      </td>
    `;
        ridesList.appendChild(row);
    });

    
}

function borrarRide(rideId) {
    let rides = JSON.parse(localStorage.getItem('myRides')) || [];
    rides = rides.filter(r => r.id !== rideId);
    localStorage.setItem('myRides', JSON.stringify(rides));
    loadRides(); // recargar la lista de rides
}




 