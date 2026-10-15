// all the actions that happening on canvas handlers and events

import { TOriginX, TOriginY, Point, FabricObject, Canvas } from "fabric";
import { grid } from "./Grid";
import { Keybind } from "./Keybinds";
import { Variables } from "../../config/Variables";

const supportKeys = {
    Ctrl: Keybind.ctrl,
    Alt: Keybind.alt,
    Shift: Keybind.shift,
}

const config = new Variables({minAngle: 1, baseSnapAngle: 15})
export const canvas = new Canvas('fabricCanvas', {backgroundColor: 'transparent'});
const snapToGridKey = supportKeys.Alt;

declare global {
    interface Window {
        fabricCanvas: Canvas;
    }
}
window.fabricCanvas = canvas;

// удаление объектов (очевидно)
export function deleteCanvasObject(fabricObject: any) {
    if (fabricObject) {
        // если выделено множество элементов
        if (fabricObject.type.toLowerCase() === 'activeselection') {
            const selection = fabricObject as any;
            
            // Получаем массив оригинальных объектов
            const objectsToDelete = selection.getObjects(); 

            // сначала сбрасываем выделение, чтобы вернуть объекты на холст
            canvas.discardActiveObject(); 

            // Удаляем весь массив объектов методом
            canvas.remove(...objectsToDelete); 
        } else {
            // Если выделен всего один объект
            canvas.discardActiveObject();
            canvas.remove(fabricObject);
        }
        canvas.requestRenderAll(); 
    }
}

// Обновляет значение объектам канваса
export function updateProperty(
    key: string, 
    value: any, 
    target?: any, 
    update: boolean = false, // обновление поля
    ): void {
    // Список объектов для обновления
    let objectsToUpdate: FabricObject[] = [];

    let targetType: 'classString' | 'specificObject' | 'all' = 'all';

    if (typeof target === 'string') {
    targetType = target.toLowerCase() === 'all' ? 'all' : 'classString';
    } else if (target instanceof FabricObject) {
    targetType = 'specificObject';
    }

    // Логика фильтрации объектов на основе targetType
    switch (targetType) {
    case 'classString': {
        // 1. Если передана строка название класса
        const classNameLower = (target as string).toLowerCase();
        
        objectsToUpdate = canvas.getObjects().filter(obj => {
            const typeMatch = obj.type && obj.type.toLowerCase() === classNameLower;
            const constructorMatch = obj.constructor && obj.constructor.name.toLowerCase() === classNameLower;
            const isWallMatch = classNameLower === 'outwall' && (obj as any).isWall === true;

            return typeMatch || constructorMatch || isWallMatch;
        });
        break;
    }

    case 'specificObject':
        objectsToUpdate = [target as FabricObject];
        break;

    case 'all':
    default:
        objectsToUpdate = canvas.getObjects();
        break;
    }

    // Обновляем свойства у отфильтрованных объектов
    objectsToUpdate.forEach(obj => {
    if (key in obj) {
        obj.set(key as any, value);

        if (key === 'width' || key === 'height') {
        obj.set({ scaleX: 1, scaleY: 1 });
        obj.setCoords();
        }
    }
    });

    // Запрашиваем рендер, если передан флаг update
    if (update===true) {
    canvas.requestRenderAll();
    }
}

// Подстраивание под размер окна
// переделать потом чтобы оно не имело отношения к интерфейсу
export function resizeCanvas() {
    let local_width = document.querySelector("#properties")?.clientWidth;
    // height is not used cuz prop-block is 100vh
    // let local_height = document.querySelector("#properties")?.clientHeight;
    local_width = local_width ?? 0;
    canvas.setDimensions({
        width: window.innerWidth - local_width,
        height: window.innerHeight
    });

    // notification center
    // document.querySelectorAll(".notification").forEach(n=>{
    //     // n.style.setProperty("--own-width", `${n.clientWidth}px`);
    //     // n.style.setProperty("--own-height", `${n.clientHeight}px`);
    //     // n.style.setProperty("--screen-width", `${window.innerWidth}px`);
    //     // n.style.setProperty("--screen-height", `${window.outerHeight}px`);
    //     // n.style.setProperty("--left", `${window.innerWidth / 2 - n.clientWidth / 2}px`);
    //     // n.style.setProperty("--top", `${window.innerHeight / 2 - n.clientHeight / 2}px`);
    // });
    
    canvas.requestRenderAll(); 
}

// зажатие скм
canvas.on('mouse:down', (opt) => {
    const event = opt.e;
    
    // Безопасно проверяем, что это событие мыши и нажато именно колесико
    if (event instanceof MouseEvent && event.button === 1) {
        grid.isDragging = true;
        canvas.selection = false;
        
        canvas.defaultCursor = 'grabbing'; 
        canvas.setCursor(canvas.defaultCursor);
        const pointer = canvas.getViewportPoint(event);
        grid.lastPosX = pointer.x;
        grid.lastPosY = pointer.y;
    }
});

// при отпуске cкм возращается выделение объектов 
canvas.on('mouse:up', () => {
    if (grid.isDragging) {
        grid.isDragging = false;
        canvas.selection = true;
        canvas.defaultCursor = 'default'; 
        canvas.setCursor(canvas.defaultCursor);
        canvas.requestRenderAll();
    }
});

// при движении мыши и зажатой cкм
canvas.on('mouse:move', (opt) => {
    const event = opt.e;
    
    // Получаем точку относительно окна просмотра (экрана)
    const viewportPointer = canvas.getViewportPoint(event);
    const scenePointer = canvas.getScenePoint(event);
    Keybind.mouseLastPos = scenePointer; 
    
    // если мы не двигаемся по полю то зачем всё это
    if (!grid.isDragging) return;
    
    // Считаем разницу в экранных координатах для панорамирования
    const deltaX = viewportPointer.x - grid.lastPosX;
    const deltaY = viewportPointer.y - grid.lastPosY;
    
    // Двигаем холст
    grid.panCanvas(canvas, deltaX, deltaY);
    
    // Обновляем последнюю позицию (для панорамирования используем экранные)
    grid.lastPosX = viewportPointer.x;
    grid.lastPosY = viewportPointer.y;
});

// зум на колесо
canvas.on('mouse:wheel', (opt) => {
    const event = opt.e;
    
    // 1. Прокрутка ВВЕРХ / ВНИЗ (Shift)
    if (Keybind.shift) {
        event.preventDefault();
        grid.panCanvas(canvas, 0, event.deltaY > 0 ? -1 * grid.keyboardPanStep : grid.keyboardPanStep);
        return;
    }
    
    // 2. Прокрутка ВЛЕВО / ВПРАВО (Ctrl)
    if (Keybind.ctrl) {
        event.preventDefault();
        grid.panCanvas(canvas, event.deltaY > 0 ? -1 * grid.keyboardPanStep : grid.keyboardPanStep, 0);
        return;
    }
    
    event.preventDefault();

    // 3. ЗУМ ШАГАМИ (Без модификаторов)
    const currentZoom = canvas.getZoom();
    
    // Ищем индекс текущего зума в массиве шагов (или находим самый близкий)
    let currentStepIndex = grid.zoomSteps.findIndex(step => Math.abs(step - currentZoom) < 0.01);
    
    if (currentStepIndex === -1) {
        currentStepIndex = grid.zoomSteps.reduce((prev, curr, idx) => 
            Math.abs(curr - currentZoom) < Math.abs(grid.zoomSteps[prev] - currentZoom) ? idx : prev, 0
        );
    }

    // Сдвигаем индекс шага в зависимости от направления колеса
    if (event.deltaY < 0) {
        currentStepIndex = Math.min(currentStepIndex + 1, grid.zoomSteps.length - 1); // Увеличиваем
    } else {
        currentStepIndex = Math.max(currentStepIndex - 1, 0); // Уменьшаем
    }

    const nextZoom = grid.zoomSteps[currentStepIndex];

    const zoomPercent = Math.round(nextZoom * 100);

    canvas.fire("app:zoom:changed", { zoom: zoomPercent });

    const mousePoint = new Point(event.offsetX, event.offsetY);
    
    // Вызываем функцию с фиксированным уровнем зума
    grid.setCanvasZoom(canvas, nextZoom, mousePoint);
});

// Изменение размера объекта с учётом установки якоря
canvas.on('object:modified', (options) => {

    const OPPOSITE_ORIGINS: Record<string, { x: TOriginX; y: TOriginY }> = {
        tl: { x: 'right', y: 'bottom' }, // Тянем за top-left -> якорь bottom-right
        tr: { x: 'left', y: 'bottom' },  // Тянем за top-right -> якорь bottom-left
        bl: { x: 'right', y: 'top' },     // Тянем за bottom-left -> якорь top-right
        br: { x: 'left', y: 'top' },     // Тянем за bottom-right -> якорь top-left
        ml: { x: 'right', y: 'center' },  // Тянем за middle-left -> якорь middle-right
        mr: { x: 'left', y: 'center' },   // Тянем за middle-right -> якорь middle-left
        mt: { x: 'center', y: 'bottom' }, // Тянем за middle-top -> якорь middle-bottom
        mb: { x: 'center', y: 'top' },    // Тянем за middle-bottom -> якорь middle-top
    } as const;

    // если нажат шифт или выключена привязка к сетке
    if (!grid.snapToGrid_size || Keybind.shift) return;

    const target = options.target;
    const transform = options.transform; 
    if (!target || !transform) return;

    const action = transform.action;
    if (action !== 'scale' && action !== 'scaleX' && action !== 'scaleY') return;

    // 1. Определяем противоположную точку-якорь
    const corner = transform.corner;
    // left top - стандартное значение
    const anchorOrigin = OPPOSITE_ORIGINS[corner] || { x: 'left', y: 'top' };

    // 2. Получаем текущие координаты точки-якоря до изменения размеров
    const anchorPoint = target.getPointByOrigin(anchorOrigin.x, anchorOrigin.y);

    // Смещение сетки
    const offsetX = grid.gridSize_px;
    const offsetY = grid.gridSize_px;

    // Округляем положение якоря по сетке
    const fixedAnchorX = Math.round((anchorPoint.x - offsetX) / grid.gridSize_px) * grid.gridSize_px + offsetX;
    const fixedAnchorY = Math.round((anchorPoint.y - offsetY) / grid.gridSize_px) * grid.gridSize_px + offsetY;

    const updatedProperties: Record<string, any> = {};

    // 3. Рассчитываем новую кратную ширину
    if ((action === 'scaleX' || action === 'scale') && !target.lockScalingX) {
        const currentWidth = target.width * target.scaleX;
        const snappedWidth = Math.round(currentWidth / grid.gridSize_px) * grid.gridSize_px;

        updatedProperties.width = Math.max(grid.gridSize_px, snappedWidth);
        updatedProperties.scaleX = 1;
    }

    // 4. Рассчитываем новую кратную высоту
    if ((action === 'scaleY' || action === 'scale') && !target.lockScalingY) {
        const currentHeight = target.height * target.scaleY;
        const snappedHeight = Math.round(currentHeight / grid.gridSize_px) * grid.gridSize_px;

        updatedProperties.height = Math.max(grid.gridSize_px, snappedHeight);
        updatedProperties.scaleY = 1;
    }

    // 5. Применяем новые размеры объекта
    target.set(updatedProperties);

    // 6. Смещаем объект так, чтобы его противоположная точка идеально встала на зафиксированный якорь сетки
    target.setXY(new Point(fixedAnchorX, fixedAnchorY), anchorOrigin.x, anchorOrigin.y);

    // Обновляем координаты углов и перерисовываем холст
    target.setCoords();
    canvas.requestRenderAll();
});

// Вращение объекта
canvas.on('object:rotating', (options) => {
    const obj = options.target as any;
    if (!obj) return;
    // либо угол вращения класса либо страндартный
    let object_snapAngle = obj.rotationSnap ? obj.rotationSnap : config.baseSnapAngle;

    // определение вращение в зависимости от нажатия шифта
    if (Keybind.shift) {obj.set('angle', Math.round(obj.angle/config.minAngle)*config.minAngle)}
    else {obj.set('angle', Math.round(obj.angle / object_snapAngle) * object_snapAngle);}
});

// Передвижение объекта
canvas.on('object:moving', (options) => {
    // если нажат шифт или выключена привязка к сетке то пофик
    if (!grid.snapToGrid_move || Keybind.shift) return;
    const target = options.target; if (!target) return;
    // определение якоря
    const topLeftPoint = target.getPointByOrigin('left', 'top');
    // const topLeftPoint = {x:target.getBoundingRect().left, y:target.getBoundingRect().top};
    // Чистое округление без оффсетов
    const snappedX = Math.round(topLeftPoint.x / grid.gridSize_px) * grid.gridSize_px;
    const snappedY = Math.round(topLeftPoint.y / grid.gridSize_px) * grid.gridSize_px;

    console.log(`%cactual x: ${topLeftPoint.x.toFixed(2)} | snapped x: ${snappedX}`, "color: rgb(167, 100, 255)");
    console.log(`%cactual y: ${topLeftPoint.y.toFixed(2 )} | snapped x: ${snappedY}`, "color: green");

    target.setXY(new Point(snappedX, snappedY), 'left', 'top');
    target.setCoords();
});

// canvas.on('object:moving', (options) => {
//     if (!grid.snapToGrid_move || Keybind.shift) return;
//     const target = options.target;
//     if (!target) return;

//     const size = grid.gridSize_px;

//     // getBoundingRect() в v6+ возвращает bbox в scene-координатах
//     // (уже с учётом rotation, scale, skew, но БЕЗ viewportTransform)
//     const br = target.getBoundingRect();

//     // Привязываем ЛЕВЫЙ-ВЕРХНИЙ угол bbox к сетке
//     const snappedLeft = Math.round(br.left / size) * size;
//     const snappedTop  = Math.round(br.top  / size) * size;

//     // Сдвиг, который нужно применить к объекту (в scene-координатах)
//     const dx = snappedLeft - br.left;
//     const dy = snappedTop  - br.top;

//     target.set({
//         left: target.left + dx,
//         top:  target.top  + dy,
//     });
//     console.log({
//         left: target.left,
//         top: target.top,
//         br,
//         angle: target.angle,
//         zoom: canvas.getZoom(),
//         vpt: canvas.viewportTransform,
//     });
//     target.setCoords();
// });
