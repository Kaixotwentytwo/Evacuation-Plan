import { ActiveSelection, Canvas, Point, Rect } from "fabric";
import { ClassRegister } from "../ClassRegister";
import { grid } from "./Grid";
import { Keybind } from "./Keybinds";

export class Clipboard {
    constructor() {
        throw new Error("Класс Clipboard является статическим и не может иметь экземпляров.");
    }

    static data: any;

    // copy
    // public static async copy(canvas: Canvas) {
    //     const activeObject = canvas.getActiveObject();
    //     if (!activeObject) return;

    //     // Сбрасываем буфер перед записью
    //     Clipboard.data = [];

    //     // Универсальная функция сериализации
    //     const serializeObject = (obj: any, selectionAngle = 0) => {
    //         const globalCenter = obj.getCenterPoint();
            
    //         // Достаем имя: сначала из статического свойства класса, 
    //         // затем из обычного поля, если ничего нет — берем тип Fabric (rect, и т.д.)
    //         const detectedName = obj.constructor?.className || obj.className || obj.type || 'Rect';

    //         return {
    //             className: detectedName, 
    //             width: obj.getScaledWidth(), 
    //             height: obj.getScaledHeight(), 
    //             angle: obj.angle + selectionAngle, 
    //             centerX: globalCenter.x,
    //             centerY: globalCenter.y,
    //             fill: obj.fill
    //         };
    //     };

    //     if (activeObject.type.toLowerCase() === 'activeselection') {
    //         const selection = activeObject as any;
    //         const originalObjects = selection.getObjects(); 

    //         originalObjects.forEach((obj: any) => {
    //             const serialized = serializeObject(obj, selection.angle || 0);
    //             Clipboard.data.push(serialized);
    //         });

    //     } else {
    //         // Если выделили всего один объект
    //         Clipboard.data.push(serializeObject(activeObject));
    //     }
    // }

    // // paste
    // public static async paste(canvas: Canvas, coordinates: Point) {
    //     if (Clipboard.data.length === 0) return;

    //     canvas.discardActiveObject();

    //     const centersX = Clipboard.data.map(o => o.centerX);
    //     const centersY = Clipboard.data.map(o => o.centerY);
    //     const minX = Math.min(...centersX);
    //     const maxX = Math.max(...centersX);
    //     const minY = Math.min(...centersY);
    //     const maxY = Math.max(...centersY);
        
    //     const groupCenterSource = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
    //     const newlyCreatedObjects: any[] = [];

    //     Clipboard.data.forEach((data) => {
    //         const offsetX = data.centerX - groupCenterSource.x;
    //         const offsetY = data.centerY - groupCenterSource.y;

    //         const newCenterX = coordinates.x + offsetX;
    //         const newCenterY = coordinates.y + offsetY;

    //         const objectOptions = {
    //             width: data.width,   
    //             height: data.height, 
    //             scaleX: 1,           
    //             scaleY: 1,
    //             angle: data.angle,
    //             left: newCenterX,
    //             top: newCenterY,
    //             originX: 'center' as const,  
    //             originY: 'center' as const,  
    //             fill: data.fill
    //         };

    //         let newInstance: any;

    //         // Ищем класс в нашем реестре по строковому имени
    //         const TargetClass = ClassRegister[data.className];

    //         if (TargetClass) {
    //             newInstance = new TargetClass(objectOptions);
    //         } else {
    //             newInstance = new Rect(objectOptions);
    //         }

    //         // Применяем сетку
    //         if (grid.snapToGrid_move && !Keybind.shift) {
    //             const topLeft = newInstance.getPointByOrigin('left', 'top');
    //             const snappedX = Math.round(topLeft.x / grid.gridSize_px) * grid.gridSize_px;
    //             const snappedY = Math.round(topLeft.y / grid.gridSize_px) * grid.gridSize_px;
    //             newInstance.setXY(new Point(snappedX, snappedY), 'left', 'top');
    //         }

    //         // Добавляем на холст
    //         canvas.add(newInstance);
    //         newlyCreatedObjects.push(newInstance);
    //     });

    //     if (newlyCreatedObjects.length > 1) {
    //         const newSelection = new ActiveSelection(newlyCreatedObjects, { canvas: canvas });
    //         canvas.setActiveObject(newSelection);
    //     } else if (newlyCreatedObjects.length === 1) {
    //         canvas.setActiveObject(newlyCreatedObjects[0]); 
    //     }

    //     canvas.requestRenderAll();
    // }

    public static copy2(canvas: Canvas) {
        const activeObject = canvas.getActiveObject();
        if (!activeObject) return;

        activeObject
            .clone()
            .then((cloned) => {
            Clipboard.data = cloned;
            });
    }

    public static async paste2(canvas: Canvas, spawnCoordinates: Point = new Point(100, 100)) {
        // clone again, so you can do multiple copies.
        const clonedObj = await Clipboard.data.clone();
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj instanceof ActiveSelection) {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject((obj) => {
            canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        Clipboard.data.top += 10;
        Clipboard.data.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    }
}