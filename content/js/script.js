document.addEventListener("DOMContentLoaded", function() {
    var mapData = JSON.parse(document.getElementById("map-data").innerText);

    var map = L.map(
      'map',
      {scrollWheelZoom: false}
    ).setView(mapData.init, mapData.initZoom);

    map.on('focus', function() { console.log("focus"); map.scrollWheelZoom.enable(); });
    map.on('blur', function() { console.log("blur"); map.scrollWheelZoom.disable(); });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 15,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapData.token
    }).addTo(map);
      L.circle(mapData.center, mapData.radius).addTo(map);
});
