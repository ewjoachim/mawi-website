document.addEventListener("DOMContentLoaded", function() {
    var mapData = JSON.parse(document.getElementById("map-data").innerText);

    var map = L.map('map').setView([46.120, 1.051], 10);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 10,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapData.token
    }).addTo(map);
      L.polygon([
      [46.227, 0.920],
      [46.054, 1.336],
      [46.045, 0.843]
    ]).addTo(map);
});
