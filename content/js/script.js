function drawMap() {
  var element = document.getElementById("map-data")
  if (!element) { return; }
  var mapData = JSON.parse(element.innerText);

  var map = L.map(
    'map',
    { scrollWheelZoom: false }
  ).setView(mapData.geojson.geometry.coordinates, mapData.initZoom);

  map.on('focus', function () { console.log("focus"); map.scrollWheelZoom.enable(); });
  map.on('blur', function () { console.log("blur"); map.scrollWheelZoom.disable(); });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapData.token
  }).addTo(map);

  L.geoJSON(mapData.geojson, {
    pointToLayer: function (feature, latlng) {
      return L.circle(latlng, { radius: feature.properties.radius });
    }
  }).addTo(map);
}

function setupMobileMenu() {
  var burger = document.getElementById("burger");
  if (!burger) { return; }
  var menu = document.querySelector(".menu");
  function toggleMobileMenu(open) {
    let lines = burger.querySelectorAll(".burger-line");
    if (open) {
      burger.dataset["open"] = "true";
      lines[0].classList.add("rotate-45");
      lines[0].classList.remove("-translate-y-1.5");
      lines[1].classList.add("opacity-0");
      lines[2].classList.add("-rotate-45");
      lines[2].classList.remove("translate-y-1.5");
      menu.classList.remove("hidden");
    } else {
      burger.dataset["open"] = "false";
      lines[0].classList.remove("rotate-45");
      lines[0].classList.add("-translate-y-1.5");
      lines[1].classList.remove("opacity-0");
      lines[2].classList.remove("-rotate-45");
      lines[2].classList.add("translate-y-1.5");
      menu.classList.add("hidden");
    }
  }
  toggleMobileMenu(false)
  burger.getElementsByTagName("button")[0].addEventListener(
    "click", () => {
      toggleMobileMenu(burger.dataset["open"] === "false");
    }
  );
  menu.querySelectorAll("a").forEach(element => {
    element.addEventListener("click", () => { toggleMobileMenu(false) });
  });
}

function setupScroll() {
  window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 100);
  });
}

function setupAntiSpam() {
  document.querySelectorAll('a[href="mailto:"]').forEach((element) => {

    var sourceElement = document.querySelector("body");
    var email = sourceElement.dataset.email + "@" + sourceElement.dataset.domain;
    element.href = "mailto:" + email;
    element.innerHTML = email;
  })
}

document.addEventListener("DOMContentLoaded", function () {
  drawMap();
  setupMobileMenu();
  setupScroll();
  setupAntiSpam();
});
