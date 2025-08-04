document.addEventListener('DOMContentLoaded', function () {
    // Ensure the DOM is fully loaded before attaching event listeners
    loadUsers(); // Load users when the document is ready
});

function loadUsers() {
    const rides = JSON.parse(localStorage.getItem('myRides')) || [];
    const ridesList = document.getElementById('rides_list');
    ridesList.innerHTML = ''; // Clear existing entries

    rides.forEach((ride, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${ride.departure}</td>
    <td>${ride.arrive}</td>
    <td>${ride.seats}</td>
            <td>${ride.car.make} ${ride.car.model} (${ride.car.year})</td>
            <td>${ride.fee}$</td>
          
            <td>
                <a class="edit" href="EditRide.html?id=${ride.id}">Edit</a> |
                <a class="delete" href="DeleteRide.html?id=${ride.id}">Delete</a>
            </td>
    `;
        ridesList.appendChild(row);
    });

    // Attach event listeners for edit and delete buttons
    // document.querySelectorAll('.edit').forEach(button => {
    //   button.addEventListener('click', editUser);
    // });

    // document.querySelectorAll('.delete').forEach(button => {
    //   button.addEventListener('click', deleteUser);
    // });
}