//console.log(navigator);
// last variable most important
nam = "NAME,SAEPOVALL_PT,SAEPOVALL_MOE,SAEPOVRTALL_MOE,SAEPOVRTALL_PT";
nam2 = "NIC_PT,NUI_PT,NAME";
state = "state:01";
year = "2020";
setNumber = 0;

function setNum(num) {
    if (num == 0 || num == "0") {
        setNumber = 0;
        sessionStorage.setItem("setNumberItem", "0");
    } else if (num == 1 || num == "1") {
        setNumber = 1;
        sessionStorage.setItem("setNumberItem", "1");
        //console.log("Yes1");
    } else if (num == 2 || num == "2") {
        setNumber = 2;
        sessionStorage.setItem("setNumberItem", "2");
        console.log("Yes3");
    }
    document.getElementById("pop").innerHTML = "Okey";
    document.getElementById("rate").innerHTML = "Dokey!";
    document.getElementById("insured").innerHTML = "";
    document.getElementById("pop").removeAttribute("onClick");
    document.getElementById("rate").removeAttribute("onClick");
    document.getElementById("insured").removeAttribute("onClick");
}

//alert("Click, stupid");
//dontUseMe();
sessionStorage.setItem("rateOfTimer", "1000");

let audio = new Audio("sounds/burp.wav");

function setUpPovertyTimeline() {

    //navigator.requestMIDIAccess().then(success, failure);
    //document.getElementById("startTimeline").removeAttribute("onClick");
    let newStateChosen = "state:" + sessionStorage.getItem('stateChosen');
    let i = 1995;
    while(i <= 2019) {
        //povertyCallValue(nam, newStateChosen, "" + i);
        setTimeout(function(){ povertyCallValue(nam, newStateChosen, "" + i); }, parseInt(sessionStorage.getItem("rateOfTimer")));
        i++;
    }
}


function timer() {
    document.getElementById("startTimeline").removeAttribute("onClick");
    document.getElementById("startTimeline").innerHTML = "Timeline Started!";
    setTimeout(function(){
        timer();
        changeYear();
    }, parseInt(sessionStorage.getItem("rateOfTimer")));
}

function timer2() {
    document.getElementById("startTimeline").removeAttribute("onClick");
    document.getElementById("startTimeline").innerHTML = "Timeline Started!";
    setTimeout(function(){
        timer();
        changeYear2();
    }, parseInt(sessionStorage.getItem("rateOfTimer")));
}

function changeYear2(){
    value = parseInt(sessionStorage.getItem("currYear"));
    //let newStateChosen = "state:" + sessionStorage.getItem('stateChosen');
    if (value < 2020) {
        let newStateChosen = "state:" + sessionStorage.getItem('stateChosen');
        newValue = "Current year: " + (value + 1);
        document.getElementById("timerVal").innerHTML = newValue;
        sessionStorage.setItem("currYear", value + 1);
        povertyCallValue(nam, newStateChosen, "" + (value + 1));
    } else {
        document.getElementById("startTimeline").innerHTML = "[Previous page]";
        document.getElementById("startTimeline").setAttribute("onClick", "prevPage();");
    }
}

function changeYear(){
    value = parseInt(sessionStorage.getItem("currYear"));
    //let newStateChosen = "state:" + sessionStorage.getItem('stateChosen');
    if (value < 2020) {
        let newStateChosen = "state:" + sessionStorage.getItem('stateChosen');
        newValue = "Current year: " + (value + 1);
        document.getElementById("timerVal").innerHTML = newValue;
        sessionStorage.setItem("currYear", value + 1);
        povertyCallValue(nam, newStateChosen, "" + (value + 1));
    } else {
        document.getElementById("startTimeline").innerHTML = "[Previous page]";
        document.getElementById("startTimeline").setAttribute("onClick", "prevPage();");
    }
}

function prevPage() {
    window.location.href = "index.html";
}


    function getState(stateNum) {
        stateNum = "state:" + stateNum;
        $.ajax({
            // CALL SETTINGS & PARAMS
            type: "GET",
            // GET POST PUT DELETE
            dataType: "json",
            url: `https://api.census.gov/data/timeseries/poverty/saipe?get=${nam}&for=${stateNum}&YEAR=${year}`,
            // url: "http://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEPOVALL_PT,SAEPOVALL_MOE,SAEPOVRTALL_MOE,SAEPOVRTALL_PT&for=state:01&YEAR=2020",
            async: false,
            crossDomain: true,

            // What to do when the call finishes
            complete: function (data) {
                if (data.readyState === 4 && data.status === 200) {
                    sessionStorage.setItem("stateName", data.responseJSON[1][0]);
                    console.log(sessionStorage.getItem("stateName"));
                }
                
            }
        });
    }

// povertyCallValue(nam, state, year);
    function povertyCallValue(nam, state, year) {
        $.ajax({
            // CALL SETTINGS & PARAMS
            type: "GET",
            // GET POST PUT DELETE
            dataType: "json",
            url: `https://api.census.gov/data/timeseries/poverty/saipe?get=${nam}&for=${state}&YEAR=${year}`,
            // url: "http://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEPOVALL_PT,SAEPOVALL_MOE,SAEPOVRTALL_MOE,SAEPOVRTALL_PT&for=state:01&YEAR=2020",
            async: false,
            crossDomain: true,

            // What to do when the call finishes
            complete: function (data) {
                if (data.readyState === 4 && data.status === 200) {
                    console.log(data);
                    console.log(data.responseJSON[1][4]);
                    console.log(data.responseJSON[1][1]);
                    if (sessionStorage.getItem("setNumberItem") == "0" ||  sessionStorage.getItem("setNumberItem") == 0) {
                        if (parseInt(data.responseJSON[1][1]) < 750000) {
                            //var audio2 = new Audio("sounds/yay.wav");
                            clearAll();
                            rageFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][1]) >= 2000000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            joyfullFace();
                        } else if (parseInt(data.responseJSON[1][1]) >= 1750000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            happyFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][1]) >= 1500000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            interestedFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][1]) >= 1250000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            neutralFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][1]) >= 1000000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            sadFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][1]) >= 750000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            angryFace();
                        }
                    } else if (sessionStorage.getItem("setNumberItem") == "1" ||  sessionStorage.getItem("setNumberItem") == 1) {
                        console.log("Yes2");
                        if (parseInt(data.responseJSON[1][4]) < 5) {
                            //var audio2 = new Audio("sounds/yay.wav");
                            clearAll();
                            rageFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][4]) >= 17.5) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            joyfullFace();
                        } else if (parseInt(data.responseJSON[1][4]) >= 15) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            happyFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][4]) >= 12.5) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            interestedFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][4]) >= 10) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            neutralFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][4]) >= 7.5) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            sadFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][4]) >= 5) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            angryFace();
                        }
                    }
                } else {
                    //console.log("WHAT?!");
                }
                
            }
        });
    }

    function healthInsuranceCallValue(nam2, state, year) {
        $.ajax({
            // CALL SETTINGS & PARAMS
            type: "GET",
            // GET POST PUT DELETE
            dataType: "json",
            url: `https://api.census.gov/data/timeseries/healthins/sahie?get=${nam2}&for=${state}&time=${year}`,
            async: false,
            crossDomain: true,

            // What to do when the call finishes
            complete: function (data) {
                if (data.readyState === 4 && data.status === 200) {
                   
                        if (parseInt(data.responseJSON[1][0]) < 750000) {
                            //var audio2 = new Audio("sounds/yay.wav");
                            clearAll();
                            rageFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][0]) >= 2000000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            joyfullFace();
                        } else if (parseInt(data.responseJSON[1][0]) >= 1750000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            happyFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][0]) >= 1500000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            interestedFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][0]) >= 1250000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            neutralFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][0]) >= 1000000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            sadFace();
                            //audio2.play();
                        } else if (parseInt(data.responseJSON[1][0]) >= 750000) {
                            //var audio2 = new Audio("sounds/sadLegoSound.wav");
                            clearAll();
                            angryFace();
                        }
                } else {
                    //console.log("WHAT?!");
                }
                
            }
        });
    }

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
    //console.log("navigator");
}

function failure() {
    console.log("Could not connect MIDI");
}


function updateDevices(event) {
    //console.log(event);
    //console.log("event occurred");
}


// input => send info to browser
// output => send info to MIDI

function success(midiAccess) {
    // console.log(midiAccess);

    midiAccess.addEventListener("statechange", updateDevices);
    const inputs = midiAccess.inputs;
    //console.log(inputs);
    //console.log("success");
    
    for (var output of midiAccess.outputs.values()) {
        //console.log("o");
        device = output;
        //console.log('Output device selected', device);
    }

    inputs.forEach((input) => {
        //console.log("i");
        console.log(input);
        input.addEventListener("midimessage", handleInput);
    })
}


function colorKeys(key, clr) {
    device && device.send([0x90, key, clr]);
}

function clearAll() {
    for (let i = 0; i < 100; i++) {
        colorKeys(i, 0);
    }
}

function colorAll() {
    for (let i = 0; i < 100; i++) {
        colorKeys(i, i);
    }
}

function handleInput(input) {
    //console.log("input received");
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    //console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);

    switch(command) {
        case 144:
        if (velocity > 0) {
            noteOn(note);
        } else {
            noteOff(note);
        }
        break;
    }
}

function noteOn(note) {
    let p5_ = new p5();

    console.log(`note:${note} //on`);
    if (note == 36) {
        //b = 5;
        clearAll();
        joyfullFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 37) {
        //b = 5;
        clearAll();
        happyFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
        /*
        state = "state:0" + Math.round(p5_.map(note, 36, 99, 1, 50));
        year = "" + Math.round(p5_.map(note, 36, 99, 1995, 2020));
        povertyCallValue(nam, state, year);
        */
    }

    if (note == 38) {
        //b = 5;
        clearAll();
        interestedFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 39) {
        //b = 5;
        clearAll();
        neutralFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 68) {
        //b = 5;
        clearAll();
        sadFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 69) {
        //b = 5;
        clearAll();
        angryFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 70) {
        //b = 5;
        clearAll();
        rageFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 71) {
        //b = 5;
        clearAll();
        weirdFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 36) {
        //b = 5;
        clearAll();
        joyfullFace();
        //document.getElementById('testelm').style.backgroundColor = `rgba(0,0,${b},1)`;
    }
}

function dontUseMe() {
    api_key = "fe6599f6f2371b8644e7ccd6ee4d211259986d884f4867135c5af7e061c061ec";
    search = "Fries";
    $.ajax({
        // CALL SETTINGS & PARAMS
        type: "GET",
        // GET POST PUT DELETE
        dataType: "json",
        url: `https://serpapi.com/search.json?q=${search}&tbm=isch&ijn=0&api_key=${api_key}`,
        // url: "http://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEPOVALL_PT,SAEPOVALL_MOE,SAEPOVRTALL_MOE,SAEPOVRTALL_PT&for=state:01&YEAR=2020",
        async: false,
        crossDomain: true,
        //headers: { 'Access-Control-Allow-Origin: '},

        // What to do when the call finishes
        complete: function (data) {
            if (data.readyState === 4 && data.status === 200) {
                console.log(data);
            }
            
            if (Integer.parseInt(data.responseJSON.Array(1).Array(1)) < 10000) {
                var audio2 = new Audio(sounds/yay.wav);
                audio2.play();
            }
            
        }
    })

}

function noteOff(note) {
    console.log(`note:${note} //off`);
    if (note == 99) {
        audiopause();

        document.getElementById("testelm").innerHTML = "Back to Normal";
    }

    if (note == 84) {
        //b = 255;
        document.getElementById('testelm').style.backgroundColor = `rgba(255,255,255,1)`;
    }

    if (note == 96) {
        b = 10;
        document.getElementById("testelm").innerHTML = "Note 96 is OFF";
    }
}

function audioplay() {
    // var audio = new Audio("testing.mp3");
    audio.play();
}

function audiopause() {
    audio.pause();
}

console.log(window);

