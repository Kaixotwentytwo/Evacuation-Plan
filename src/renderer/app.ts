import './legacy.js';
import './css/variables.css';
import './css/main.css';
//import './popup/popup_lib.css';
//import './popup/settings.css';

import { Rect, Control, controlsUtils, util, Canvas, IText, FabricImage, loadSVGFromURL, loadSVGFromString, Group, FabricObject, version } from 'fabric';
import { OutWall } from './classes/OutWall';

const baseAngleSnap = 1;

// buttons that spawns elements
const outWallsButton = document.getElementById("outWalls");

outWallsButton.addEventListener("click", () => {
  const rect = new OutWall({ left: 100, top: 100 });
  canvas.add(rect);
  canvas.renderAll();
});

// ========== ИНИЦИАЛИЗАЦИЯ CANVAS ==========
const canvas = new Canvas('fabricCanvas', {
  width: 800,
  height: 600,
  backgroundColor: 'transparent'
});

function resizeCanvas() {
    canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    canvas.requestRenderAll(); 
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

console.log('Fabric.js version:', version);

canvas.on('object:rotating', (options) => {
  const obj = options.target as any;
  if (!obj) return;
  
  const snapAngle = obj.rotationSnap || baseAngleSnap;
  obj.set('angle', Math.round(obj.angle / snapAngle) * snapAngle);
});

// Функция для сохранения и загрузки

const imageLoader = document.getElementById('imageLoader');

imageLoader?.addEventListener('change', (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  if (fileExtension === 'svg') {
    loadSVGFile(file);
  } else {
    loadImageFile(file);
  }
  
  // Сбрасываем input, чтобы можно было загрузить тот же файл повторно
  input.value = '';
});

// Загрузка растровых изображений
function loadImageFile(file: File): void {
  const reader = new FileReader();
  reader.onload = (event: ProgressEvent<FileReader>) => {
    const imgUrl = event.target?.result as string;
    FabricImage.fromURL(imgUrl).then((img) => {
      // Масштабируем, чтобы вписать в canvas
      scaleToFitCanvas(img);
      canvas.add(img);
      canvas.centerObject(img);
      canvas.renderAll();
    }).catch((err) => {
      console.error('Ошибка загрузки изображения:', err);
    });
  };
  reader.readAsDataURL(file);
}

// Загрузка SVG
function loadSVGFile(file: File): void {
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

      scaleToFitCanvas(group);
      canvas.add(group);
      canvas.centerObject(group);
      canvas.renderAll();
    }).catch((err) => {
      console.error('Ошибка загрузки SVG:', err);
    });
  };
  reader.readAsText(file);
}

// Масштабирование объекта под размер canvas
function scaleToFitCanvas(obj: FabricObject, maxWidth?: number, maxHeight?: number): void {
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

// ========== ЭКСПОРТ PNG ==========
document.getElementById('exportPNG')?.addEventListener('click', () => {
  const dataURL = canvas.toDataURL({
    format: 'png',
    multiplier: 1
  });
  downloadFile(dataURL, 'canvas.png');
});

// ========== ЭКСПОРТ JPG ==========
document.getElementById('exportJPG')?.addEventListener('click', () => {
  const dataURL = canvas.toDataURL({
    format: 'jpeg',
    quality: 0.9,
    multiplier: 1
  });
  downloadFile(dataURL, 'canvas.jpg');
});

// ========== ЭКСПОРТ JSON ==========
document.getElementById('exportJSON')?.addEventListener('click', () => {
  const json = canvas.toJSON();
  const dataStr = JSON.stringify(json, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, 'canvas.json');
  URL.revokeObjectURL(url);
});

// ========== ЭКСПОРТ SVG ==========
document.getElementById('exportSVG')?.addEventListener('click', () => {
  const svg = canvas.toSVG();
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, 'canvas.svg');
  URL.revokeObjectURL(url);
});

// ========== ЗАГРУЗКА JSON ==========
document.getElementById('loadJSON')?.addEventListener('click', () => {
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
        await canvas.loadFromJSON(json);
        canvas.renderAll();
        alert('JSON успешно загружен!');
      } catch (error: any) {
        alert('Ошибка при загрузке JSON: ' + error.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
});

// ========== ДОБАВЛЕНИЕ ТЕКСТА ПО КЛАВИШЕ T ==========
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 't' || e.key === 'е') {
    // Игнорируем, если фокус на input
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

    const text = new IText('Двойной клик чтобы редактировать', {
      left: 50,
      top: 50,
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 'black'
    });
    canvas.add(text);
    canvas.renderAll();
    console.log('Текст добавлен на холст');
  }

  // Удаление выделенного объекта по Delete
  if (e.key === 'Delete') {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }
});

// ========== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ СКАЧИВАНИЯ ==========
function downloadFile(data: string, filename: string): void {
  const link = document.createElement('a');
  link.href = data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}