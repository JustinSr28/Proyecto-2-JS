document.addEventListener('DOMContentLoaded', function () {
    // Ensure the DOM is fully loaded before attaching event listeners
    loadInfoUser(); // Load users when the document is ready
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


function loadInfoUser() {

    // usuario logueado
    const usuarioStr = sessionStorage.getItem("loggedUser");
    if (!usuarioStr) return; // nadie logueado
    const usuario = JSON.parse(usuarioStr);

    const idUsuario = usuario.id;

    // 1. Rellenar los campos
    document.getElementById('inputName').value = usuario.name;
    document.getElementById('InputLastName').value = usuario.lastName;
    document.getElementById('Email').value = usuario.email;
    document.getElementById('InputPass').value = usuario.password;
    document.getElementById('InputRepPass').value = usuario.password;
    document.getElementById('cedula').value = usuario.cedula;
    document.getElementById('fecha').value = usuario.birthday;
    document.getElementById('phone').value = usuario.phone;
    document.getElementById('marca').value = usuario.marca;
    document.getElementById('model').value = usuario.modelo;
    document.getElementById('year').value = usuario.year;
    document.getElementById('placa').value = usuario.placa;

    // 2. Guardar cambios
    document.getElementById('editFormUser').addEventListener('submit', (e) => {
        e.preventDefault();
        // Actualizar los campos del usuario
        usuario.name = document.getElementById('inputName').value;
        usuario.lastName = document.getElementById('InputLastName').value;
        usuario.email = document.getElementById('Email').value;
        usuario.password = document.getElementById('InputPass').value;
        usuario.cedula = document.getElementById('cedula').value;
        usuario.birthday = document.getElementById('fecha').value;
        usuario.phone = document.getElementById('phone').value;
        usuario.marca = document.getElementById('marca').value;
        usuario.modelo = document.getElementById('model').value;
        usuario.year = document.getElementById('year').value;
        usuario.placa = document.getElementById('placa').value;
        // Actualizar en sessionStorage
        sessionStorage.setItem("loggedUser", JSON.stringify(usuario));
        // Redireccionar a la página de perfil
        window.location.href = "profile.html";
    });

}
