import { Rect, controlsUtils, util, Canvas } from 'fabric';
import { Theme, applyWallTheme } from '../config/theme';

// Класс стен
export class OutWall extends Rect {
  static defaultHeight: number = 100;
  public rotationSnap: number = 15;
  
  constructor(options: any = {}) {
    super({
      width: 200,
      height: OutWall.defaultHeight,
      fill: Theme.wall.outer,
      ...options,
    });
    
    delete this.controls.mt;
    delete this.controls.mb;
    delete this.controls.mtr;
    
    this.lockSkewingY = true;
    this.lockSkewingX = true;
    this.transparentCorners = false;
    this.cornerSize = Theme.controls.cornerSize;
    
    ['tl', 'tr', 'bl', 'br'].forEach(k => {
      const control = this.controls[k];
      if (!control) return;
      
      this.controls[k].actionHandler = controlsUtils.rotationWithSnapping;
      this.controls[k].cursorStyleHandler = controlsUtils.rotationStyleHandler;
      this.controls[k].actionName = 'rotate';
      
      control.render = (ctx, left, top, styleOverride, fabricObject) => {
        const size = Theme.controls.cornerSize || styleOverride.cornerSize || fabricObject.cornerSize;

        ctx.save();
        ctx.translate(left, top);
        
        // Вращаем контекст вместе с объектом
        ctx.rotate(util.degreesToRadians(fabricObject.angle));

        // Рисуем круг
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, 2 * Math.PI, false);

        // Стилизация (используем цвета из настроек объекта или дефолтные)
        ctx.fillStyle = Theme.controls.cornerFill styleOverride.cornerColor || fabricObject.cornerColor;
        ctx.fill();

        // Добавляем обводку (stroke), чтобы круглые углы не сливались с фоном холста
        ctx.strokeStyle = Theme.controls.cornerStroke || styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      };
    });
  }
    
  static setDefaultHeight(newHeight: number, canvas?: Canvas) {
    OutWall.defaultHeight = newHeight;
    
    // Если передан canvas — обновляем все существующие OutWall на нём
    if (canvas) {
      canvas.getObjects().forEach(obj => {
        if (obj instanceof OutWall) {
          obj.set('height', newHeight);
        }
      });
      canvas.renderAll();
    }
  }
}