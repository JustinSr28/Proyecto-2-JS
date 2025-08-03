document.addEventListener('DOMContentLoaded', function() {
  // Ensure the DOM is fully loaded before attaching event listeners
  document.getElementById('registration_form')
    .addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    storeInputs(); // Call the function to store inputs
  });
});

function storeInputs() {
    const name = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value.trim();
    const city = document.getElementById('city').value.trim();
    const phone = document.getElementById('phone').value.trim();

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
    if (!country) {
        alert('Please select a country.');
        return false;
    }

    // Si pasa todas las validaciones, guardar en localStorage
    const userData = {
        name,
        lastName,
        email,
        password,
        address,
        country,
        state,
        city,
        phone
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
