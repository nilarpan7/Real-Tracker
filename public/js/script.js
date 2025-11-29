const socket = io();



if(navigator.geolocation){
    navigator.geolocation.watchPosition((position) => {
        const {latitude, longitude} = position.coords;
        socket.emit('Send-location', {latitude, longitude});
    },
    (error) => {
        console.error('Error obtaining location', error);
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    }
    );
}

const map = L.map('map').setView([0, 0], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "Nilarpan Tech"
}).addTo(map);

const marker = {};

socket.on('Receive-location', (data) => {
    const {id, latitude, longitude} = data;
    if(marker[id]){
        marker[id].setLatLng([latitude, longitude]);
    } else {
        marker[id] = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`User: ${id}`).openPopup();
        // Only center map on first marker or when it's your own location
        if(Object.keys(marker).length === 1){
            map.setView([latitude, longitude], 13);
        }
    }
});


socket.on('User-disconnected', (data) => {
    const {id} = data;
    if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id];
    }
});
