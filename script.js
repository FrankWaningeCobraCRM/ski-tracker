// ===========================
// MAP INITIALIZATION
// ===========================

var map = L.map('map').setView([47.2, 12.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


// ===========================
// DATA: ALL SKI REGIONS
// ===========================

var skiRegions = [
    {
        name: "Ski Arlberg",
        color: "#e91e63",
        area: [[47.25, 10.00], [47.25, 10.40], [47.05, 10.40], [47.05, 10.00]],
        info: "Grootste skigebied van Oostenrijk (300+ km piste)"
    },
    {
        name: "Zillertal",
        color: "#9c27b0",
        area: [[47.25, 11.70], [47.25, 12.10], [47.00, 12.10], [47.00, 11.70]],
        info: "Vier grote skigebieden in één dal"
    },
    {
        name: "Ötztal",
        color: "#ff9800",
        area: [[47.10, 10.70], [47.10, 11.15], [46.80, 11.15], [46.80, 10.70]],
        info: "Hoogste skigebieden van Oostenrijk met gletsjers"
    },
    {
        name: "Skicircus Saalbach",
        color: "#00bcd4",
        area: [[47.45, 12.45], [47.45, 12.80], [47.28, 12.80], [47.28, 12.45]],
        info: "Saalbach-Hinterglemm-Leogang-Fieberbrunn"
    },
    {
        name: "Kitzbüheler Alpen",
        color: "#8bc34a",
        area: [[47.50, 12.25], [47.50, 12.50], [47.35, 12.50], [47.35, 12.25]],
        info: "Legendarische Hahnenkamm afdaling"
    },
    {
        name: "Silvretta Arena",
        color: "#ff5722",
        area: [[47.05, 10.15], [47.05, 10.50], [46.85, 10.50], [46.85, 10.15]],
        info: "Grensoverschrijdend Ischgl-Samnaun"
    },
    {
        name: "SkiWelt",
        color: "#795548",
        area: [[47.55, 12.00], [47.55, 12.35], [47.40, 12.35], [47.40, 12.00]],
        info: "SkiWelt Wilder Kaiser-Brixental (280 km piste)"
    },
    {
        name: "Stubaital",
        color: "#607d8b",
        area: [[47.15, 11.25], [47.15, 11.55], [46.95, 11.55], [46.95, 11.25]],
        info: "Stubaier Gletsjer - skiën tot 3.200m"
    },
    {
        name: "Gasteinertal",
        color: "#3f51b5",
        area: [[47.15, 13.00], [47.15, 13.25], [46.95, 13.25], [46.95, 13.00]],
        info: "Bad Gastein en Sportgastein"
    },
    {
        name: "Schladming-Dachstein",
        color: "#009688",
        area: [[47.45, 13.55], [47.45, 13.90], [47.30, 13.90], [47.30, 13.55]],
        info: "4 bergen ski-amade regio"
    },
    {
        name: "Serfaus-Fiss-Ladis",
        color: "#cddc39",
        area: [[47.10, 10.55], [47.10, 10.75], [46.95, 10.75], [46.95, 10.55]],
        info: "Familievriendelijk topgebied"
    },
    {
        name: "Zell am See-Kaprun",
        color: "#f44336",
        area: [[47.35, 12.70], [47.35, 12.95], [47.15, 12.95], [47.15, 12.70]],
        info: "Kitzsteinhorn gletsjer"
    },
    {
        name: "Montafon",
        color: "#673ab7",
        area: [[47.10, 9.85], [47.10, 10.15], [46.88, 10.15], [46.88, 9.85]],
        info: "11 skigebieden in het Montafon dal"
    },
    {
        name: "Bregenzerwald",
        color: "#00897b",
        area: [[47.40, 9.85], [47.40, 10.15], [47.25, 10.15], [47.25, 9.85]],
        info: "Damüls-Mellau en Warth-Schröcken"
    }
];


// ===========================
// DATA: ALL SKI RESORTS
// ===========================

var skiResorts = [
    // Ski Arlberg
    { name: "St. Anton", region: "Ski Arlberg", lat: 47.1167, lng: 10.2667, pisteKm: 300 },
    { name: "Lech", region: "Ski Arlberg", lat: 47.2167, lng: 10.1500, pisteKm: 300 },
    { name: "Zürs", region: "Ski Arlberg", lat: 47.1700, lng: 10.1600, pisteKm: 300 },
    { name: "Warth-Schröcken", region: "Ski Arlberg", lat: 47.2500, lng: 10.1833, pisteKm: 300 },
    { name: "Stuben", region: "Ski Arlberg", lat: 47.1333, lng: 10.1833, pisteKm: 300 },
    
    // Silvretta Arena
    { name: "Ischgl", region: "Silvretta Arena", lat: 46.9667, lng: 10.2833, pisteKm: 239 },
    { name: "Galtür", region: "Silvretta Arena", lat: 46.9667, lng: 10.1833, pisteKm: 40 },
    
    // Ötztal
    { name: "Sölden", region: "Ötztal", lat: 46.9653, lng: 10.8681, pisteKm: 144 },
    { name: "Obergurgl-Hochgurgl", region: "Ötztal", lat: 46.8667, lng: 11.0167, pisteKm: 112 },
    { name: "Hochoetz-Kühtai", region: "Ötztal", lat: 47.1000, lng: 10.8500, pisteKm: 80 },
    
    // Stubaital
    { name: "Stubaier Gletsjer", region: "Stubaital", lat: 47.0000, lng: 11.3167, pisteKm: 65 },
    { name: "Schlick 2000", region: "Stubaital", lat: 47.1333, lng: 11.3000, pisteKm: 25 },
    
    // Serfaus-Fiss-Ladis
    { name: "Serfaus-Fiss-Ladis", region: "Serfaus-Fiss-Ladis", lat: 47.0333, lng: 10.6000, pisteKm: 214 },
    
    // Zillertal
    { name: "Mayrhofen", region: "Zillertal", lat: 47.1667, lng: 11.8667, pisteKm: 142 },
    { name: "Hintertux Gletsjer", region: "Zillertal", lat: 47.0667, lng: 11.6667, pisteKm: 60 },
    { name: "Zillertal Arena", region: "Zillertal", lat: 47.2167, lng: 12.0000, pisteKm: 150 },
    { name: "Hochzillertal-Kaltenbach", region: "Zillertal", lat: 47.1833, lng: 11.8667, pisteKm: 91 },
    
    // SkiWelt
    { name: "SkiWelt Wilder Kaiser", region: "SkiWelt", lat: 47.4833, lng: 12.1500, pisteKm: 284 },
    { name: "Söll", region: "SkiWelt", lat: 47.5000, lng: 12.1833, pisteKm: 284 },
    { name: "Ellmau", region: "SkiWelt", lat: 47.5000, lng: 12.3000, pisteKm: 284 },
    
    // Kitzbüheler Alpen
    { name: "Kitzbühel", region: "Kitzbüheler Alpen", lat: 47.4500, lng: 12.3833, pisteKm: 170 },
    { name: "Kirchberg", region: "Kitzbüheler Alpen", lat: 47.4500, lng: 12.3167, pisteKm: 170 },
    
    // Skicircus Saalbach
    { name: "Saalbach", region: "Skicircus Saalbach", lat: 47.3833, lng: 12.6333, pisteKm: 270 },
    { name: "Hinterglemm", region: "Skicircus Saalbach", lat: 47.3833, lng: 12.5500, pisteKm: 270 },
    { name: "Leogang", region: "Skicircus Saalbach", lat: 47.4333, lng: 12.7500, pisteKm: 270 },
    { name: "Fieberbrunn", region: "Skicircus Saalbach", lat: 47.4667, lng: 12.5500, pisteKm: 270 },
    
    // Zell am See-Kaprun
    { name: "Zell am See", region: "Zell am See-Kaprun", lat: 47.3167, lng: 12.8000, pisteKm: 138 },
    { name: "Kitzsteinhorn", region: "Zell am See-Kaprun", lat: 47.2000, lng: 12.6833, pisteKm: 138 },
    
    // Gasteinertal
    { name: "Bad Gastein", region: "Gasteinertal", lat: 47.1167, lng: 13.1333, pisteKm: 200 },
    { name: "Bad Hofgastein", region: "Gasteinertal", lat: 47.1667, lng: 13.1000, pisteKm: 200 },
    { name: "Sportgastein", region: "Gasteinertal", lat: 47.0500, lng: 13.0833, pisteKm: 200 },
    
    // Schladming-Dachstein
    { name: "Schladming", region: "Schladming-Dachstein", lat: 47.3833, lng: 13.6833, pisteKm: 123 },
    { name: "Planai", region: "Schladming-Dachstein", lat: 47.3667, lng: 13.7167, pisteKm: 123 },
    { name: "Ramsau Dachstein", region: "Schladming-Dachstein", lat: 47.4167, lng: 13.8167, pisteKm: 123 },
    
    // Standalone resorts
    { name: "Obertauern", region: "Obertauern", lat: 47.2500, lng: 13.5667, pisteKm: 100 },
    { name: "Nassfeld", region: "Nassfeld", lat: 46.5667, lng: 13.2833, pisteKm: 110 },
    
    // Montafon
    { name: "Gargellen", region: "Montafon", lat: 46.9667, lng: 9.9167, pisteKm: 40 },
    { name: "Silvretta Montafon", region: "Montafon", lat: 47.0167, lng: 9.9833, pisteKm: 140 },
    { name: "Golm", region: "Montafon", lat: 47.0500, lng: 9.8333, pisteKm: 44 },
    { name: "Brandnertal", region: "Montafon", lat: 47.1000, lng: 9.7500, pisteKm: 55 },
    
    // Bregenzerwald
    { name: "Damüls-Mellau", region: "Bregenzerwald", lat: 47.2833, lng: 9.8833, pisteKm: 109 },
    { name: "Au-Schoppernau", region: "Bregenzerwald", lat: 47.3333, lng: 10.0667, pisteKm: 40 },
    { name: "Schwarzenberg-Bödele", region: "Bregenzerwald", lat: 47.4167, lng: 9.8500, pisteKm: 12 }
];


// ===========================
// LOAD SAVED DATA
// ===========================

var visitedStatus = JSON.parse(localStorage.getItem('skitracker-visited')) || {};


// ===========================
// MARKER ICONS
// ===========================

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34]
});

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34]
});


// ===========================
// DRAW REGIONS ON THE MAP
// ===========================

skiRegions.forEach(function(region) {
    // Draw the colored polygon
    L.polygon(region.area, {
        color: region.color,
        fillColor: region.color,
        fillOpacity: 0.25,
        weight: 2
    })
    .addTo(map)
    .bindPopup("<b>" + region.name + "</b><br>" + region.info);
    
    // Add to the legend
    document.getElementById('region-legend').innerHTML += `
        <div class="legend-item">
            <div class="square" style="background-color: ${region.color};"></div>
            <span>${region.name}</span>
        </div>
    `;
});


// ===========================
// STORE MARKERS
// ===========================

var markers = {};


// ===========================
// DRAW SKI RESORTS ON THE MAP
// ===========================

skiResorts.forEach(function(resort) {
    var isVisited = visitedStatus[resort.name] || false;
    var icon = isVisited ? greenIcon : blueIcon;
    
    var marker = L.marker([resort.lat, resort.lng], {icon: icon}).addTo(map);
    markers[resort.name] = marker;
    
    updatePopup(resort.name);
});


// ===========================
// FUNCTIONS
// ===========================

// Update the popup of a marker
function updatePopup(name) {
    var resort = skiResorts.find(r => r.name === name);
    var isVisited = visitedStatus[name] || false;
    var buttonClass = isVisited ? "" : "not-visited";
    var buttonText = isVisited ? "✅ Bezocht! (klik om te wijzigen)" : "Markeer als bezocht";
    
    var popupHTML = `
        <div class="popup-content">
            <h4>${resort.name}</h4>
            <p><b>Regio:</b> ${resort.region}</p>
            <button class="popup-button ${buttonClass}" onclick="toggleVisited('${resort.name}')">
                ${buttonText}
            </button>
        </div>
    `;
    
    markers[name].bindPopup(popupHTML);
}


// Toggle visited status
function toggleVisited(name) {
    visitedStatus[name] = !visitedStatus[name];
    
    // Update marker icon
    var newIcon = visitedStatus[name] ? greenIcon : blueIcon;
    markers[name].setIcon(newIcon);
    
    // Update popup
    updatePopup(name);
    
    // Update list
    updateList();
    
    // Save to browser
    localStorage.setItem('skitracker-visited', JSON.stringify(visitedStatus));
}


// Update the list in the sidebar
function updateList() {
    var list = document.getElementById('resort-list');
    list.innerHTML = '';
    
    // Sort: visited first, then alphabetically
    var sorted = [...skiResorts].sort((a, b) => {
        var aVisited = visitedStatus[a.name] ? 1 : 0;
        var bVisited = visitedStatus[b.name] ? 1 : 0;
        if (bVisited !== aVisited) return bVisited - aVisited;
        return a.name.localeCompare(b.name);
    });
    
    sorted.forEach(function(resort) {
        var isVisited = visitedStatus[resort.name] || false;
        var visitedClass = isVisited ? 'visited' : '';
        var checkmark = isVisited ? '✓' : '';
        
        list.innerHTML += `
            <li class="${visitedClass}" onclick="toggleVisited('${resort.name}')">
                <div class="checkbox">${checkmark}</div>
                <div>
                    <strong>${resort.name}</strong><br>
                    <small>${resort.region}</small>
                </div>
            </li>
        `;
    });
    
    // Update statistics
    var visitedCount = Object.values(visitedStatus).filter(v => v).length;
    document.getElementById('visited-count').textContent = visitedCount;
    document.getElementById('total-resorts').textContent = skiResorts.length;
}


// Reset all visited resorts
function resetAll() {
    if (confirm('Weet je zeker dat je alles wilt resetten?')) {
        visitedStatus = {};
        localStorage.removeItem('skitracker-visited');
        
        // Reset all markers to blue
        skiResorts.forEach(function(resort) {
            markers[resort.name].setIcon(blueIcon);
            updatePopup(resort.name);
        });
        
        updateList();
    }
}


// ===========================
// START THE APP
// ===========================

updateList();