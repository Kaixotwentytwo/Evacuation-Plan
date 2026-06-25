import { Rect, controlsUtils, util, Canvas, TPointerEvent } from 'fabric';
import { Theme, applyWallTheme } from '../config/theme';

export class InWall extends Rect {
  static defaultHeight: number = 100;
  // Базовый шаг вращения без Shift (например, 15 градусов)
  public rotationSnap: number = 15; 

  constructor(options: any = {}) {
    super({
      width: 200,
      height: InWall.defaultHeight, // Исправлено: было OutWall
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

    // Кастомный обработчик для изменения шага вращения на лету
    const customRotationHandler = (eventData: TPointerEvent, transform: any, x: number, y: number) => {
      // Сохраняем оригинальный шаг объекта
      const originalSnap = this.rotationSnap;
      
      // Если зажат Shift (в eventData есть shiftKey), ставим шаг 1, иначе возвращаем 15
      this.rotationSnap = eventData.shiftKey ? 1 : originalSnap;

      // Вызываем стандартный метод вращения Fabric.js с обновленным rotationSnap
      const result = controlsUtils.rotationWithSnapping(eventData, transform, x, y);

      // Возвращаем оригинальное значение обратно, чтобы не ломать логику в других местах
      this.rotationSnap = originalSnap;
      
      return result;
    };

    ['tl', 'tr', 'bl', 'br'].forEach(k => {
      const control = this.controls[k];
      if (!control) return;

      // Подменяем стандартный handler на наш кастомный
      this.controls[k].actionHandler = customRotationHandler;
      this.controls[k].cursorStyleHandler = controlsUtils.rotationStyleHandler;
      this.controls[k].actionName = 'rotate';

      control.render = (ctx, left, top, styleOverride, fabricObject) => {
        const size = Theme.controls.cornerSize || styleOverride.cornerSize || fabricObject.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(util.degreesToRadians(fabricObject.angle));
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = Theme.controls.cornerFill || styleOverride.cornerColor || fabricObject.cornerColor;
        ctx.fill();
        ctx.strokeStyle = Theme.controls.cornerStroke || styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      };
    });
  }

  static setDefaultHeight(newHeight: number, canvas?: Canvas) {
    InWall.defaultHeight = newHeight;
    if (canvas) {
      canvas.getObjects().forEach(obj => {
        if (obj instanceof InWall) {
          obj.set('height', newHeight);
        }
      });
      canvas.renderAll();
    }
  }
}
