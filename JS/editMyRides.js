



const params = new URLSearchParams(window.location.search);
const rideId = params.get('id');

const rides = JSON.parse(localStorage.getItem('myRides')) || [];
const ride = rides.find(r => r.id === rideId);

console.log(ride);
