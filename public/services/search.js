document.getElementById("ptsSearch").addEventListener("click", e=> {
    const location = document.getElementById("ptsLocation").value;
    ajaxSearch(location);
});

async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`http://localhost:3000/accom/location/${location}`);
    const accommodations = await ajaxResponse.json();

    document.getElementById("ptsResults").innerHTML="";

    accommodations.forEach(accommodation => {
        const p = document.createElement("p");
        const text = document.createTextNode(`${accommodation.name}, ${accommodation.type}, ${accommodation.location}`);
    
        p.appendChild(text);

        document.getElementById("ptsResults").appendChild(p);
    });
}