// all things related to zoom, like text, <input> and stuff

import { canvas } from "../behavior/CanvasBehavior";
import { interfaceElements } from "../../config/lang";
import { Variables } from "../../config/Variables";
const IE = interfaceElements;
const config = new Variables({language: 'ru'});

const zoomText = document.getElementById("zoomBlockText");
canvas.on("app:zoom:changed", (options) => {
    if (zoomText) {
        if (config.language === 'ru') zoomText.innerText = `${IE.zoomText[0]} ${options.zoom}%`;
        if (config.language === 'en') zoomText.innerText = `${IE.zoomText[1]} ${options.zoom}%`;
    }

    // when zoom block actually becomes an <input> it'll be useful
    // const input = document.getElementById("zoomInput") as HTMLInputElement;
    // if (input) {input.value = `${nextZoom}`}
});

// zoom <input> block
// document.getElementById("zoomInput")?.addEventListener("input", (e)=>{
//     const input = e.target as HTMLInputElement;
//     const value = Number(input.value);
//     if (zoomText) {
//         if (language=='ru') {zoomText.innerText = `${IE.zoomText[0]} ${(value*100).toFixed(0)}%`;}
//         if (language=='en') {zoomText.innerText = `${IE.zoomText[1]} ${(value*100).toFixed(0)}%`;}
//     }
//     grid.setCanvasZoom(canvas, value, lastMouseViewportPoint);
// });