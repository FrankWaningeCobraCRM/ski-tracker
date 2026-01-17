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

// Edit mode tracking
var editingVisitId = null;

// Temporary photo storage for current form
var pendingPhotos = [];

// Map variables
var map = null;
var markers = {};
var mapInitialized = false;


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
            [47.02, 10.24], [47.00, 10.32], [46.98, 10.38], [46.94, 10.42],
            [46.90, 10.38], [46.88, 10.30], [46.90, 10.22], [46.94, 10.20],
            [46.98, 10.22], [47.02, 10.24]
        ], 
        info: "Ischgl en Samnaun (Zwitserland)" 
    },
    { 
        name: "Stubaital", 
        color: "#795548", 
        area: [
            [47.12, 11.28], [47.10, 11.38], [47.06, 11.44], [47.00, 11.42],
            [46.96, 11.36], [46.98, 11.26], [47.02, 11.22], [47.08, 11.24],
            [47.12, 11.28]
        ], 
        info: "Stubaier Gletsjer - hoogste van Oostenrijk" 
    },
    { 
        name: "Wilder Kaiser", 
        color: "#607d8b", 
        area: [
            [47.54, 12.08], [47.52, 12.18], [47.50, 12.26], [47.46, 12.28],
            [47.42, 12.24], [47.42, 12.14], [47.44, 12.06], [47.48, 12.04],
            [47.54, 12.08]
        ], 
        info: "SkiWelt Wilder Kaiser - Brixental" 
    },
    { 
        name: "Zell am See-Kaprun", 
        color: "#9e9e9e", 
        area: [
            [47.36, 12.74], [47.34, 12.82], [47.30, 12.86], [47.24, 12.84],
            [47.20, 12.78], [47.18, 12.68], [47.22, 12.62], [47.28, 12.64],
            [47.34, 12.70], [47.36, 12.74]
        ], 
        info: "Kitzsteinhorn gletsjer" 
    },
    { 
        name: "Gasteinertal", 
        color: "#e91e63", 
        area: [
            [47.18, 13.02], [47.16, 13.12], [47.14, 13.20], [47.08, 13.22],
            [47.02, 13.18], [47.00, 13.08], [47.04, 13.00], [47.10, 12.98],
            [47.18, 13.02]
        ], 
        info: "Bad Gastein - historisch kuuroord" 
    },
    { 
        name: "Schladming-Dachstein", 
        color: "#3f51b5", 
        area: [
            [47.42, 13.62], [47.40, 13.72], [47.38, 13.82], [47.34, 13.86],
            [47.30, 13.82], [47.28, 13.70], [47.30, 13.60], [47.34, 13.56],
            [47.38, 13.58], [47.42, 13.62]
        ], 
        info: "4 bergen - 1 skipass" 
    },
    { 
        name: "Obertauern", 
        color: "#009688", 
        area: [
            [47.28, 13.52], [47.26, 13.58], [47.24, 13.62], [47.20, 13.60],
            [47.18, 13.54], [47.20, 13.48], [47.24, 13.48], [47.28, 13.52]
        ], 
        info: "Sneeuwzekere kom" 
    },
    { 
        name: "Nassfeld", 
        color: "#ff9800", 
        area: [
            [46.60, 13.22], [46.58, 13.30], [46.56, 13.36], [46.52, 13.34],
            [46.50, 13.26], [46.52, 13.18], [46.56, 13.18], [46.60, 13.22]
        ], 
        info: "Grootste skigebied van Karinthië" 
    },
    { 
        name: "Montafon", 
        color: "#4caf50", 
        area: [
            [47.10, 9.82], [47.08, 9.92], [47.04, 10.00], [46.98, 9.98],
            [46.94, 9.90], [46.96, 9.80], [47.00, 9.76], [47.06, 9.78],
            [47.10, 9.82]
        ], 
        info: "Silvretta Montafon & Golm" 
    },
    { 
        name: "Bregenzerwald", 
        color: "#673ab7", 
        area: [
            [47.36, 9.82], [47.34, 9.92], [47.30, 9.98], [47.26, 9.94],
            [47.24, 9.84], [47.26, 9.78], [47.30, 9.76], [47.36, 9.82]
        ], 
        info: "Damüls-Mellau - meest sneeuwzeker" 
    }
];


// ===========================
// DATA: ALL SKI RESORTS
// ===========================

var skiResorts = [
    // Ski Arlberg
    { name: "St. Anton am Arlberg", region: "Ski Arlberg", lat: 47.1297, lng: 10.2685, pisteKm: 305, skiMapUrl: "https://www.wintersport.nl/skigebieden/arlberg/kaarten" },
    { name: "Lech-Zürs", region: "Ski Arlberg", lat: 47.2078, lng: 10.1419, pisteKm: 305, skiMapUrl: "https://www.wintersport.nl/dorpen/lech/kaarten" },
    { name: "Stuben", region: "Ski Arlberg", lat: 47.1300, lng: 10.1900, pisteKm: 305, skiMapUrl: "https://www.wintersport.nl/dorpen/stuben/kaarten" },
    { name: "Warth-Schröcken", region: "Ski Arlberg", lat: 47.2500, lng: 10.1833, pisteKm: 305, skiMapUrl: "https://www.wintersport.nl/dorpen/warth/kaarten" },
    
    // Zillertal
    { name: "Mayrhofen", region: "Zillertal", lat: 47.1667, lng: 11.8667, pisteKm: 136, skiMapUrl: "https://www.wintersport.nl/skigebieden/mayrhofen/kaarten" },
    { name: "Zillertal Arena", region: "Zillertal", lat: 47.2333, lng: 11.8833, pisteKm: 150, skiMapUrl: "https://www.wintersport.nl/skigebieden/zillertalarena/kaarten" },
    { name: "Hochzillertal-Hochfügen", region: "Zillertal", lat: 47.2000, lng: 11.8500, pisteKm: 91, skiMapUrl: "https://www.wintersport.nl/skigebieden/hochzillertal/kaarten" },
    { name: "Hintertux Gletscher", region: "Zillertal", lat: 47.0667, lng: 11.6667, pisteKm: 60, skiMapUrl: "https://www.wintersport.nl/skigebieden/hintertuxergletsjer/kaarten" },
    
    // Ötztal
    { name: "Sölden", region: "Ötztal", lat: 46.9667, lng: 10.8667, pisteKm: 144, skiMapUrl: "https://www.wintersport.nl/skigebieden/solden/kaarten" },
    { name: "Obergurgl-Hochgurgl", region: "Ötztal", lat: 46.8667, lng: 11.0167, pisteKm: 112, skiMapUrl: "https://www.wintersport.nl/skigebieden/obergurgl/kaarten" },
    { name: "Kühtai", region: "Ötztal", lat: 47.2167, lng: 11.0167, pisteKm: 44, skiMapUrl: "https://www.wintersport.nl/skigebieden/kuhtai/kaarten" },
    
    // Skicircus Saalbach
    { name: "Saalbach", region: "Skicircus Saalbach", lat: 47.3833, lng: 12.6333, pisteKm: 270, skiMapUrl: "https://www.wintersport.nl/skigebieden/saalbach/kaarten" },
    { name: "Hinterglemm", region: "Skicircus Saalbach", lat: 47.3833, lng: 12.5500, pisteKm: 270, skiMapUrl: "https://www.wintersport.nl/dorpen/hinterglemm/kaarten" },
    { name: "Leogang", region: "Skicircus Saalbach", lat: 47.4333, lng: 12.7500, pisteKm: 270, skiMapUrl: "https://www.wintersport.nl/dorpen/leogang/kaarten" },
    { name: "Fieberbrunn", region: "Skicircus Saalbach", lat: 47.4667, lng: 12.5500, pisteKm: 270, skiMapUrl: "https://www.wintersport.nl/dorpen/fieberbrunn/kaarten" },
    
    // Kitzbüheler Alpen
    { name: "Kitzbühel", region: "Kitzbüheler Alpen", lat: 47.4500, lng: 12.3833, pisteKm: 188, skiMapUrl: "https://www.wintersport.nl/skigebieden/kitzbuhel/kaarten" },
    { name: "Kirchberg", region: "Kitzbüheler Alpen", lat: 47.4500, lng: 12.3167, pisteKm: 188, skiMapUrl: "https://www.wintersport.nl/dorpen/kirchberg_in_tirol/kaarten" },
    
    // Silvretta Arena
    { name: "Ischgl", region: "Silvretta Arena", lat: 46.9667, lng: 10.2833, pisteKm: 239, skiMapUrl: "https://www.wintersport.nl/skigebieden/ischgl/kaarten" },
    { name: "Galtür", region: "Silvretta Arena", lat: 46.9667, lng: 10.1833, pisteKm: 43, skiMapUrl: "https://www.wintersport.nl/skigebieden/galtur/kaarten" },
    { name: "Kappl", region: "Silvretta Arena", lat: 47.0500, lng: 10.3667, pisteKm: 42, skiMapUrl: "https://www.wintersport.nl/skigebieden/kappl/kaarten" },
    { name: "See", region: "Silvretta Arena", lat: 47.0833, lng: 10.4667, pisteKm: 41, skiMapUrl: "https://www.wintersport.nl/skigebieden/see/kaarten" },
    
    // Stubaital
    { name: "Stubaier Gletscher", region: "Stubaital", lat: 47.0000, lng: 11.3167, pisteKm: 65, skiMapUrl: "https://www.wintersport.nl/skigebieden/stubaiergletsjer/kaarten" },
    { name: "Schlick 2000", region: "Stubaital", lat: 47.1500, lng: 11.3000, pisteKm: 25, skiMapUrl: "https://www.wintersport.nl/skigebieden/schlick2000/kaarten" },
    { name: "Serles", region: "Stubaital", lat: 47.1000, lng: 11.3333, pisteKm: 8, skiMapUrl: "https://www.wintersport.nl/skigebieden/serles/kaarten" },
    
    // Wilder Kaiser
    { name: "Ellmau", region: "Wilder Kaiser", lat: 47.5167, lng: 12.2833, pisteKm: 284, skiMapUrl: "https://www.wintersport.nl/skigebieden/skiweltbilderkaiser/kaarten" },
    { name: "Söll", region: "Wilder Kaiser", lat: 47.5000, lng: 12.1833, pisteKm: 284, skiMapUrl: "https://www.wintersport.nl/dorpen/soll/kaarten" },
    { name: "Scheffau", region: "Wilder Kaiser", lat: 47.5333, lng: 12.2500, pisteKm: 284, skiMapUrl: "https://www.wintersport.nl/dorpen/scheffau/kaarten" },
    { name: "Going", region: "Wilder Kaiser", lat: 47.5167, lng: 12.3167, pisteKm: 284, skiMapUrl: "https://www.wintersport.nl/dorpen/going/kaarten" },
    { name: "Westendorf", region: "Wilder Kaiser", lat: 47.4333, lng: 12.2000, pisteKm: 284, skiMapUrl: "https://www.wintersport.nl/dorpen/westendorf/kaarten" },
    
    // Zell am See-Kaprun
    { name: "Zell am See", region: "Zell am See-Kaprun", lat: 47.3167, lng: 12.8000, pisteKm: 138, skiMapUrl: "https://www.wintersport.nl/skigebieden/zellamsee-kaprun/kaarten" },
    { name: "Kitzsteinhorn", region: "Zell am See-Kaprun", lat: 47.2000, lng: 12.6833, pisteKm: 138, skiMapUrl: "https://www.wintersport.nl/dorpen/kaprun/kaarten" },
    
    // Gasteinertal
    { name: "Bad Gastein", region: "Gasteinertal", lat: 47.1167, lng: 13.1333, pisteKm: 200, skiMapUrl: "https://www.wintersport.nl/skigebieden/gastein/kaarten" },
    { name: "Bad Hofgastein", region: "Gasteinertal", lat: 47.1667, lng: 13.1000, pisteKm: 200, skiMapUrl: "https://www.wintersport.nl/dorpen/bad_hofgastein/kaarten" },
    { name: "Sportgastein", region: "Gasteinertal", lat: 47.0500, lng: 13.0833, pisteKm: 200, skiMapUrl: "https://www.wintersport.nl/dorpen/sportgastein/kaarten" },
    
    // Schladming-Dachstein
    { name: "Schladming", region: "Schladming-Dachstein", lat: 47.3833, lng: 13.6833, pisteKm: 123, skiMapUrl: "https://www.wintersport.nl/skigebieden/schladming/kaarten" },
    { name: "Planai", region: "Schladming-Dachstein", lat: 47.3667, lng: 13.7167, pisteKm: 123, skiMapUrl: "https://www.wintersport.nl/dorpen/schladming/kaarten" },
    { name: "Ramsau Dachstein", region: "Schladming-Dachstein", lat: 47.4167, lng: 13.8167, pisteKm: 123, skiMapUrl: "https://www.wintersport.nl/dorpen/ramsau_am_dachstein/kaarten" },
    
    // Obertauern
    { name: "Obertauern", region: "Obertauern", lat: 47.2500, lng: 13.5667, pisteKm: 100, skiMapUrl: "https://www.wintersport.nl/skigebieden/obertauern/kaarten" },
    
    // Nassfeld
    { name: "Nassfeld", region: "Nassfeld", lat: 46.5667, lng: 13.2833, pisteKm: 110, skiMapUrl: "https://www.wintersport.nl/skigebieden/nassfeld/kaarten" },
    
    // Montafon
    { name: "Gargellen", region: "Montafon", lat: 46.9667, lng: 9.9167, pisteKm: 40, skiMapUrl: "https://www.wintersport.nl/skigebieden/gargellen/kaarten" },
    { name: "Silvretta Montafon", region: "Montafon", lat: 47.0167, lng: 9.9833, pisteKm: 140, skiMapUrl: "https://www.wintersport.nl/skigebieden/silvrettamontafon/kaarten" },
    { name: "Golm", region: "Montafon", lat: 47.0500, lng: 9.8333, pisteKm: 44, skiMapUrl: "https://www.wintersport.nl/skigebieden/golm/kaarten" },
    { name: "Brandnertal", region: "Montafon", lat: 47.1000, lng: 9.7500, pisteKm: 55, skiMapUrl: "https://www.wintersport.nl/skigebieden/brandnertal/kaarten" },
    
    // Bregenzerwald
    { name: "Damüls-Mellau", region: "Bregenzerwald", lat: 47.2833, lng: 9.8833, pisteKm: 109, skiMapUrl: "https://www.wintersport.nl/skigebieden/damuls/kaarten" },
    { name: "Au-Schoppernau", region: "Bregenzerwald", lat: 47.3333, lng: 10.0667, pisteKm: 40, skiMapUrl: "https://www.wintersport.nl/dorpen/au/kaarten" },
    { name: "Schwarzenberg-Bödele", region: "Bregenzerwald", lat: 47.4167, lng: 9.8500, pisteKm: 12, skiMapUrl: "https://www.wintersport.nl/skigebieden/bregenzerwald/kaarten" }
];


// ===========================
// DATA STORAGE (Firebase/Local)
// ===========================

var visitData = {};
var currentResort = null;


// ===========================
// MARKER COLORS
// ===========================

var visitedColor = '#4caf50';

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
// APP INITIALIZATION (Called after login)
// ===========================

async function initializeApp() {
    showLoading();
    
    try {
        // Load user's visits from Firestore
        await loadVisitsFromFirestore();
        
        // Initialize map if not already done
        if (!mapInitialized) {
            initializeMap();
            mapInitialized = true;
        } else {
            // Update all markers with loaded data
            updateAllMarkers();
        }
        
        // Update UI
        updateList();
        updateTimeline();
        
    } catch (error) {
        console.error('Error initializing app:', error);
        alert('Fout bij laden van gegevens. Probeer het opnieuw.');
    }
    
    hideLoading();
}

// Load visits from Firestore
async function loadVisitsFromFirestore() {
    if (!currentUser) return;
    
    try {
        const snapshot = await db.collection('users').doc(currentUser.uid)
            .collection('visits').get();
        
        visitData = {};
        
        snapshot.forEach(function(doc) {
            const data = doc.data();
            const resortName = data.resortName;
            
            if (!visitData[resortName]) {
                visitData[resortName] = [];
            }
            
            visitData[resortName].push({
                id: doc.id,
                startDate: data.startDate,
                endDate: data.endDate,
                companions: data.companions,
                ratings: data.ratings || {},
                accommodation: data.accommodation || {},
                notes: data.notes || '',
                photos: data.photos || []
            });
        });
        
    } catch (error) {
        console.error('Error loading visits:', error);
        throw error;
    }
}

// Save visit to Firestore
async function saveVisitToFirestore(resortName, visitData) {
    if (!currentUser) return;
    
    const visitRef = db.collection('users').doc(currentUser.uid)
        .collection('visits');
    
    const data = {
        resortName: resortName,
        startDate: visitData.startDate,
        endDate: visitData.endDate,
        companions: visitData.companions,
        ratings: visitData.ratings,
        accommodation: visitData.accommodation,
        notes: visitData.notes,
        photos: visitData.photos || [],
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    if (visitData.id && !visitData.id.startsWith('local_')) {
        // Update existing visit
        await visitRef.doc(visitData.id).update(data);
        return visitData.id;
    } else {
        // Create new visit
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        const docRef = await visitRef.add(data);
        return docRef.id;
    }
}

// Delete visit from Firestore
async function deleteVisitFromFirestore(visitId) {
    if (!currentUser) return;
    
    await db.collection('users').doc(currentUser.uid)
        .collection('visits').doc(visitId).delete();
}


// ===========================
// MAP INITIALIZATION
// ===========================

function initializeMap() {
    map = L.map('map').setView([47.2, 12.0], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    // Draw regions
    skiRegions.forEach(function(region) {
        L.polygon(region.area, {
            color: region.color,
            fillColor: region.color,
            fillOpacity: 0.15,
            weight: 2,
            smoothFactor: 1.5
        }).addTo(map).bindPopup("<b>" + region.name + "</b><br>" + region.info);
        
        var legendHtml = '<div class="legend-item">';
        legendHtml += '<div class="square" style="background-color: ' + region.color + ';"></div>';
        legendHtml += '<span>' + region.name + '</span></div>';
        document.getElementById('region-legend').innerHTML += legendHtml;
    });
    
    // Create markers
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
        bindMarkerPopup(resort.name);
    });
}

function updateAllMarkers() {
    skiResorts.forEach(function(resort) {
        updateMarkerIcon(resort.name);
        updatePopup(resort.name);
    });
}


// ===========================
// HELPER FUNCTIONS
// ===========================

function generateVisitId() {
    return 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}

function formatDateRangeShort(startDate, endDate) {
    if (!startDate) return '';
    var start = formatDate(startDate);
    if (!endDate || endDate === startDate) return start;
    return start + ' t/m ' + formatDate(endDate);
}

function getYear(dateStr) {
    return dateStr ? dateStr.split('-')[0] : '';
}

function getVisitCount(resortName) {
    return visitData[resortName] ? visitData[resortName].length : 0;
}

function getStarsText(count) {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function calculateOverallAverage(ratings) {
    if (!ratings) return 0;
    var values = [];
    allRatingCategories.forEach(function(cat) {
        if (ratings[cat.id] > 0) values.push(ratings[cat.id]);
    });
    if (values.length === 0) return 0;
    var sum = values.reduce(function(a, b) { return a + b; }, 0);
    return (sum / values.length).toFixed(1);
}


// ===========================
// RATING FUNCTIONS
// ===========================

function getRatings() {
    var ratings = {};
    allRatingCategories.forEach(function(cat) {
        var checked = document.querySelector('input[name="rating-' + cat.id + '"]:checked');
        ratings[cat.id] = checked ? parseInt(checked.value) : 0;
    });
    return ratings;
}

function clearRatings() {
    allRatingCategories.forEach(function(cat) {
        var radios = document.querySelectorAll('input[name="rating-' + cat.id + '"]');
        radios.forEach(function(radio) { radio.checked = false; });
    });
}

function getAccommodationType() {
    var checked = document.querySelector('input[name="accommodation-type"]:checked');
    return checked ? checked.value : '';
}

function clearAccommodationType() {
    var radios = document.querySelectorAll('input[name="accommodation-type"]');
    radios.forEach(function(radio) { radio.checked = false; });
}

function getAccommodationUrl() {
    return document.getElementById('accommodation-url').value.trim();
}

function getNotes() {
    return document.getElementById('notes-editor').innerHTML;
}

function clearNotes() {
    document.getElementById('notes-editor').innerHTML = '';
}

function formatText(command) {
    document.execCommand(command, false, null);
}


// ===========================
// TIMELINE
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
            
            var accHtml = '';
            if (visit.accommodation && visit.accommodation.type) {
                var accType = accommodationTypes[visit.accommodation.type];
                if (accType) {
                    accHtml = '<div class="timeline-item-accommodation">' + accType.icon + ' ' + accType.name + '</div>';
                }
            }
            
            var avgRating = calculateOverallAverage(visit.ratings);
            var ratingHtml = '';
            if (avgRating > 0) {
                var fullStars = Math.round(parseFloat(avgRating));
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
    
    var header = document.createElement('h4');
    header.textContent = resort.name;
    popupContent.appendChild(header);
    
    var regionEl = document.createElement('p');
    regionEl.className = 'popup-region';
    regionEl.innerHTML = '📍 ' + resort.region;
    popupContent.appendChild(regionEl);
    
    var pisteEl = document.createElement('p');
    pisteEl.className = 'popup-piste-km';
    pisteEl.innerHTML = '🎿 ' + resort.pisteKm + ' km piste';
    popupContent.appendChild(pisteEl);
    
    var visitsEl = document.createElement('p');
    visitsEl.className = 'popup-visits ' + visitClass;
    visitsEl.textContent = visitText;
    popupContent.appendChild(visitsEl);
    
    var buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'popup-buttons';
    
    var skiMapButton = document.createElement('a');
    skiMapButton.className = 'popup-button ski-map-button';
    skiMapButton.href = resort.skiMapUrl;
    skiMapButton.target = '_blank';
    skiMapButton.innerHTML = '🗺️ Bekijk Pistekaart';
    buttonsDiv.appendChild(skiMapButton);
    
    var manageButton = document.createElement('button');
    manageButton.className = 'popup-button';
    manageButton.textContent = '📅 Bezoeken beheren';
    manageButton.addEventListener('click', function() {
        openModal(resortName);
    });
    buttonsDiv.appendChild(manageButton);
    
    popupContent.appendChild(buttonsDiv);
    
    marker.bindPopup(popupContent, { minWidth: 220 });
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
    
    editingVisitId = null;
    document.getElementById('save-visit-button').textContent = 'Bezoek toevoegen';
    document.getElementById('cancel-edit-button').style.display = 'none';
    
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('visit-start-date').value = today;
    document.getElementById('visit-end-date').value = today;
    document.getElementById('visit-companions').value = '';
    document.getElementById('accommodation-url').value = '';
    clearRatings();
    clearAccommodationType();
    clearNotes();
    pendingPhotos = [];
    updatePhotoPreview();
    
    updateModalVisitList();
    document.getElementById('visit-modal').style.display = 'block';
    if (map) map.closePopup();
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
    
    if (visits.length === 0) {
        listElement.innerHTML = '';
        noVisitsMessage.style.display = 'block';
        return;
    }
    
    noVisitsMessage.style.display = 'none';
    listElement.innerHTML = '';
    
    visits.slice().sort(function(a, b) {
        return new Date(b.startDate) - new Date(a.startDate);
    }).forEach(function(visit) {
        var li = document.createElement('li');
        
        // Date
        var dateDiv = document.createElement('div');
        dateDiv.className = 'visit-date';
        dateDiv.textContent = formatDateRangeShort(visit.startDate, visit.endDate);
        li.appendChild(dateDiv);
        
        // Companions
        if (visit.companions) {
            var companionsDiv = document.createElement('div');
            companionsDiv.className = 'visit-companions';
            companionsDiv.textContent = '👥 ' + visit.companions;
            li.appendChild(companionsDiv);
        }
        
        // Ratings
        if (visit.ratings) {
            var ratingsContainer = document.createElement('div');
            ratingsContainer.className = 'visit-ratings';
            
            allRatingCategories.forEach(function(cat) {
                var value = visit.ratings[cat.id] || 0;
                if (value > 0) {
                    var ratingItem = document.createElement('div');
                    ratingItem.className = 'visit-rating-item';
                    ratingItem.innerHTML = '<span class="rating-name">' + cat.icon + ' ' + cat.name + '</span>' +
                                          '<span class="rating-stars">' + getStarsText(value) + '</span>';
                    ratingsContainer.appendChild(ratingItem);
                }
            });
            
            var avgRating = calculateOverallAverage(visit.ratings);
            if (avgRating > 0) {
                var avgDiv = document.createElement('div');
                avgDiv.className = 'visit-avg-rating';
                avgDiv.innerHTML = '<span class="avg-label">Gemiddelde:</span>' +
                                  '<span class="avg-value">' + getStarsText(Math.round(parseFloat(avgRating))) + ' (' + avgRating + ')</span>';
                ratingsContainer.appendChild(avgDiv);
            }
            
            li.appendChild(ratingsContainer);
        }
        
        // Accommodation
        if (visit.accommodation && visit.accommodation.type) {
            var accDiv = document.createElement('div');
            accDiv.className = 'visit-accommodation';
            
            var accTitle = document.createElement('div');
            accTitle.className = 'visit-accommodation-title';
            accTitle.textContent = '🏨 Accommodatie';
            accDiv.appendChild(accTitle);
            
            var accType = accommodationTypes[visit.accommodation.type];
            if (accType) {
                var typeDiv = document.createElement('div');
                typeDiv.className = 'visit-accommodation-type';
                typeDiv.textContent = accType.icon + ' ' + accType.name;
                accDiv.appendChild(typeDiv);
            }
            
            if (visit.accommodation.url) {
                var linkDiv = document.createElement('div');
                linkDiv.className = 'visit-accommodation-link';
                linkDiv.innerHTML = '<a href="' + visit.accommodation.url + '" target="_blank">🔗 Bekijk accommodatie</a>';
                accDiv.appendChild(linkDiv);
            }
            
            li.appendChild(accDiv);
        }
        
        // Notes
        if (visit.notes) {
            var notesDiv = document.createElement('div');
            notesDiv.className = 'visit-notes';
            
            var notesTitle = document.createElement('div');
            notesTitle.className = 'visit-notes-title';
            notesTitle.textContent = '📝 Notities';
            notesDiv.appendChild(notesTitle);
            
            var notesContent = document.createElement('div');
            notesContent.className = 'visit-notes-content';
            notesContent.innerHTML = visit.notes;
            notesDiv.appendChild(notesContent);
            
            li.appendChild(notesDiv);
        }
        
        // Photos
        if (visit.photos && visit.photos.length > 0) {
            var photosDiv = document.createElement('div');
            photosDiv.className = 'visit-photos';
            
            var photosTitle = document.createElement('div');
            photosTitle.className = 'visit-photos-title';
            photosTitle.textContent = '📷 Foto\'s (' + visit.photos.length + ')';
            photosDiv.appendChild(photosTitle);
            
            var photosGrid = document.createElement('div');
            photosGrid.className = 'visit-photos-grid';
            
            visit.photos.forEach(function(photo) {
                var photoDiv = document.createElement('div');
                photoDiv.className = 'visit-photo';
                photoDiv.innerHTML = '<img src="' + photo + '" alt="Foto" />';
                photoDiv.addEventListener('click', function() {
                    openLightbox(photo);
                });
                photosGrid.appendChild(photoDiv);
            });
            
            photosDiv.appendChild(photosGrid);
            li.appendChild(photosDiv);
        }
        
        // Buttons
        var buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'visit-buttons';
        
        var editButton = document.createElement('button');
        editButton.className = 'edit-visit';
        editButton.textContent = 'Bewerken';
        editButton.addEventListener('click', function() {
            editVisit(visit.id);
        });
        buttonsDiv.appendChild(editButton);
        
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete-visit';
        deleteButton.textContent = 'Verwijderen';
        deleteButton.addEventListener('click', function() {
            removeVisit(visit.id);
        });
        buttonsDiv.appendChild(deleteButton);
        
        li.appendChild(buttonsDiv);
        listElement.appendChild(li);
    });
}


// ===========================
// VISIT MANAGEMENT
// ===========================

async function saveVisit() {
    var startDate = document.getElementById('visit-start-date').value;
    var endDate = document.getElementById('visit-end-date').value || startDate;
    var companions = document.getElementById('visit-companions').value.trim();
    var ratings = getRatings();
    var accommodationType = getAccommodationType();
    var accommodationUrl = getAccommodationUrl();
    var notes = getNotes();
    var photos = pendingPhotos.slice();
    
    if (!startDate) {
        alert('Selecteer een startdatum!');
        return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
        alert('De einddatum kan niet voor de startdatum liggen!');
        return;
    }
    
    var hasSkiRating = skiRatingCategories.some(function(cat) { return ratings[cat.id] > 0; });
    if (!hasSkiRating) {
        alert('Geef minimaal één beoordeling voor het skigebied!');
        return;
    }
    
    if (!accommodationType) {
        alert('Selecteer een type accommodatie!');
        return;
    }
    
    showLoading();
    
    try {
        var visit = {
            id: editingVisitId || generateVisitId(),
            startDate: startDate,
            endDate: endDate,
            companions: companions,
            ratings: ratings,
            accommodation: {
                type: accommodationType,
                url: accommodationUrl
            },
            notes: notes,
            photos: photos
        };
        
        // Save to Firestore
        var savedId = await saveVisitToFirestore(currentResort, visit);
        visit.id = savedId;
        
        // Update local data
        if (!visitData[currentResort]) {
            visitData[currentResort] = [];
        }
        
        if (editingVisitId) {
            var visitIndex = visitData[currentResort].findIndex(function(v) {
                return v.id === editingVisitId;
            });
            if (visitIndex !== -1) {
                visitData[currentResort][visitIndex] = visit;
            }
            editingVisitId = null;
            document.getElementById('save-visit-button').textContent = 'Bezoek toevoegen';
            document.getElementById('cancel-edit-button').style.display = 'none';
        } else {
            visitData[currentResort].push(visit);
        }
        
        updateModalVisitList();
        updateMarkerIcon(currentResort);
        updatePopup(currentResort);
        updateList();
        updateTimeline();
        clearForm();
        
    } catch (error) {
        console.error('Error saving visit:', error);
        alert('Fout bij opslaan. Probeer het opnieuw.');
    }
    
    hideLoading();
}

function editVisit(visitId) {
    var visit = visitData[currentResort].find(function(v) {
        return v.id === visitId;
    });
    
    if (!visit) return;
    
    editingVisitId = visitId;
    document.getElementById('save-visit-button').textContent = 'Wijzigingen opslaan';
    document.getElementById('cancel-edit-button').style.display = 'block';
    
    document.getElementById('visit-start-date').value = visit.startDate;
    document.getElementById('visit-end-date').value = visit.endDate;
    document.getElementById('visit-companions').value = visit.companions || '';
    document.getElementById('accommodation-url').value = visit.accommodation ? visit.accommodation.url || '' : '';
    
    var ratings = visit.ratings || {};
    allRatingCategories.forEach(function(cat) {
        var value = ratings[cat.id] || 0;
        if (value > 0) {
            var radio = document.getElementById(cat.id + '-' + value);
            if (radio) radio.checked = true;
        }
    });
    
    if (visit.accommodation && visit.accommodation.type) {
        var accRadio = document.querySelector('input[name="accommodation-type"][value="' + visit.accommodation.type + '"]');
        if (accRadio) accRadio.checked = true;
    }
    
    document.getElementById('notes-editor').innerHTML = visit.notes || '';
    
    pendingPhotos = visit.photos ? visit.photos.slice() : [];
    updatePhotoPreview();
    
    document.querySelector('.add-visit-section').scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
    editingVisitId = null;
    document.getElementById('save-visit-button').textContent = 'Bezoek toevoegen';
    document.getElementById('cancel-edit-button').style.display = 'none';
    clearForm();
}

function clearForm() {
    document.getElementById('visit-start-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('visit-end-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('visit-companions').value = '';
    document.getElementById('accommodation-url').value = '';
    clearRatings();
    clearAccommodationType();
    clearNotes();
    pendingPhotos = [];
    updatePhotoPreview();
}

async function removeVisit(visitId) {
    if (!confirm('Weet je zeker dat je dit bezoek wilt verwijderen?')) {
        return;
    }
    
    showLoading();
    
    try {
        await deleteVisitFromFirestore(visitId);
        
        visitData[currentResort] = visitData[currentResort].filter(function(v) {
            return v.id !== visitId;
        });
        
        if (visitData[currentResort].length === 0) {
            delete visitData[currentResort];
        }
        
        updateModalVisitList();
        updateMarkerIcon(currentResort);
        updatePopup(currentResort);
        updateList();
        updateTimeline();
        
    } catch (error) {
        console.error('Error deleting visit:', error);
        alert('Fout bij verwijderen. Probeer het opnieuw.');
    }
    
    hideLoading();
}


// ===========================
// PHOTO FUNCTIONS
// ===========================

function handlePhotoUpload(event) {
    var files = event.target.files;
    
    if (pendingPhotos.length + files.length > 5) {
        alert('Je kunt maximaal 5 foto\'s per bezoek toevoegen.');
        return;
    }
    
    for (var i = 0; i < files.length; i++) {
        if (pendingPhotos.length >= 5) break;
        
        var file = files[i];
        if (!file.type.startsWith('image/')) continue;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('Foto "' + file.name + '" is te groot. Max 2MB per foto.');
            continue;
        }
        
        (function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                resizeImage(e.target.result, 800, 800, function(resizedDataUrl) {
                    pendingPhotos.push(resizedDataUrl);
                    updatePhotoPreview();
                });
            };
            reader.readAsDataURL(file);
        })(file);
    }
    
    event.target.value = '';
}

function resizeImage(dataUrl, maxWidth, maxHeight, callback) {
    var img = new Image();
    img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        var width = img.width;
        var height = img.height;
        
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        callback(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = dataUrl;
}

function updatePhotoPreview() {
    var container = document.getElementById('photo-preview-container');
    container.innerHTML = '';
    
    pendingPhotos.forEach(function(photo, index) {
        var div = document.createElement('div');
        div.className = 'photo-preview';
        div.innerHTML = '<img src="' + photo + '" alt="Foto ' + (index + 1) + '" />' +
                       '<button type="button" class="remove-photo" onclick="removePhoto(' + index + ')">×</button>';
        container.appendChild(div);
    });
}

function removePhoto(index) {
    pendingPhotos.splice(index, 1);
    updatePhotoPreview();
}

function openLightbox(photoUrl) {
    var lightbox = document.getElementById('photo-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'photo-lightbox';
        lightbox.className = 'photo-lightbox';
        lightbox.innerHTML = '<span class="photo-lightbox-close" onclick="closeLightbox()">&times;</span>' +
                            '<img src="" alt="Foto" />';
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.body.appendChild(lightbox);
    }
    
    lightbox.querySelector('img').src = photoUrl;
    lightbox.classList.add('active');
}

function closeLightbox() {
    var lightbox = document.getElementById('photo-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// Drag and drop support
document.addEventListener('DOMContentLoaded', function() {
    var uploadArea = document.getElementById('photo-upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            var files = e.dataTransfer.files;
            var input = document.getElementById('photo-input');
            
            var dataTransfer = new DataTransfer();
            for (var i = 0; i < files.length; i++) {
                dataTransfer.items.add(files[i]);
            }
            input.files = dataTransfer.files;
            
            handlePhotoUpload({ target: input, files: files });
        });
    }
});


// ===========================
// MARKER & LIST UPDATES
// ===========================

function updateMarkerIcon(resortName) {
    var visits = visitData[resortName] || [];
    var markerColor = getMarkerColor(resortName);
    markers[resortName].setStyle({
        fillColor: markerColor,
        radius: visits.length > 0 ? 10 : 8
    });
}

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

async function resetAll() {
    if (!confirm('Weet je zeker dat je alle bezoeken wilt verwijderen? Dit kan niet ongedaan worden gemaakt!')) {
        return;
    }
    
    showLoading();
    
    try {
        // Delete all visits from Firestore
        const snapshot = await db.collection('users').doc(currentUser.uid)
            .collection('visits').get();
        
        const batch = db.batch();
        snapshot.docs.forEach(function(doc) {
            batch.delete(doc.ref);
        });
        await batch.commit();
        
        // Clear local data
        visitData = {};
        
        // Update UI
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
        
    } catch (error) {
        console.error('Error resetting data:', error);
        alert('Fout bij verwijderen. Probeer het opnieuw.');
    }
    
    hideLoading();
}
