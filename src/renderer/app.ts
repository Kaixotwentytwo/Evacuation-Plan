// Импорты
import './css/variables.css';
import './css/main.css';
import { interfaceElements } from './config/lang';
import { Canvas, TEvent } from 'fabric';
import { OutWall } from './classes/obstacles/OutWall';
import { InWall } from './classes/obstacles/InWall';
import { Icon } from './classes/obstacles/Icon';
import { Saving } from './classes/behavior/Saving';
import { grid } from './classes/behavior/Grid';
import { GOSTColors } from './config/theme';
import { resizeCanvas, updateProperty, canvas } from './classes/behavior/CanvasBehavior';
import { Keybind } from './classes/behavior/Keybinds';
import { PDF } from './classes/interface/Pdf';
// import { iconsMap } from "./config/icons";
import { Variables } from './config/Variables';
let config = new Variables({
    showCoordinates: true,
    devMode: true,
})

// Расширяем модуль fabric
declare module 'fabric' {
  interface CanvasEvents {
    // Указываем имя события и тип данных, которые оно передает
    'app:zoom:changed': Partial<TEvent> & { zoom: number };
    'app:grid:changed': Partial<TEvent> & { gridSize: number };
  }
}

// ========== ИНИЦИАЛИЗАЦИЯ CANVAS ==========
// export const canvas = new Canvas('fabricCanvas', {backgroundColor: 'transparent'});
// window.canvas = canvas;

// global
declare global {
    interface Window {

        canvas: Canvas;

        // saving
        exportPNG: typeof Saving.exportPNG;
        exportJPG: typeof Saving.exportJPG;
        exportSVG: typeof Saving.exportSVG;
        exportJSON: typeof Saving.exportJSON;
        loadJSON: typeof Saving.loadJSON;
        loadFile: typeof Saving.loadFile;

        // grid
        mmToPx: typeof grid.mmToPx;
        pxToMm: typeof grid.pxToMm;
        changeGridSize: typeof grid.changeGridSize;
        updateSvgGrid: typeof grid.updateSvgGrid;
        switchSnapToGridMove: typeof grid.switchSnapToGridMove;
        switchSnapToGridSize: typeof grid.switchSnapToGridSize;
    }
}

// global
(()=>{
    window.switchSnapToGridMove = grid.switchSnapToGridMove;
    window.switchSnapToGridSize = grid.switchSnapToGridSize;
    window.changeGridSize = grid.changeGridSize;
    window.exportPNG = (canvas) => Saving.exportPNG(canvas);
    window.exportJPG = (canvas, quality) => Saving.exportJPG(canvas, quality);
    window.exportJSON = (canvas) => Saving.exportJSON(canvas);
    window.loadJSON = (canvas) => Saving.loadJSON(canvas);
    window.exportSVG = (canvasInstance) => Saving.exportSVG(canvasInstance);
    window.loadFile = (e, canvas) => Saving.loadFile(e, canvas);
    window.mmToPx = grid.mmToPx;
    window.pxToMm = grid.pxToMm;
})();

// interface
const IE = interfaceElements;
const gridTextElement = document.getElementById("gridText");
const outWallHeightText = document.getElementById("wallHeightmm");

// start grid
// grid.changeGridSize(canvas, "2mm", gridTextElement??new Element, config.language);
grid.changeGridSize(canvas, "2mm");

// INTERFACE ADDEVENTLISTENERS
(function(){

    const outWallClar = document.getElementById("clarificationPopup") as HTMLDivElement;
    if (config.language==='ru' && outWallClar) outWallClar.innerHTML = IE.clarification_wall[0];
    if (config.language==='en' && outWallClar) outWallClar.innerHTML = IE.clarification_wall[1];

    // grid buttons
    document.getElementById("gridSizeButtonLeft")?.
        addEventListener("click", ()=>{grid.changeGridSize(canvas, "down");});
    document.getElementById("gridSizeButtonRight")?.
        addEventListener("click", ()=>{grid.changeGridSize(canvas, "up");});

    // buttons that spawns elements
    document.getElementById("outWalls")?.addEventListener("click", () => {
        const rect = new OutWall({ left: Keybind.mouseLastPos.x+50, top: Keybind.mouseLastPos.y+100, height: OutWall.height??grid.mmToPx(3)});
        canvas.add(rect);
        canvas.renderAll();
    });

    // inwalls
    document.getElementById("inWalls")?.addEventListener("click", ()=>{
        canvas.add(new InWall({ left: Keybind.mouseLastPos.x+50, top: Keybind.mouseLastPos.y+100, height: InWall.height??grid.mmToPx(3)}));
    });

    // Обработчик для вашей кнопки
    document.getElementById("icon")?.addEventListener("click", () => {
        const myIcon = new Icon({
            left: 200,
            top: 200,
            code: 'W09',
            imageURL: '../../assets/svg/Warning/w09.svg'
        });

        canvas.add(myIcon);
        canvas.setActiveObject(myIcon);
        canvas.requestRenderAll();
    });


    // wall size
    document.getElementById("outWallHeightRange")?.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        let local_value = Number(target.value);

        const currentMmValue = grid.mmToPx(local_value);
        let formattedValue = Number(target.value).toFixed(1);
        const warnIcon = document.getElementById("wallThickWarn") as HTMLImageElement;

        if (local_value > 3 && outWallHeightText) {
            outWallHeightText.style.color = 'var(--text-color)';
            warnIcon.style.opacity = "0";
            warnIcon.style.visibility = 'hidden';
        }
        if (local_value < 3 && outWallHeightText && warnIcon) {
            outWallHeightText.style.color = GOSTColors.yellow.hex;
            warnIcon.style.opacity = "1";
            warnIcon.style.visibility = 'visible';
        }

        let local_text = '';
        if (local_value < 10) {local_text = '<span style="opacity:0.3">0</span>';}

        if (config.language === "ru" && outWallHeightText) {outWallHeightText.innerHTML = `${local_text}${formattedValue}мм`;}
        if (config.language === "en" && outWallHeightText) {outWallHeightText.innerText = `${local_text}${formattedValue}mm`;}
        
        updateProperty('height', currentMmValue, "OutWall", true);
        OutWall.height = currentMmValue;
    });
    updateProperty('height', OutWall.height, "OutWall", true);
})();

// отображение сетки
const svgGrid = document.getElementById('grid-svg');
const canvasContainer = document.querySelector('.canvas-container') as HTMLElement;
if (svgGrid && canvasContainer) {
  canvasContainer.style.position = 'relative';
  svgGrid.style.position = 'absolute';
  svgGrid.style.top = '0';
  svgGrid.style.left = '0';
  svgGrid.style.zIndex = '-1';
  const lowerCanvas = canvas.lowerCanvasEl;
  const upperCanvas = canvas.upperCanvasEl;
  if (lowerCanvas) lowerCanvas.style.zIndex = '1';
  if (upperCanvas) upperCanvas.style.zIndex = '2';
  canvasContainer.insertBefore(svgGrid, canvasContainer.firstChild);
}

// dev things
(()=>{
    if (config.devMode && config.showCoordinates) {
        const debugEl = document.createElement('div');
        debugEl.style.cssText = 'position:absolute;top:0;left:0;color:red;background:white;font:12px monospace;padding:4px;pointer-events:none;z-index:9999';
        document.body.appendChild(debugEl);

        let local_zoom = 1.00;
        canvas.on("app:zoom:changed", (opt)=>{local_zoom = opt.zoom/100})

        canvas.on('mouse:move', (opt) => {
            // console.log(local_zoom);
            const e = opt.e as MouseEvent;
            const p = canvas.getScenePoint(e);
            debugEl.textContent = `x=${p.x.toFixed(2)}, y=${p.y.toFixed(2)}, z=${local_zoom??1.00}`;
        });
    }
})();

// open popup on click
// outer wall advice
document?.getElementById('wallClarification')?.
addEventListener('click', async ()=>{
    let text = new PDF({
        firstPopup_Title: "Справка",
        openPDFButtonText: 'Открыть PDF',
        cancelPDFButtonText: 'Закрыть',
        popupIcon: PDF.icons.info,
        documentName: "34428-2018 9.3.9.8",
        firstPopup_HTML: IE.GOST_34428_2018_Hint
    });
    if (text) {
        // await PDF.openPopupSequence(interfaceElements.GOST_34428_2018_Hint, text);
        await text.openPopupSequence()
    }
});

// first time & all the time, window is resized
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

export { canvas };
