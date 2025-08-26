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
    window.location.href = "index.html"; // Redirigir al login
}

function loadInfoUser() {

    // usuario logueado
    const usuarioStr = sessionStorage.getItem("loggedUser");
    if (!usuarioStr) return; // nadie logueado
    const usuario = JSON.parse(usuarioStr);

    const idUsuario = usuario.id;

    // 1. Rellenar los campos
    document.getElementById('name').value = usuario.name;
    document.getElementById('bio').value = usuario.bio;
    
   

    // 2. Guardar cambios
    document.getElementById('formConfig').addEventListener('submit', (e) => {
        e.preventDefault();
        // Actualizar los campos del usuario
        usuario.name = document.getElementById('name').value;
        usuario.bio = document.getElementById('bio').value;
        // Actualizar en sessionStorage
        sessionStorage.setItem("loggedUser", JSON.stringify(usuario));
        // Redireccionar a la página de perfil
        window.location.href = "configuration.html";
    });
}