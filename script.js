// ===========================
// RATING CATEGORIES
// ===========================

var skiRatingCategories = [
    { id: 'size', name: 'Grootte skigebied', icon: '🏔️' },
    { id: 'descent', name: 'Afdaling naar dal', icon: '⬇️' },
    { id: 'atmosphere', name: 'Sfeer', icon: '🎉' },
    { id: 'pricing', name: 'Prijs skigebied', icon: '💰' },
    { id: 'touring', name: 'Geschikt voor toeren', icon: '🎿' }
];

var accommodationRatingCategories = [
    { id: 'accPrice', name: 'Prijs accommodatie', icon: '💶' },
    { id: 'accQuality', name: 'Kwaliteit accommodatie', icon: '✨' }
];

var allRatingCategories = skiRatingCategories.concat(accommodationRatingCategories);

var accommodationTypes = {
    hotel: { name: 'Hotel', icon: '🏨' },
    appartement: { name: 'Appartement', icon: '🏢' },
    house: { name: 'Huis', icon: '🏠' }
};


// ===========================
// MAP INITIALIZATION
// ===========================

var map = L.map('map').setView([47.2, 12.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


// ===========================
// DATA: ALL SKI REGIONS (Fluid shapes)
// ===========================

var skiRegions = [
    { 
        name: "Ski Arlberg", 
        color: "#e91e63", 
        area: [
            [47.28, 10.12], [47.26, 10.20], [47.24, 10.28], [47.20, 10.32], 
            [47.14, 10.30], [47.10, 10.28], [47.08, 10.22], [47.10, 10.14], 
            [47.14, 10.10], [47.18, 10.12], [47.22, 10.14], [47.28, 10.12]
        ], 
        info: "Grootste skigebied van Oostenrijk (300+ km piste)" 
    },
    { 
        name: "Zillertal", 
        color: "#9c27b0", 
        area: [
            [47.26, 11.62], [47.24, 11.75], [47.22, 11.88], [47.20, 12.02],
            [47.16, 12.06], [47.10, 12.04], [47.04, 11.95], [47.02, 11.80],
            [47.04, 11.65], [47.10, 11.60], [47.18, 11.60], [47.26, 11.62]
        ], 
        info: "Vier grote skigebieden in één dal" 
    },
    { 
        name: "Ötztal", 
        color: "#ff9800", 
        area: [
            [47.14, 10.80], [47.12, 10.90], [47.08, 11.00], [47.00, 11.08],
            [46.92, 11.06], [46.84, 11.04], [46.82, 10.95], [46.84, 10.82],
            [46.92, 10.78], [47.02, 10.78], [47.10, 10.80], [47.14, 10.80]
        ], 
        info: "Hoogste skigebieden van Oostenrijk met gletsjers" 
    },
    { 
        name: "Skicircus Saalbach", 
        color: "#00bcd4", 
        area: [
            [47.48, 12.52], [47.46, 12.62], [47.44, 12.72], [47.40, 12.78],
            [47.36, 12.76], [47.34, 12.68], [47.35, 12.54], [47.38, 12.50],
            [47.42, 12.48], [47.48, 12.52]
        ], 
        info: "Saalbach-Hinterglemm-Leogang-Fieberbrunn" 
    },
    { 
        name: "Kitzbüheler Alpen", 
        color: "#8bc34a", 
        area: [
            [47.48, 12.28], [47.46, 12.36], [47.46, 12.42], [47.44, 12.46],
            [47.40, 12.44], [47.42, 12.36], [47.42, 12.28], [47.44, 12.26],
            [47.48, 12.28]
        ], 
        info: "Legendarische Hahnenkamm afdaling" 
    },
    { 
        name: "Silvretta Arena", 
        color: "#ff5722", 
        area: [
            [47.00, 10.15], [46.98, 10.25], [46.98, 10.32], [46.94, 10.36],
            [46.90, 10.32], [46.92, 10.22], [46.94, 10.14], [46.98, 10.12],
            [47.00, 10.15]
        ], 
        info: "Grensoverschrijdend Ischgl-Samnaun" 
    },
    { 
        name: "SkiWelt", 
        color: "#795548", 
        area: [
            [47.54, 12.10], [47.52, 12.20], [47.52, 12.32], [47.48, 12.34],
            [47.44, 12.32], [47.44, 12.20], [47.46, 12.10], [47.50, 12.08],
            [47.54, 12.10]
        ], 
        info: "SkiWelt Wilder Kaiser-Brixental (280 km piste)" 
    },
    { 
        name: "Stubaital", 
        color: "#607d8b", 
        area: [
            [47.16, 11.26], [47.14, 11.34], [47.10, 11.40], [47.04, 11.38],
            [46.98, 11.36], [46.96, 11.30], [46.98, 11.24], [47.04, 11.22],
            [47.10, 11.24], [47.16, 11.26]
        ], 
        info: "Stubaier Gletsjer - skiën tot 3.200m" 
    },
    { 
        name: "Gasteinertal", 
        color: "#3f51b5", 
        area: [
            [47.20, 13.06], [47.18, 13.12], [47.14, 13.18], [47.08, 13.18],
            [47.02, 13.14], [47.02, 13.06], [47.06, 13.02], [47.12, 13.02],
            [47.18, 13.04], [47.20, 13.06]
        ], 
        info: "Bad Gastein en Sportgastein" 
    },
    { 
        name: "Schladming-Dachstein", 
        color: "#009688", 
        area: [
            [47.44, 13.64], [47.42, 13.72], [47.42, 13.84], [47.38, 13.88],
            [47.34, 13.84], [47.34, 13.72], [47.36, 13.64], [47.40, 13.62],
            [47.44, 13.64]
        ], 
        info: "4 bergen ski-amade regio" 
    },
    { 
        name: "Serfaus-Fiss-Ladis", 
        color: "#cddc39", 
        area: [
            [47.06, 10.56], [47.04, 10.64], [47.02, 10.68], [46.98, 10.66],
            [46.98, 10.58], [47.00, 10.54], [47.04, 10.54], [47.06, 10.56]
        ], 
        info: "Familievriendelijk topgebied" 
    },
    { 
        name: "Zell am See-Kaprun", 
        color: "#f44336", 
        area: [
            [47.36, 12.64], [47.34, 12.74], [47.32, 12.84], [47.26, 12.86],
            [47.18, 12.82], [47.16, 12.72], [47.18, 12.64], [47.24, 12.60],
            [47.30, 12.62], [47.36, 12.64]
        ], 
        info: "Kitzsteinhorn gletsjer" 
    },
    { 
        name: "Montafon", 
        color: "#673ab7", 
        area: [
            [47.12, 9.72], [47.10, 9.82], [47.08, 9.94], [47.04, 10.04],
            [46.98, 10.02], [46.94, 9.94], [46.94, 9.84], [46.98, 9.76],
            [47.04, 9.72], [47.08, 9.70], [47.12, 9.72]
        ], 
        info: "11 skigebieden in het Montafon dal" 
    },
    { 
        name: "Bregenzerwald", 
        color: "#00897b", 
        area: [
            [47.44, 9.82], [47.42, 9.92], [47.38, 10.04], [47.32, 10.10],
            [47.26, 10.06], [47.26, 9.94], [47.28, 9.86], [47.34, 9.82],
            [47.40, 9.80], [47.44, 9.82]
        ], 
        info: "Damüls-Mellau en Warth-Schröcken" 
    }
];


// ===========================
// DATA: ALL SKI RESORTS WITH WINTERSPORT.NL URLS
// ===========================

var skiResorts = [
    // Ski Arlberg
    { 
        name: "St. Anton", 
        region: "Ski Arlberg", 
        lat: 47.1167, 
        lng: 10.2667, 
        pisteKm: 300,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/arlberg/kaarten"
    },
    { 
        name: "Lech", 
        region: "Ski Arlberg", 
        lat: 47.2167, 
        lng: 10.1500, 
        pisteKm: 300,
        skiMapUrl: "https://www.wintersport.nl/dorpen/lech/kaarten"
    },
    { 
        name: "Zürs", 
        region: "Ski Arlberg", 
        lat: 47.1700, 
        lng: 10.1600, 
        pisteKm: 300,
        skiMapUrl: "https://www.wintersport.nl/dorpen/zurs/kaarten"
    },
    { 
        name: "Warth-Schröcken", 
        region: "Ski Arlberg", 
        lat: 47.2500, 
        lng: 10.1833, 
        pisteKm: 300,
        skiMapUrl: "https://www.wintersport.nl/dorpen/warth/kaarten"
    },
    { 
        name: "Stuben", 
        region: "Ski Arlberg", 
        lat: 47.1333, 
        lng: 10.1833, 
        pisteKm: 300,
        skiMapUrl: "https://www.wintersport.nl/dorpen/stuben/kaarten"
    },
    
    // Silvretta Arena
    { 
        name: "Ischgl", 
        region: "Silvretta Arena", 
        lat: 46.9667, 
        lng: 10.2833, 
        pisteKm: 239,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/ischgl/kaarten"
    },
    { 
        name: "Galtür", 
        region: "Silvretta Arena", 
        lat: 46.9667, 
        lng: 10.1833, 
        pisteKm: 40,
        skiMapUrl: "https://www.wintersport.nl/dorpen/galtur/kaarten"
    },
    
    // Ötztal
    { 
        name: "Sölden", 
        region: "Ötztal", 
        lat: 46.9653, 
        lng: 10.8681, 
        pisteKm: 144,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/solden/kaarten"
    },
    { 
        name: "Obergurgl-Hochgurgl", 
        region: "Ötztal", 
        lat: 46.8667, 
        lng: 11.0167, 
        pisteKm: 112,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/hochgurgl/kaarten"
    },
    { 
        name: "Hochoetz-Kühtai", 
        region: "Ötztal", 
        lat: 47.1000, 
        lng: 10.8500, 
        pisteKm: 80,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/kuhtai/kaarten"
    },
    
    // Stubaital
    { 
        name: "Stubaier Gletsjer", 
        region: "Stubaital", 
        lat: 47.0000, 
        lng: 11.3167, 
        pisteKm: 65,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/stubaiergletscher/kaarten"
    },
    { 
        name: "Schlick 2000", 
        region: "Stubaital", 
        lat: 47.1333, 
        lng: 11.3000, 
        pisteKm: 25,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/schlick2000/kaarten"
    },
    
    // Serfaus-Fiss-Ladis
    { 
        name: "Serfaus-Fiss-Ladis", 
        region: "Serfaus-Fiss-Ladis", 
        lat: 47.0333, 
        lng: 10.6000, 
        pisteKm: 214,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/serfaus/kaarten"
    },
    
    // Zillertal
    { 
        name: "Mayrhofen", 
        region: "Zillertal", 
        lat: 47.1667, 
        lng: 11.8667, 
        pisteKm: 142,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/zillertal3000/kaarten"
    },
    { 
        name: "Hintertux Gletsjer", 
        region: "Zillertal", 
        lat: 47.0667, 
        lng: 11.6667, 
        pisteKm: 60,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/hintertux/kaarten"
    },
    { 
        name: "Zillertal Arena", 
        region: "Zillertal", 
        lat: 47.2167, 
        lng: 12.0000, 
        pisteKm: 150,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/zillertalarena/kaarten"
    },
    { 
        name: "Hochzillertal-Kaltenbach", 
        region: "Zillertal", 
        lat: 47.1833, 
        lng: 11.8667, 
        pisteKm: 91,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/hochzillertal/kaarten"
    },
    
    // SkiWelt
    { 
        name: "SkiWelt Wilder Kaiser", 
        region: "SkiWelt", 
        lat: 47.4833, 
        lng: 12.1500, 
        pisteKm: 284,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/skiwelt/kaarten"
    },
    { 
        name: "Söll", 
        region: "SkiWelt", 
        lat: 47.5000, 
        lng: 12.1833, 
        pisteKm: 284,
        skiMapUrl: "https://www.wintersport.nl/dorpen/soll/kaarten"
    },
    { 
        name: "Ellmau", 
        region: "SkiWelt", 
        lat: 47.5000, 
        lng: 12.3000, 
        pisteKm: 284,
        skiMapUrl: "https://www.wintersport.nl/dorpen/ellmau/kaarten"
    },
    
    // Kitzbüheler Alpen
    { 
        name: "Kitzbühel", 
        region: "Kitzbüheler Alpen", 
        lat: 47.4500, 
        lng: 12.3833, 
        pisteKm: 170,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/kitzbuhel/kaarten"
    },
    { 
        name: "Kirchberg", 
        region: "Kitzbüheler Alpen", 
        lat: 47.4500, 
        lng: 12.3167, 
        pisteKm: 170,
        skiMapUrl: "https://www.wintersport.nl/dorpen/kirchberg/kaarten"
    },
    
    // Skicircus Saalbach
    { 
        name: "Saalbach", 
        region: "Skicircus Saalbach", 
        lat: 47.3833, 
        lng: 12.6333, 
        pisteKm: 270,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/saalbach-hinterglemm/kaarten"
    },
    { 
        name: "Hinterglemm", 
        region: "Skicircus Saalbach", 
        lat: 47.3833, 
        lng: 12.5500, 
        pisteKm: 270,
        skiMapUrl: "https://www.wintersport.nl/dorpen/hinterglemm/kaarten"
    },
    { 
        name: "Leogang", 
        region: "Skicircus Saalbach", 
        lat: 47.4333, 
        lng: 12.7500, 
        pisteKm: 270,
        skiMapUrl: "https://www.wintersport.nl/dorpen/leogang/kaarten"
    },
    { 
        name: "Fieberbrunn", 
        region: "Skicircus Saalbach", 
        lat: 47.4667, 
        lng: 12.5500, 
        pisteKm: 270,
        skiMapUrl: "https://www.wintersport.nl/dorpen/fieberbrunn/kaarten"
    },
    
    // Zell am See-Kaprun
    { 
        name: "Zell am See", 
        region: "Zell am See-Kaprun", 
        lat: 47.3167, 
        lng: 12.8000, 
        pisteKm: 138,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/zellamsee-kaprun/kaarten"
    },
    { 
        name: "Kitzsteinhorn", 
        region: "Zell am See-Kaprun", 
        lat: 47.2000, 
        lng: 12.6833, 
        pisteKm: 138,
        skiMapUrl: "https://www.wintersport.nl/dorpen/kaprun/kaarten"
    },
    
    // Gasteinertal
    { 
        name: "Bad Gastein", 
        region: "Gasteinertal", 
        lat: 47.1167, 
        lng: 13.1333, 
        pisteKm: 200,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/gastein/kaarten"
    },
    { 
        name: "Bad Hofgastein", 
        region: "Gasteinertal", 
        lat: 47.1667, 
        lng: 13.1000, 
        pisteKm: 200,
        skiMapUrl: "https://www.wintersport.nl/dorpen/bad_hofgastein/kaarten"
    },
    { 
        name: "Sportgastein", 
        region: "Gasteinertal", 
        lat: 47.0500, 
        lng: 13.0833, 
        pisteKm: 200,
        skiMapUrl: "https://www.wintersport.nl/dorpen/sportgastein/kaarten"
    },
    
    // Schladming-Dachstein
    { 
        name: "Schladming", 
        region: "Schladming-Dachstein", 
        lat: 47.3833, 
        lng: 13.6833, 
        pisteKm: 123,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/schladming/kaarten"
    },
    { 
        name: "Planai", 
        region: "Schladming-Dachstein", 
        lat: 47.3667, 
        lng: 13.7167, 
        pisteKm: 123,
        skiMapUrl: "https://www.wintersport.nl/dorpen/schladming/kaarten"
    },
    { 
        name: "Ramsau Dachstein", 
        region: "Schladming-Dachstein", 
        lat: 47.4167, 
        lng: 13.8167, 
        pisteKm: 123,
        skiMapUrl: "https://www.wintersport.nl/dorpen/ramsau_am_dachstein/kaarten"
    },
    
    // Obertauern
    { 
        name: "Obertauern", 
        region: "Obertauern", 
        lat: 47.2500, 
        lng: 13.5667, 
        pisteKm: 100,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/obertauern/kaarten"
    },
    
    // Nassfeld
    { 
        name: "Nassfeld", 
        region: "Nassfeld", 
        lat: 46.5667, 
        lng: 13.2833, 
        pisteKm: 110,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/nassfeld/kaarten"
    },
    
    // Montafon
    { 
        name: "Gargellen", 
        region: "Montafon", 
        lat: 46.9667, 
        lng: 9.9167, 
        pisteKm: 40,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/gargellen/kaarten"
    },
    { 
        name: "Silvretta Montafon", 
        region: "Montafon", 
        lat: 47.0167, 
        lng: 9.9833, 
        pisteKm: 140,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/silvrettamontafon/kaarten"
    },
    { 
        name: "Golm", 
        region: "Montafon", 
        lat: 47.0500, 
        lng: 9.8333, 
        pisteKm: 44,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/golm/kaarten"
    },
    { 
        name: "Brandnertal", 
        region: "Montafon", 
        lat: 47.1000, 
        lng: 9.7500, 
        pisteKm: 55,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/brandnertal/kaarten"
    },
    
    // Bregenzerwald
    { 
        name: "Damüls-Mellau", 
        region: "Bregenzerwald", 
        lat: 47.2833, 
        lng: 9.8833, 
        pisteKm: 109,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/damuls/kaarten"
    },
    { 
        name: "Au-Schoppernau", 
        region: "Bregenzerwald", 
        lat: 47.3333, 
        lng: 10.0667, 
        pisteKm: 40,
        skiMapUrl: "https://www.wintersport.nl/dorpen/au/kaarten"
    },
    { 
        name: "Schwarzenberg-Bödele", 
        region: "Bregenzerwald", 
        lat: 47.4167, 
        lng: 9.8500, 
        pisteKm: 12,
        skiMapUrl: "https://www.wintersport.nl/skigebieden/bregenzerwald/kaarten"
    }
];


// ===========================
// LOAD SAVED DATA
// ===========================

var visitData = JSON.parse(localStorage.getItem('skitracker-visits-v4')) || {};
var currentResort = null;


// ===========================
// MARKER COLORS (Circle Markers)
// ===========================

var visitedColor = '#4caf50'; // Green for visited resorts

function getRegionColor(regionName) {
    var region = skiRegions.find(function(r) { return r.name === regionName; });
    return region ? region.color : '#2196f3';
}

function getMarkerColor(resortName) {
    var visits = visitData[resortName] || [];
    if (visits.length > 0) {
        return visitedColor;
    }
    var resort = skiResorts.find(function(r) { return r.name === resortName; });
    return resort ? getRegionColor(resort.region) : '#2196f3';
}


// ===========================
// DRAW REGIONS ON THE MAP
// ===========================

skiRegions.forEach(function(region) {
    L.polygon(region.area, {
        color: region.color,
        fillColor: region.color,
        fillOpacity: 0.20,
        weight: 2,
        smoothFactor: 1.5,
        lineJoin: 'round',
        lineCap: 'round'
    }).addTo(map).bindPopup("<b>" + region.name + "</b><br>" + region.info);
    
    document.getElementById('region-legend').innerHTML += 
        '<div class="legend-item"><div class="square" style="background-color: ' + region.color + ';"></div><span>' + region.name + '</span></div>';
});


// ===========================
// STORE MARKERS & DRAW RESORTS
// ===========================

var markers = {};

skiResorts.forEach(function(resort) {
    var markerColor = getMarkerColor(resort.name);
    var visits = visitData[resort.name] || [];
    var marker = L.circleMarker([resort.lat, resort.lng], {
        radius: visits.length > 0 ? 10 : 8,
        fillColor: markerColor,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
    }).addTo(map);
    markers[resort.name] = marker;
    marker.resortName = resort.name;
    bindMarkerPopup(resort.name);
});


// ===========================
// HELPER FUNCTIONS
// ===========================

function getVisitCount(resortName) {
    return (visitData[resortName] || []).length;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatDateShort(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'short'
    });
}

function formatDateRange(startDate, endDate) {
    if (startDate === endDate) {
        return formatDate(startDate);
    }
    
    var start = new Date(startDate);
    var end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return start.getDate() + ' - ' + formatDate(endDate);
    }
    
    if (start.getFullYear() === end.getFullYear()) {
        return start.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' }) + ' - ' + formatDate(endDate);
    }
    
    return formatDate(startDate) + ' - ' + formatDate(endDate);
}

function formatDateRangeShort(startDate, endDate) {
    if (startDate === endDate) {
        return formatDateShort(startDate);
    }
    return formatDateShort(startDate) + ' - ' + formatDateShort(endDate);
}

function calculateDuration(startDate, endDate) {
    var diffDays = Math.ceil(Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays === 1 ? '1 dag' : diffDays + ' dagen';
}

function getYear(dateString) {
    return new Date(dateString).getFullYear();
}

function generateVisitId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getStarsText(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function calculateAverageRating(ratings, categories) {
    var total = 0;
    var count = 0;
    categories.forEach(function(cat) {
        if (ratings[cat.id]) {
            total += ratings[cat.id];
            count++;
        }
    });
    return count > 0 ? (total / count).toFixed(1) : 0;
}

function calculateOverallAverage(ratings) {
    return calculateAverageRating(ratings, allRatingCategories);
}


// ===========================
// RATING FUNCTIONS
// ===========================

function getRatings() {
    var ratings = {};
    allRatingCategories.forEach(function(cat) {
        var selected = document.querySelector('input[name="rating-' + cat.id + '"]:checked');
        ratings[cat.id] = selected ? parseInt(selected.value) : 0;
    });
    return ratings;
}

function clearRatings() {
    allRatingCategories.forEach(function(cat) {
        var radios = document.querySelectorAll('input[name="rating-' + cat.id + '"]');
        radios.forEach(function(radio) {
            radio.checked = false;
        });
    });
}


// ===========================
// ACCOMMODATION FUNCTIONS
// ===========================

function getAccommodationType() {
    var selected = document.querySelector('input[name="accommodation-type"]:checked');
    return selected ? selected.value : null;
}

function clearAccommodationType() {
    var radios = document.querySelectorAll('input[name="accommodation-type"]');
    radios.forEach(function(radio) {
        radio.checked = false;
    });
}

function getAccommodationUrl() {
    return document.getElementById('accommodation-url').value.trim();
}


// ===========================
// RICH TEXT EDITOR FUNCTIONS
// ===========================

function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('notes-editor').focus();
}

function getNotes() {
    return document.getElementById('notes-editor').innerHTML;
}

function clearNotes() {
    document.getElementById('notes-editor').innerHTML = '';
}


// ===========================
// TIMELINE FUNCTIONS
// ===========================

function updateTimeline() {
    var timeline = document.getElementById('timeline');
    var timelineTotal = document.getElementById('timeline-total');
    var allVisits = [];
    
    for (var resortName in visitData) {
        var resort = skiResorts.find(function(r) { return r.name === resortName; });
        if (resort) {
            visitData[resortName].forEach(function(visit) {
                allVisits.push({
                    id: visit.id,
                    startDate: visit.startDate,
                    endDate: visit.endDate,
                    companions: visit.companions,
                    ratings: visit.ratings || {},
                    accommodation: visit.accommodation || {},
                    notes: visit.notes || '',
                    resortName: resortName,
                    region: resort.region
                });
            });
        }
    }
    
    timelineTotal.textContent = allVisits.length;
    
    if (allVisits.length === 0) {
        timeline.innerHTML = '<p class="no-visits-yet">Nog geen bezoeken geregistreerd.</p>';
        return;
    }
    
    allVisits.sort(function(a, b) {
        return new Date(b.startDate) - new Date(a.startDate);
    });
    
    var visitsByYear = {};
    allVisits.forEach(function(visit) {
        var year = getYear(visit.startDate);
        if (!visitsByYear[year]) visitsByYear[year] = [];
        visitsByYear[year].push(visit);
    });
    
    var html = '';
    Object.keys(visitsByYear).sort(function(a, b) { return b - a; }).forEach(function(year) {
        html += '<div class="timeline-year">🗓️ ' + year + '</div>';
        
        visitsByYear[year].forEach(function(visit) {
            var companionsHtml = visit.companions ? '<div class="timeline-item-companions">' + visit.companions + '</div>' : '';
            
            // Accommodation info
            var accHtml = '';
            if (visit.accommodation && visit.accommodation.type) {
                var accType = accommodationTypes[visit.accommodation.type];
                accHtml = '<div class="timeline-item-accommodation">' + accType.icon + ' ' + accType.name + '</div>';
            }
            
            var avgRating = calculateOverallAverage(visit.ratings);
            var ratingHtml = '';
            if (avgRating > 0) {
                var fullStars = Math.round(avgRating);
                ratingHtml = '<div class="timeline-item-rating"><span class="avg-stars">' + getStarsText(fullStars) + '</span><span class="avg-score">(' + avgRating + ')</span></div>';
            }
            
            html += '<div class="timeline-item">';
            html += '<div class="timeline-item-content" data-resort="' + encodeURIComponent(visit.resortName) + '">';
            html += '<div class="timeline-item-date">' + formatDateRangeShort(visit.startDate, visit.endDate) + '</div>';
            html += '<div class="timeline-item-resort">' + visit.resortName + '</div>';
            html += '<div class="timeline-item-region">' + visit.region + '</div>';
            html += companionsHtml;
            html += accHtml;
            html += ratingHtml;
            html += '</div></div>';
        });
    });
    
    timeline.innerHTML = html;
    
    document.querySelectorAll('.timeline-item-content').forEach(function(item) {
        item.addEventListener('click', function() {
            openModal(decodeURIComponent(this.getAttribute('data-resort')));
        });
    });
}


// ===========================
// POPUP FUNCTIONS
// ===========================

function bindMarkerPopup(resortName) {
    var resort = skiResorts.find(function(r) { return r.name === resortName; });
    var marker = markers[resortName];
    var visits = visitData[resortName] || [];
    var visitText = visits.length === 0 ? "Nog niet bezocht" : 
                    visits.length === 1 ? "1 keer bezocht ✓" : 
                    visits.length + " keer bezocht ✓";
    var visitClass = visits.length > 0 ? 'visited' : '';
    
    var popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    
    // Header with name
    var header = document.createElement('h4');
    header.textContent = resort.name;
    popupContent.appendChild(header);
    
    // Region
    var regionEl = document.createElement('p');
    regionEl.className = 'popup-region';
    regionEl.innerHTML = '📍 ' + resort.region;
    popupContent.appendChild(regionEl);
    
    // Piste km
    var pisteEl = document.createElement('p');
    pisteEl.className = 'popup-piste-km';
    pisteEl.innerHTML = '🎿 ' + resort.pisteKm + ' km piste';
    popupContent.appendChild(pisteEl);
    
    // Visit status
    var visitsEl = document.createElement('p');
    visitsEl.className = 'popup-visits ' + visitClass;
    visitsEl.textContent = visitText;
    popupContent.appendChild(visitsEl);
    
    // Buttons container
    var buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'popup-buttons';
    
    // Ski Map button
    var skiMapButton = document.createElement('a');
    skiMapButton.className = 'popup-button ski-map-button';
    skiMapButton.href = resort.skiMapUrl;
    skiMapButton.target = '_blank';
    skiMapButton.innerHTML = '🗺️ Bekijk Pistekaart';
    buttonsDiv.appendChild(skiMapButton);
    
    // Manage visits button
    var manageButton = document.createElement('button');
    manageButton.className = 'popup-button';
    manageButton.textContent = '📅 Bezoeken beheren';
    manageButton.addEventListener('click', function() {
        openModal(resortName);
    });
    buttonsDiv.appendChild(manageButton);
    
    popupContent.appendChild(buttonsDiv);
    
    marker.bindPopup(popupContent, {
        minWidth: 220
    });
}

function updatePopup(resortName) {
    bindMarkerPopup(resortName);
}


// ===========================
// MODAL FUNCTIONS
// ===========================

function openModal(resortName) {
    currentResort = resortName;
    var resort = skiResorts.find(function(r) { return r.name === resortName; });
    
    document.getElementById('modal-title').textContent = resort.name;
    document.getElementById('modal-region').textContent = "Regio: " + resort.region;
    
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('visit-start-date').value = today;
    document.getElementById('visit-end-date').value = today;
    document.getElementById('visit-companions').value = '';
    document.getElementById('accommodation-url').value = '';
    clearRatings();
    clearAccommodationType();
    clearNotes();
    
    updateModalVisitList();
    document.getElementById('visit-modal').style.display = 'block';
    map.closePopup();
}

function closeModal() {
    document.getElementById('visit-modal').style.display = 'none';
    currentResort = null;
}

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('visit-modal')) {
        closeModal();
    }
});

function updateModalVisitList() {
    var visits = visitData[currentResort] || [];
    var listElement = document.getElementById('visit-list');
    var noVisitsMessage = document.getElementById('no-visits-message');
    
    document.getElementById('visit-count').textContent = visits.length;
    listElement.innerHTML = '';
    
    if (visits.length === 0) {
        noVisitsMessage.style.display = 'block';
    } else {
        noVisitsMessage.style.display = 'none';
        
        visits.slice().sort(function(a, b) {
            return new Date(b.startDate) - new Date(a.startDate);
        }).forEach(function(visit) {
            var companionsHtml = visit.companions ? '<div class="visit-companions">' + visit.companions + '</div>' : '';
            
            // Build ski ratings HTML
            var ratingsHtml = '';
            var ratings = visit.ratings || {};
            var hasSkiRatings = skiRatingCategories.some(function(cat) { return ratings[cat.id] > 0; });
            
            if (hasSkiRatings) {
                ratingsHtml = '<div class="visit-ratings"><div class="visit-ratings-title">⭐ Beoordeling Skigebied</div>';
                skiRatingCategories.forEach(function(cat) {
                    if (ratings[cat.id] > 0) {
                        ratingsHtml += '<div class="visit-rating-item">';
                        ratingsHtml += '<span class="rating-name">' + cat.icon + ' ' + cat.name + '</span>';
                        ratingsHtml += '<span class="rating-stars">' + getStarsText(ratings[cat.id]) + '</span>';
                        ratingsHtml += '</div>';
                    }
                });
                var skiAvg = calculateAverageRating(ratings, skiRatingCategories);
                ratingsHtml += '<div class="visit-avg-rating">';
                ratingsHtml += '<span class="avg-label">Gemiddeld skigebied</span>';
                ratingsHtml += '<span class="avg-value">★ ' + skiAvg + '</span>';
                ratingsHtml += '</div></div>';
            }
            
            // Build accommodation HTML
            var accommodationHtml = '';
            var acc = visit.accommodation || {};
            if (acc.type) {
                var accType = accommodationTypes[acc.type];
                accommodationHtml = '<div class="visit-accommodation"><div class="visit-accommodation-title">🏨 Accommodatie</div>';
                accommodationHtml += '<div class="visit-accommodation-type">' + accType.icon + ' ' + accType.name + '</div>';
                
                if (acc.url) {
                    accommodationHtml += '<div class="visit-accommodation-link">🔗 <a href="' + acc.url + '" target="_blank">' + acc.url + '</a></div>';
                }
                
                // Accommodation ratings
                var hasAccRatings = accommodationRatingCategories.some(function(cat) { return ratings[cat.id] > 0; });
                if (hasAccRatings) {
                    accommodationRatingCategories.forEach(function(cat) {
                        if (ratings[cat.id] > 0) {
                            accommodationHtml += '<div class="visit-rating-item">';
                            accommodationHtml += '<span class="rating-name">' + cat.icon + ' ' + cat.name + '</span>';
                            accommodationHtml += '<span class="rating-stars">' + getStarsText(ratings[cat.id]) + '</span>';
                            accommodationHtml += '</div>';
                        }
                    });
                    var accAvg = calculateAverageRating(ratings, accommodationRatingCategories);
                    accommodationHtml += '<div class="visit-avg-rating">';
                    accommodationHtml += '<span class="avg-label">Gemiddeld accommodatie</span>';
                    accommodationHtml += '<span class="avg-value">★ ' + accAvg + '</span>';
                    accommodationHtml += '</div>';
                }
                accommodationHtml += '</div>';
            }
            
            // Build notes HTML
            var notesHtml = '';
            if (visit.notes && visit.notes.trim() !== '' && visit.notes !== '<br>') {
                notesHtml = '<div class="visit-notes"><div class="visit-notes-title">📝 Notities</div>';
                notesHtml += '<div class="visit-notes-content">' + visit.notes + '</div></div>';
            }
            
            var li = document.createElement('li');
            li.innerHTML = '<div class="visit-date-range">' + formatDateRange(visit.startDate, visit.endDate) + '</div>' +
                          '<div class="visit-duration">' + calculateDuration(visit.startDate, visit.endDate) + '</div>' +
                          companionsHtml + ratingsHtml + accommodationHtml + notesHtml;
            
            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-visit';
            deleteButton.textContent = 'Verwijderen';
            deleteButton.addEventListener('click', function() {
                removeVisit(visit.id);
            });
            li.appendChild(deleteButton);
            listElement.appendChild(li);
        });
    }
}


// ===========================
// VISIT MANAGEMENT
// ===========================

function addVisit() {
    var startDate = document.getElementById('visit-start-date').value;
    var endDate = document.getElementById('visit-end-date').value || startDate;
    var companions = document.getElementById('visit-companions').value.trim();
    var ratings = getRatings();
    var accommodationType = getAccommodationType();
    var accommodationUrl = getAccommodationUrl();
    var notes = getNotes();
    
    // Validation
    if (!startDate) {
        alert('Selecteer een startdatum!');
        return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
        alert('De einddatum kan niet voor de startdatum liggen!');
        return;
    }
    
    // Check if at least one ski rating is given
    var hasSkiRating = skiRatingCategories.some(function(cat) { return ratings[cat.id] > 0; });
    if (!hasSkiRating) {
        alert('Geef minimaal één beoordeling voor het skigebied!');
        return;
    }
    
    // Check if accommodation type is selected
    if (!accommodationType) {
        alert('Selecteer een type accommodatie!');
        return;
    }
    
    if (!visitData[currentResort]) {
        visitData[currentResort] = [];
    }
    
    visitData[currentResort].push({
        id: generateVisitId(),
        startDate: startDate,
        endDate: endDate,
        companions: companions,
        ratings: ratings,
        accommodation: {
            type: accommodationType,
            url: accommodationUrl
        },
        notes: notes
    });
    
    saveData();
    updateModalVisitList();
    updateMarkerIcon(currentResort);
    updatePopup(currentResort);
    updateList();
    updateTimeline();
    
    // Clear form
    document.getElementById('visit-companions').value = '';
    document.getElementById('accommodation-url').value = '';
    clearRatings();
    clearAccommodationType();
    clearNotes();
}

function removeVisit(visitId) {
    if (!confirm('Weet je zeker dat je dit bezoek wilt verwijderen?')) {
        return;
    }
    
    visitData[currentResort] = visitData[currentResort].filter(function(v) {
        return v.id !== visitId;
    });
    
    if (visitData[currentResort].length === 0) {
        delete visitData[currentResort];
    }
    
    saveData();
    updateModalVisitList();
    updateMarkerIcon(currentResort);
    updatePopup(currentResort);
    updateList();
    updateTimeline();
}

function updateMarkerIcon(resortName) {
    var visits = visitData[resortName] || [];
    var markerColor = getMarkerColor(resortName);
    markers[resortName].setStyle({
        fillColor: markerColor,
        radius: visits.length > 0 ? 10 : 8
    });
}

function saveData() {
    localStorage.setItem('skitracker-visits-v4', JSON.stringify(visitData));
}


// ===========================
// SIDEBAR LIST
// ===========================

function updateList() {
    var list = document.getElementById('resort-list');
    list.innerHTML = '';
    
    skiResorts.slice().sort(function(a, b) {
        var diff = getVisitCount(b.name) - getVisitCount(a.name);
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
    }).forEach(function(resort) {
        var visitCount = getVisitCount(resort.name);
        var li = document.createElement('li');
        li.className = visitCount > 0 ? 'visited' : '';
        li.setAttribute('data-resort', encodeURIComponent(resort.name));
        li.innerHTML = '<div class="visit-badge ' + (visitCount > 0 ? '' : 'empty') + '">' + visitCount + '</div>' +
                      '<div><strong>' + resort.name + '</strong><br><small>' + resort.region + '</small></div>';
        li.addEventListener('click', function() {
            openModal(decodeURIComponent(this.getAttribute('data-resort')));
        });
        list.appendChild(li);
    });
    
    var totalVisits = 0;
    for (var key in visitData) {
        totalVisits += visitData[key].length;
    }
    
    document.getElementById('visited-count').textContent = Object.keys(visitData).length;
    document.getElementById('total-visits').textContent = totalVisits;
}


// ===========================
// RESET FUNCTION
// ===========================

function resetAll() {
    if (confirm('Weet je zeker dat je alle bezoeken wilt verwijderen?')) {
        visitData = {};
        localStorage.removeItem('skitracker-visits-v4');
        
        skiResorts.forEach(function(resort) {
            var regionColor = getRegionColor(resort.region);
            markers[resort.name].setStyle({
                fillColor: regionColor,
                radius: 8
            });
            updatePopup(resort.name);
        });
        
        updateList();
        updateTimeline();
    }
}


// ===========================
// START THE APP
// ===========================

updateList();
updateTimeline();
