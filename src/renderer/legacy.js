'use strict';

// interface
let gridSizeText = document.getElementById("gridSizeBlock"),
    gridOpacity = [0.25, 1]
;

function setTimer(seconds) {
    let gridTimer;
    clearTimeout(gridTimer);
    gridTimer = setTimeout(()=>{
        gridSizeText.style.opacity = gridOpacity[0];
        gridSizeText.style.padding = "var(--m) 0;";
    }, seconds*1000);
}

setTimer(12);
gridSizeText.addEventListener("mouseover", ()=>{
    gridSizeText.style.opacity = gridOpacity[1];
    gridSizeText.style.padding = "var(--mm) calc(var(--mm)*1) var(--mm) calc(var(--mm)*1)";
    setTimer(8);
});