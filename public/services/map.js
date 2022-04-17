const map = L.map("1");
const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

const tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }
).addTo(map);

map.setView([40.75, -74], 14);