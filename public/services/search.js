document.getElementById("ptsSearch").addEventListener("click", e=> {
    const location = document.getElementById("ptsLocation").value;
    ajaxSearch(location);
});

async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/accom/location/${location}`);
    const accommodations = await ajaxResponse.json();
    
    document.getElementById("ptsResults").innerHTML="";

    accommodations.forEach(accommodation => {
        const p = document.createElement("p");
        const text = document.createTextNode(`${accommodation.name}, ${accommodation.type}, ${accommodation.location}`);
        const book = document.createElement("input")
        
        p.appendChild(text);
        book.setAttribute("type", "button")
        book.setAttribute("value", "book")

        book.addEventListener("click", async(e) => {
			const ajaxResponse2 = await fetch(`/accom/booking/:accID/:npeople/:thedate`, {
				method: 'POST'
			});
			//if http code is 200 it worked if not display error
			if(ajaxResponse2.status == 200) {
				alert('Accommodation Booked!');
			}
			else {
				const json = await response.json();
				alert('Error');
			}
		});

        document.getElementById("ptsResults").appendChild(p);
        document.getElementById("ptsResults").appendChild(book);
    });
}