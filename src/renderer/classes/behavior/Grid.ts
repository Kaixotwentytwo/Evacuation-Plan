import { Canvas, Point, TMat2D } from 'fabric';
import { interfaceElements } from '../../config/lang';
const IE = interfaceElements;
import { Variables } from '../../config/Variables';
let config = new Variables({baseSnapAngle: 15, minAngle: 1});

// добавить app:grid:changed handler который будет захватываться в app.ts
// или в классах интерфейса в частности и обрабатываться соответствующе

export class grid {

    static gridSize_mm: number = 3;
    static gridSize_px: number = grid.mmToPx(this.gridSize_mm);
    static snapToGrid_move: boolean = true;
    static snapToGrid_size: boolean = true;
    static isDragging: boolean = false;

    // Константы ограничений размеров виртуального холста
    static readonly maxWidth = 8000;
    static readonly maxHeight = 6000;
    static lastPosX: number = 0;
    static lastPosY: number = 0;
    
    // Шаг сдвига (в пикселях) для управления клавиатурой (стрелочками)
    static keyboardPanStep = this.gridSize_px;
    
    // Динамический диапазон зума
    static readonly zoom = [0.25, 7.5];

    static readonly zoomSteps = [
        0.300, 0.350, 0.400, 0.450, 
        0.500, 0.550, 0.600, 0.650, 0.700, 
        0.750, 0.800, 0.850, 0.900, 1.000,

        1.100, 1.200, 1.400, 1.500, 1.600, 
        1.800, 2.000, 2.200, 2.400, 2.500,
        2.600, 2.800, 3.000, 3.200, 3.400, 
        3.500, 3.600, 3.800, 4.000, 4.200, 
        4.400, 4.500, 4.600, 4.800, 5.000,
        5.100, 5.200, 5.400, 5.500, 5.600,
        5.800, 6.000, 6.100, 6.200, 6.400,
        6.500, 6.600, 6.800, 7.000, 7.100,
        7.200, 7.400, 7.500
    ];

    static readonly allowedGridSizesmm = ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "7mm", "8mm", "9mm", "10mm", "15mm", "20mm", "30mm", "40mm", "50mm", "60mm"]
    static readonly allowedGridSizescm = ["0.1cm", "0.2cm", "0.3cm", "0.4cm", "0.5cm", "0.6cm", "0.7cm", "0.8cm", "0.9cm", "1cm", "1.5cm", "2cm", "3cm", "4cm", "5cm", "6cm"]

    // панорамирование
    static clampViewport(canvas: Canvas): void {
        const vpt = canvas.viewportTransform;
        const zoom = canvas.getZoom();
        
        const viewWidth = canvas.getWidth();
        const viewHeight = canvas.getHeight();

        // Вычисляем границы строго на основе текущего окна и размеров холста
        let minX = viewWidth - grid.maxWidth * zoom;
        let minY = viewHeight - grid.maxHeight * zoom;
        
        if (minX > 0) minX = minX / 2;
        if (minY > 0) minY = minY / 2;

        const maxX = minX > 0 ? minX : 0;
        const maxY = minY > 0 ? minY : 0;

        // Зажимаем координаты
        if (vpt[4] < minX) vpt[4] = minX;
        if (vpt[4] > maxX) vpt[4] = maxX;
        
        if (vpt[5] < minY) vpt[5] = minY;
        if (vpt[5] > maxY) vpt[5] = maxY;
    }
    static panCanvas(canvas: Canvas, deltaX: number, deltaY: number): void {
        const vpt = canvas.viewportTransform;
        vpt[4] += deltaX;
        vpt[5] += deltaY;
        
        // Принудительно проверяем границы
        grid.clampViewport(canvas);
        // Синхронизируем нашу 100px SVG-сетку
        canvas.setViewportTransform(canvas.viewportTransform);
        grid.updateSvgGrid(canvas);
        canvas.requestRenderAll();
    }
    static handleKeyboardPan(step: number, canvas: Canvas, direction: 'Left' | 'Up' | 'Right' | 'Down'): void {
        let dx = 0;
        let dy = 0;
        
        switch (direction) {
            case 'Left':  dx = step;  break;  // Сдвигаем сцену вправо (камера влево)
            case 'Right': dx = -step; break;
            case 'Up':    dy = step;  break;  // Сдвигаем сцену вниз (камера вверх)
            case 'Down':  dy = -step; break;
        }
        
        grid.panCanvas(canvas, dx, dy);
    }

    // Конвертация мм в пиксели
    public static mmToPx(mm: number): number {
        const div = document.createElement('div');
        div.style.width = '1mm';
        document.body.appendChild(div);
        const oneMmInPx = div.getBoundingClientRect().width;
        document.body.removeChild(div);
        return Math.round(oneMmInPx * mm);
    }

    // Конвертирует пиксели в миллиметры
    public static pxToMm(px: number): number {
        const div = document.createElement('div');
        div.style.width = '1mm';
        document.body.appendChild(div);
        const oneMmInPx = div.getBoundingClientRect().width;
        document.body.removeChild(div);
        return Math.round(px / oneMmInPx);
    }

    static switchSnapToGridMove() {grid.snapToGrid_move = !grid.snapToGrid_move;console.log(`Привязка к сетке: ${grid.snapToGrid_move ? 'ВКЛЮЧЕНА' : 'ВЫКЛЮЧЕНА'}`);}
    static switchSnapToGridSize() {grid.snapToGrid_size = !grid.snapToGrid_size;console.log(`Привязка к сетке: ${grid.snapToGrid_size ? 'ВКЛЮЧЕНА' : 'ВЫКЛЮЧЕНА'}`);}

    //Изменение масштаба (зума) холста
    static setCanvasZoom(canvas: Canvas, zoomLevel: number, point?: Point): void {
        if (!canvas) return;
    
        let finalZoom = zoomLevel;
        const minZoom = grid.zoomSteps[0];
        const maxZoom = grid.zoomSteps[grid.zoomSteps.length - 1];
        
        if (finalZoom > maxZoom) finalZoom = maxZoom;
        if (finalZoom < minZoom) finalZoom = minZoom;

        const targetPoint = point || canvas.getVpCenter();
        canvas.zoomToPoint(targetPoint, finalZoom);
        
        grid.clampViewport(canvas);
        
        // ФИКС ОШИБКИ ТИПОВ: Явно указываем тип TMat2D для копии матрицы
        const vpt = [...canvas.viewportTransform] as TMat2D;
        vpt[0] = finalZoom; // Сбрасываем микро-искажения масштаба X
        vpt[3] = finalZoom; // Сбрасываем микро-искажения масштаба Y
        canvas.viewportTransform = vpt;

        canvas.setViewportTransform(canvas.viewportTransform);
        grid.updateSvgGrid(canvas);
        canvas.requestRenderAll();
    }

    //Изменение физического размера сетки
    static changeGridSize(canvas: Canvas, newSize: string, textElement: Element, lang: string): number {
    // 1. Логика switch определения targetSizeStr (остается вашей рабочей)
    let local_index: number;
    let targetSizeStr: string = `${grid.gridSize_mm}mm`;

    switch (newSize) {
        case "up":
            local_index = grid.allowedGridSizesmm.indexOf(`${grid.gridSize_mm}mm`);
            if (local_index + 1 < grid.allowedGridSizesmm.length) local_index += 1;
            targetSizeStr = grid.allowedGridSizesmm[local_index];
            break;
        case "down":
            local_index = grid.allowedGridSizesmm.indexOf(`${grid.gridSize_mm}mm`);
            if (local_index - 1 >= 0) local_index -= 1;
            targetSizeStr = grid.allowedGridSizesmm[local_index];
            break;
        default:
            if (grid.allowedGridSizesmm.includes(newSize)) targetSizeStr = newSize;
            else if (grid.allowedGridSizescm.includes(newSize)) targetSizeStr = 
            grid.allowedGridSizesmm[grid.allowedGridSizescm.indexOf(newSize)];
            break;
    }

    // 2. Обновляем переменные и UI текст
    grid.gridSize_mm = Number.parseInt(targetSizeStr);
    if (textElement) {
        if (lang === "ru") textElement.innerHTML = `${IE.gridText[0]} ${grid.gridSize_mm}мм`;
        if (lang === "en") textElement.innerHTML = `${IE.gridText[1]} ${grid.gridSize_mm}mm`;
    }

    grid.gridSize_px = grid.mmToPx(grid.gridSize_mm);

    grid.updateSvgGrid(canvas);
    return grid.gridSize_mm;
}

    // вспомогательная функция
    static updateSvgGrid(canvas: Canvas) {
        const pattern = document.getElementById('grid-pattern');
        const gridLines = document.getElementById('grid-lines');
        if (!pattern || !gridLines) return;

        const vpt = canvas.viewportTransform;
        const zoom = vpt[0]; // Текущий зум холста
        const translateX = vpt[4]; // Сдвиг холста по X
        const translateY = vpt[5]; // Сдвиг холста по Y

        // Считаем реальный визуальный размер ячейки на экране с учетом текущего зума
        const currentVisualSize = grid.gridSize_px * zoom;

        // Напрямую меняем размеры самого паттерна в пикселях. Браузер это отлично перерисовывает.
        pattern.setAttribute('width', String(currentVisualSize));
        pattern.setAttribute('height', String(currentVisualSize));
        gridLines.setAttribute('width', String(currentVisualSize));
        gridLines.setAttribute('height', String(currentVisualSize));

        // В матрицу передаем ТОЛЬКО сдвиг (translateX/translateY) без масштабирования (1 0 0 1)
        // Зацикливаем сдвиг через остаток от деления %, чтобы значения не росли до бесконечности
        const posX = translateX % currentVisualSize;
        const posY = translateY % currentVisualSize;

        pattern.setAttribute('patternTransform', `matrix(1 0 0 1 ${posX} ${posY})`);
    }
}

if (config && config.devMode && config.maxZoom) {
    for (let i = 1; i < (5+30); i++) {
        // zoom steps up to 10
        grid.zoomSteps.push(7 + i*0.1);
    }
    console.log(grid.zoomSteps);
}