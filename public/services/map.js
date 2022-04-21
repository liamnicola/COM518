const map = L.map("map");
const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{ attribution: attrib }).addTo(map);

map.setView([50.9105, 1.4049], 7);
async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/acc/location/${location}`);
    const accommodations = await ajaxResponse.json();
    let html = "";

    map.setView([accommodations[0].latitude, accommodations[0].longitude], 7);
    accommodations.forEach((accommodation,index) => {
        L.marker([accommodation.latitude, accommodation.longitude]).addTo(map)
        const point = L.marker([accommodation.latitude, accommodation.longitude]).addTo(map)
        const text = `Name ${accommodation.name}`;
        point.bindPopup(text);
    });
}