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
    if (!usuarioStr) return; // nadie logueado, para pruebas
    const usuario = JSON.parse(usuarioStr);

    const idUsuario = usuario.id;

    //Rellenamos los campos
    document.getElementById('name').value = usuario.name;
    document.getElementById('bio').value = usuario.biblio;

    //Guardamos cambios
    document.getElementById('formConfig').addEventListener('submit', (e) => {
        e.preventDefault();

        // Actualizar los campos del usuario
        usuario.name = document.getElementById('name').value;
        usuario.biblio = document.getElementById('bio').value;

        // Actualizamos en sessionStorage 
        sessionStorage.setItem("loggedUser", JSON.stringify(usuario));

        //Actualizamos el localStorage
        let usuarios = JSON.parse(localStorage.getItem("users")) || [];
        const index = usuarios.findIndex(u => u.id === idUsuario);
        if (index !== -1) {
            usuarios[index] = usuario; //sustituir con datos nuevos
            localStorage.setItem("users", JSON.stringify(usuarios));
        }

        
        window.location.href = "configuration.html";
    });
}
