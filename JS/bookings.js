document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const rideId = params.get("id");

    if (rideId) {
        solicitarRide(rideId);
    } else { console.log("NO id") }

    renderTablaBookings(); 
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


function solicitarRide(rideId) {
    let solicitudes = JSON.parse(localStorage.getItem("ridesSolicitados")) || [];
    const userId = JSON.parse(sessionStorage.getItem("loggedUser")).id;

   
    let rides = JSON.parse(localStorage.getItem("myRides")) || [];

    let ride = rides.find(r => r.id === rideId);

  

    // Verifica si ya existe una solicitud del mismo usuario para este ride
    let existente = solicitudes.find(s => s.idUser === userId && s.rideId === rideId);

    if (!existente) {
        const rideSolicitado = {
            id: generateUUID(), 
            idUser: userId,
            estado: "pendiente",
            rideId,
            DriverId: ride.idUser, 
            userName: JSON.parse(sessionStorage.getItem("loggedUser")).name,
        };
        solicitudes.push(rideSolicitado);
        localStorage.setItem("ridesSolicitados", JSON.stringify(solicitudes));
    }
}

function renderTablaBookings() {
    const usuarioStr = sessionStorage.getItem("loggedUser");
    if (!usuarioStr) return;
    const usuario = JSON.parse(usuarioStr);

    const rides = JSON.parse(localStorage.getItem("myRides")) || [];
    const solicitudes = JSON.parse(localStorage.getItem("ridesSolicitados")) || [];
    const table = document.getElementById("tableBookings");
    table.innerHTML = `
        <thead>
            <tr>
                <th>User</th>
                <th>Ride</th>
                <th>Acciones</th>
            </tr>
        </thead>
    `; // reset table
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    if (usuario.driver) {
        // DRIVER 
        const misSolicitudes = solicitudes.filter(s => s.DriverId === usuario.id && s.estado === "pendiente");

        misSolicitudes.forEach(s => {
            const ride = rides.find(r => r.id === s.rideId);
            if (!ride) return;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${s.userName || s.idUser}</td>
                <td>${ride.departure} → ${ride.arrive}</td>
                <td>
                    <button onclick="aceptarSolicitud('${s.id}')">Aceptar</button>
                    <button onclick="rechazarSolicitud('${s.id}')">Rechazar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

    } else {
        // RIDER 
        const misSolicitudes = solicitudes.filter(s => s.idUser === usuario.id);

        misSolicitudes.forEach(s => {
            const ride = rides.find(r => r.id === s.rideId);
            if (!ride) return;

            let acciones = "";
            if (s.estado === "pendiente") {
                acciones = `<button onclick="cancelarSolicitud('${s.id}')">Cancelar</button>`;
            } else if (s.estado === "aceptado") {
                acciones = `<span style="color: green; font-weight: bold;">Aceptado</span>`;
            } else if (s.estado === "rechazado") {
                acciones = `<span style="color: red; font-weight: bold;">Rechazado</span>`;
            }

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${ride.driverName || "Driver"}</td>
                <td>${ride.departure} → ${ride.arrive}</td>
                <td>${acciones}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// DRIVER: aceptar/rechazar
function aceptarSolicitud(idSolicitud) {
    let solicitudes = JSON.parse(localStorage.getItem("ridesSolicitados")) || [];
    let solicitud = solicitudes.find(s => s.id === idSolicitud);
    if (solicitud) solicitud.estado = "aceptado";
    localStorage.setItem("ridesSolicitados", JSON.stringify(solicitudes));
    location.reload();
}

function rechazarSolicitud(idSolicitud) {
    let solicitudes = JSON.parse(localStorage.getItem("ridesSolicitados")) || [];
    let solicitud = solicitudes.find(s => s.id === idSolicitud);
    if (solicitud) solicitud.estado = "rechazado";
    localStorage.setItem("ridesSolicitados", JSON.stringify(solicitudes));
    location.reload();
}

// RIDER: cancelar
function cancelarSolicitud(idSolicitud) {
    let solicitudes = JSON.parse(localStorage.getItem("ridesSolicitados")) || [];
    solicitudes = solicitudes.filter(s => s.id !== idSolicitud);
    localStorage.setItem("ridesSolicitados", JSON.stringify(solicitudes));
    renderTablaBookings();
}



