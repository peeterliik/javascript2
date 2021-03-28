(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds()-1;
            if (s===-1){
                s=59;
            }
            
            if (s===59){
                m-=1;
            }
            
            let ampm = "EL";

            if (h > 12) {
                h = h - 12;
                ampm = "PL";
            } else if (h === 0) {
                h = 12;
            }



            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            



            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function isNumeric(n) {
        return !isNan(parseFloat(n)) && isFinite
    }

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let aeg1 = document.getElementById("aeg1").checked;
        let aeg2 = document.getElementById("aeg2").checked;
        let aeg3 = document.getElementById("aeg3").checked;
        let aeg4 = document.getElementById("aeg4").checked;
        
        if (eesnimi.value === "" || perenimi.value === "") {
            alert("Palun sisestage ees- ja perenimi");
            eesnimi.focus();
            perenimi.focus();
            console.log(aeg1);
            return;
        }
        else if (aeg1===false && aeg2===false && aeg3===false && aeg4===false){
            alert("Palun valige, kui kaua olete valmis saadetist ootama");
            return;
        }
        
        else if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        } else if (linn.value === "tln") {

            e.innerHTML = "0,00 &euro;";

        } else if (linn.value === "trt") {

            e.innerHTML = "2,50 &euro;";

        } else if (linn.value === "nrv") {

            e.innerHTML = "2,50 &euro;";

        } else if (linn.value === "prn") {

            e.innerHTML = "3,00 &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    
    let teineAsukoht=new Microsoft.Maps.Location(
        58.26540,
        26.46586
    );
    
    let kolmasAsukoht=new Microsoft.Maps.Location(
        58.31057,
        26.59987
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: kolmasAsukoht,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(teineAsukoht, {
        title: 'Tõravere',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    
    let infobox=new Microsoft.Maps.Infobox(centerPoint,{title:'Tartu Ülikool', description: 'Alma mater', visible: false});
    infobox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin1, 'click',function(){
        infobox.setOptions({visible:true});
    });
    
     let infobox1=new Microsoft.Maps.Infobox(teineAsukoht,{title:'Tõravere Observatoorium', description: 'Koduke', visible: false});
    infobox1.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin, 'click',function(){
        infobox1.setOptions({visible:true});
    });
    
    
    
    

    map.entities.push(pushpin);
    map.entities.push(pushpin1);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
