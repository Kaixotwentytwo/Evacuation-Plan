import { Canvas, FabricObject, loadSVGFromString, loadSVGFromURL, Group, FabricImage } from "fabric";

export class Saving {

    // вспомогательные функции
    static downloadFile(data: string, filename: string): void {
        const link = document.createElement('a');
        link.href = data;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    static scaleToFitCanvas(canvas: Canvas, obj: FabricObject, maxWidth?: number, maxHeight?: number): void {
        const canvasWidth = canvas.width || 800;
        const canvasHeight = canvas.height || 600;
        
        // Максимальный размер — 70% от canvas
        const maxW = maxWidth || canvasWidth * 0.7;
        const maxH = maxHeight || canvasHeight * 0.7;
        
        const objWidth = obj.width || 1;
        const objHeight = obj.height || 1;
        
        // Вычисляем коэффициент масштабирования, сохраняя пропорции
        const scale = Math.min(
        maxW / objWidth,
        maxH / objHeight,
        1 // не увеличивать, если объект уже меньше
        );
        
        obj.scaleX = obj.scaleX * scale;
        obj.scaleY = obj.scaleY * scale;
        
        console.log(`Объект масштабирован: ${Math.round(scale * 100)}%`);
    }
    private static generateFilename(extension: string): string {
        const now = new Date();
        const year = now.getFullYear();
        // month возвращает 0-11, добавляем 1 и форматируем до 2 знаков
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `canvas_${year}-${month}-${day}_${hours}-${minutes}.${extension}`;
    }

    // export ones
    static exportJSON(canvas: Canvas):void {
        const json = canvas?.toJSON();
        const dataStr = JSON.stringify(json, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        Saving.downloadFile(url, Saving.generateFilename("json"));
        URL.revokeObjectURL(url);
    }
    static exportSVG(canvasInstance: Canvas):void {
        if (!canvasInstance) return;
        const svg = canvasInstance.toSVG(); 
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        Saving.downloadFile(url, Saving.generateFilename("svg"));
        setTimeout(() => {URL.revokeObjectURL(url);}, 100);
    }
    static exportJPG(canvas: Canvas, quality: number = 0.9):void {
        const dataURL = canvas?.toDataURL({
            format: 'jpeg',
            quality: quality,
            multiplier: 1
        });
        Saving.downloadFile(dataURL, Saving.generateFilename("jpg"));
    }
    static exportPNG(canvas: Canvas):void {
        const dataURL = canvas?.toDataURL({
            format: 'png',
            multiplier: 1
        });
        Saving.downloadFile(dataURL, Saving.generateFilename("png"));
    }

    // loading ones
    static loadJSON(canvas: Canvas):void {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event: ProgressEvent<FileReader>) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                await canvas?.loadFromJSON(json);
                canvas.renderAll();
                // alert('JSON успешно загружен!');
            } catch (error: any) {
                alert('Ошибка при загрузке JSON: ' + error.message);
            }
            };
            reader.readAsText(file);
        };
        input.click();
    }
    static loadImageFile(canvas: Canvas, file: File): void {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
        const imgUrl = event.target?.result as string;
        FabricImage.fromURL(imgUrl).then((img) => {
            // Масштабируем, чтобы вписать в canvas
            Saving.scaleToFitCanvas(canvas, img);
            canvas.add(img);
            canvas.centerObject(img);
            canvas.renderAll();
        }).catch((err) => {
            console.error('Ошибка загрузки изображения:', err);
        });
        };
        reader.readAsDataURL(file);
    }
    static loadFile(e: Event, canvas: Canvas):void {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (fileExtension === 'svg') {
            Saving.loadSVGFile(canvas, file);
        } else {
            Saving.loadImageFile(canvas, file);
        }
        
        // Сбрасываем input, чтобы можно было загрузить тот же файл повторно
        input.value = '';
    }
    static loadSVGFile(canvas: Canvas, file: File):void {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const svgString = event.target?.result as string;
            
            loadSVGFromString(svgString).then(({ objects, options }) => {
            const validObjects = objects.filter((obj): obj is FabricObject => obj !== null);
            
            const group = new Group(validObjects, {
                ...options,
                scaleX: 1,
                scaleY: 1,
            });

            Saving.scaleToFitCanvas(canvas, group);
            canvas.add(group);
            canvas.centerObject(group);
            canvas.renderAll();
            }).catch((err) => {
            console.error('Ошибка загрузки SVG:', err);
            });
        };
        reader.readAsText(file);
    }
}