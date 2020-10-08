var $slider = $("#slider");
var $fill = $(".bar .fill");

function setBar() {
    $fill.css("width", $slider.val() / 10 + "%");
}

$slider.on("input", setBar);

setBar();

var controlBox = document.getElementsByClassName("control-box")[0];
var volumeControl = controlBox.querySelector(".volume-control");
var volumeInput = volumeControl.querySelector("input[type=range]");

function setBars() {
    var volume = parseInt(volumeInput.value);
    volumeControl.className = "volume-control";

    if (volume > 0) {
        controlBox.classList.add("volume-on");
        volumeControl.classList.add("volume-" + volume);
    } else {

        controlBox.classList.remove("volume-on");
    }
    if (volume < 70) {
        $('#volume').html(`<svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 25 25"><path fill="#333" d="M4 9h4.002L12 5v14c-2.446-2.667-3.778-4-3.998-4H4V9zm10 4a1 1 0 0 0 0-2V9a3 3 0 0 1 0 6v-2z"/></svg>`)
    } else {
        $('#volume').html(`<svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 25 25"><path fill="#333" d="M4 9h4.002L12 5v14c-2.446-2.667-3.778-4-3.998-4H4V9zm10 4a1 1 0 0 0 0-2V9a3 3 0 0 1 0 6v-2zm0 4a5 5 0 0 0 0-10V5a7 7 0 0 1 0 14v-2z"/></svg>`)
    }
    if (volume == 0) {
        $('#volume').html(`<svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 25 25"><path fill="#333" d="M18 10.584l-2.293-2.291-1.414 1.414 2.293 2.291-2.291 2.291 1.414 1.415 2.292-2.292 2.294 2.292 1.414-1.415-2.293-2.291 2.291-2.29-1.414-1.415-2.292 2.291zM4 9h4.002L12 5v14c-2.446-2.667-3.778-4-3.998-4H4V9z"/></svg>`)
    }
}

volumeInput.addEventListener("input", setBars);
setBars();