document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.rides-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se recargue la página
        storeRide();
    });
});

function storeRide() {
  
    const departure = document.getElementById('departure').value.trim();
    const arrive = document.getElementById('arrive').value.trim();
    const days = Array.from(document.querySelectorAll('input[name="days"]:checked')) //Array para guardar Los dias marcados
        .map(day => day.value);
    const time = document.getElementById('time').value;
    const seats = document.getElementById('seatsInput').value;

    const fee = document.getElementById('fee').value;

    //datos del carro
    const marca = document.getElementById('marca').value;
    const model = document.getElementById('model').value.trim();
    const year = document.getElementById('year').value;


  
    const rideData = {
        id: crypto.randomUUID(), // ID único interno
        departure,
        arrive,
        days,   // array con los días
        time,
        seats,
        fee,
        car: {
            make: marca,
            model,
            year
        }
    };

    // Guardar en localStorage
    let rides = JSON.parse(localStorage.getItem('myRides')) || [];
    rides.push(rideData);
    localStorage.setItem('myRides', JSON.stringify(rides));

    alert('Ride saved successfully!');

    // Redirigir después de 1 segundo
    setTimeout(() => {
        window.location.href = "myRides.html";
    }, 1000);

    return true;
}
