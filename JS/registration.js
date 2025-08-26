document.addEventListener('DOMContentLoaded', function() {
  // Ensure the DOM is fully loaded before attaching event listeners
  document.getElementById('registration_form')
    .addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    storeInputs(); // Call the function to store inputs
  });
});

function storeInputs() {
    let name = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('confirmPassword').value;
    
    let cedula = document.getElementById('cedula').value.trim();
    let birthday = document.getElementById('fecha').value.trim();  
    let phone = document.getElementById('phone').value.trim();
    let biblio = "";
    let marca = "N/A";
    let modelo = "N/A";
    let year = "N/A";
    let placa = "N/A";
    let driver = false;

    // Expresiones regulares
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Solo letras y espacios
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de email
    const phoneRegex = /^[2-8]\d{7}$/; // Telefonos de 8 dígitos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validaciones antes de guardar
    if (!nameRegex.test(name)) {
        alert('First name must contain only letters.');
        return false;
    }
    if (!nameRegex.test(lastName)) {
        alert('Last name must contain only letters.');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Invalid email format.');
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert('Invalid phone number. Must be 8 digits.');
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.');
        return false;
    }
    if (password !== password2) {
        alert('Passwords do not match. Please try again.');
        return false;
    }
   

    // Si pasa todas las validaciones, guardar en localStorage
    const userData = {
        id: generateUUID(), 
        name,
        lastName,
        email,
        password,
        cedula,
        birthday,
        phone,
        biblio,
        marca,
        modelo,
        year,
        driver,
        placa,
    };


    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    
    setTimeout(() => {
        window.location.href = "index.html"; 
    }, 1000);

    return true;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
