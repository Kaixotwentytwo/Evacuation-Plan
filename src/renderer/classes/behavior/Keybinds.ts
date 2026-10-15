import { ActiveSelection, IText, Point } from "fabric";
import { Clipboard } from "./Clipboard";
import { grid } from "./Grid";
import { deleteCanvasObject, canvas } from "./CanvasBehavior";
import { Variables } from "../../config/Variables";
let config = new Variables({minAngle: 1});

// KEYBINDS
// (()=>)();

export class Keybind {
    public static shift: Boolean = false;
    public static alt: Boolean = false;
    public static ctrl: Boolean = false;
    public static mouseLastPos: Point = new Point(0, 0);

    static {
        // нажатие клавиш
        window.addEventListener('keydown', async (e) => {
            // нажатие шифт
            if (e.key === 'Shift' && !Keybind.shift) {
                Keybind.shift = true;
            }

            if (e.key === 'Control' && !Keybind.ctrl) {
                Keybind.ctrl = true;
            }

            if (e.key === 'Alt' && !Keybind.alt) {
                Keybind.alt = true;

                const activeObject = canvas.getActiveObject();
                if (activeObject) {activeObject.snapAngle = config.minAngle;}
            }

            // SELECT ALL
            if (e.key === 'a' || e.key === 'ф') {
                e.preventDefault(); 

                // 1. Получаем все объекты с холста, которые можно выделять (игнорируем служебные элементы, если они есть)
                const allObjects = canvas.getObjects().filter(obj => obj.selectable);

                if (allObjects.length === 0) return;

                // 2. Очищаем текущее выделение перед созданием нового
                canvas.discardActiveObject();

                // 3. Создаем новое множественное выделение
                const selection = new ActiveSelection(allObjects, {
                    canvas: canvas
                });

                // 4. Делаем группу активной и принудительно перерисовываем холст
                canvas.setActiveObject(selection);
                canvas.requestRenderAll();
            }

            // MOVE
            // стрелочки
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault(); // Запрещаем стандартный скролл страницы кнопками
                
                // oтсекаем слово "Arrow" и передаем чистые 'Left' / 'Right' / 'Up' / 'Down'
                const direction = e.key.replace('Arrow', '') as 'Left' | 'Right' | 'Up' | 'Down';
                const activeObject = canvas.getActiveObject();

                // СЦЕНАРИЙ А: На холсте выделен объект или группа — двигаем ИХ по сетке
                if (activeObject && !Keybind.shift && !e.ctrlKey) {
                    const step = grid.gridSize_px; 
                    
                    let moveX = 0;
                    let moveY = 0;

                    switch (direction) {
                        case 'Left':  moveX = -step; break;
                        case 'Right': moveX = step;  break;
                        case 'Up':    moveY = -step; break;
                        case 'Down':  moveY = step;  break;
                    }

                    // Рассчитываем новые координаты
                    const newLeft = activeObject.left + moveX;
                    const newTop = activeObject.top + moveY;

                    // Перемещаем объект (или группу)
                    activeObject.set({
                        left: newLeft,
                        top: newTop
                    });

                    // Обновляем маркеры выделения вокруг сдвинутого объекта
                    activeObject.setCoords();
                    canvas.requestRenderAll();
                    
                    if (config.devMode===true) {console.log(`Объект смещен по сетке на ${step}px`);}
                } 
                // СЦЕНАРИЙ Б: Ничего не выделено — двигаем весь холст
                else {grid.handleKeyboardPan(grid.gridSize_px, canvas, direction);}
            }

            // DELETE
            // Удаление выделенного объекта по Delete
            if (e.key==='Delete' || e.key === 'Backspace') {
                const activeObject = canvas.getActiveObject();
                deleteCanvasObject(activeObject);
            }

            // COPY
            if (e.key==='c' || e.key==='с' || e.key==='C' || e.key === 'С') {
                e.preventDefault();
                await Clipboard.copy2(canvas);
            }

            // CUT
            if (e.key==='x' || e.key==='ч' || e.key==='X' || e.key==='Ч') {
                e.preventDefault();

                const activeObject = canvas.getActiveObject();
                if (!activeObject) return;
                await Clipboard.copy2(canvas);

                deleteCanvasObject(activeObject);
            }

            // PASTE
            if (e.key==='v' || e.key==='м' || e.key==='V' || e.key==='М') {
                e.preventDefault();
                await Clipboard.paste2(canvas, Keybind.mouseLastPos);
            }

            // DUPLICATE
            if (e.key==='d' || e.key==='в' || e.key==='D' || e.key==='В') {
                e.preventDefault();
                
                const activeObject = canvas.getActiveObject();
                if (!activeObject) return;

                const oldClipboard = Clipboard.data;
                
                await Clipboard.copy2(canvas);
                await Clipboard.paste2(canvas, Keybind.mouseLastPos);
                
                Clipboard.data = oldClipboard;
            }

            // TEXT
            if ((e.key === 't' || e.key === 'е')&&(config.devMode===true)) {
                // Игнорируем, если фокус на input
                if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

                const text = new IText('Двойной клик чтобы редактировать', {
                    left: 50,
                    top: 50,
                    fontFamily: 'Arial',
                    fontSize: 20,
                    fill: 'white'
                });
                canvas.add(text);
                canvas.renderAll();
                console.log('Текст добавлен на холст');
            }
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        });

        // отпуск клавиш
        window.addEventListener('keyup', (e) => {

            // отпуск шифт
            if (e.key === 'Shift') {
                Keybind.shift = false;
                const activeObject = canvas.getActiveObject();
                if (activeObject) {
                    const customSnap = (activeObject as any).rotationSnap;
                    // при отпускании шифта либо rotationSnap класса либо базовый = 15%
                    activeObject.snapAngle = typeof customSnap === 'number' ?
                        customSnap 
                        : config.baseSnapAngle;
                }
            }
        });
    }

    constructor() {throw new Error("Класс Keybind не имеет конструктора.")}
}
