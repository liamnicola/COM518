document.getElementById("ptsSearch").addEventListener("click", e=> {
    const location = document.getElementById("ptsLocation").value;
    ajaxSearch(location);
});



async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/acc/location/${location}`);
    const accommodations = await ajaxResponse.json();
    let html = "";


    accommodations.forEach(accommodation => {
        html += `
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Location</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${accommodation.name}</td>
                <td>${accommodation.type}</td>
                <td>${accommodation.location}</td>
                <td><button type="button" onclick="booking(${accommodation.ID})" id="bookButton">Book</button></td>
            </tr>
        </tbody>`;

        document.getElementById("ptsResults").innerHTML = html;
    });
}

async function booking(accID){
    const npeople = "1";
    const thedate = "220601";
    const accBooking = {
        accID: accID,
        thedate: thedate,
        npeople: npeople
    };

    const avReq = await fetch(`/acc/availability/${accID}/${thedate}`);
    const avRes = await avReq.json();

        if(avRes.length > 0) {
            const avNum = avRes[0].availability
            if(avNum < npeople){
                alert("There is no space for this date")
            } else {
                const booking = await fetch(`/acc/booking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(accBooking)
                });

                const accID = await booking.json();
                if(booking.status==400) {
                    alert("error")
                } else {alert("Booked")};
            }
        }
}
