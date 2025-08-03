document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío automático del form
        loginUser();
    });
});

function loginUser() {
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar usuario por email o nombre
    const foundUser = users.find(user =>
        (user.email.toLowerCase() === usernameInput.toLowerCase() ||
            user.name.toLowerCase() === usernameInput.toLowerCase()) &&
        user.password === passwordInput
    );

    if (foundUser) {
        alert(`Welcome ${foundUser.name}!`);
        // Guardar usuario logueado en sessionStorage para poder usarlo como identificador
        sessionStorage.setItem('loggedUser', JSON.stringify(foundUser));
        // Redirige a página principal
        window.location.href = "myRides.html";
    } else {
        alert("Invalid username/email or password.");
    }
}
