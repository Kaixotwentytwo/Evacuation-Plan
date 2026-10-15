import { Rect, controlsUtils, util, Canvas } from 'fabric';
import { Theme, applyWallTheme, GOSTColors } from '../../config/theme';
import { grid } from '../behavior/Grid';

// let currentHeight = grid.mmToPx(Number((document.getElementById("outWallHeightRange") as HTMLInputElement)?.value));

// Класс стен
export class OutWall extends Rect {
  static className = 'OutWall';
  public rotationSnap: number = 15;
  static color: any = GOSTColors.black.hex;
  static height: number;
  
  constructor(options: any = {}) {
    super({
      className: 'OutWall',
      width: 30,
      height: OutWall.height??grid.mmToPx(3),
      fill: OutWall.color,
      padding: 0,
      borderStrokeWidth: 2,
      borderOpacityWhenMoving: 0.3,
      hasBorders: true,
      borderScaleFactor: 2,
      borderColor: Theme.primary,
      strokeWidth: 0,
      ...options,
    });

    OutWall.className = 'OutWall';
    OutWall.height = this.height;
    
    delete this.controls.mt;
    delete this.controls.mb;
    delete this.controls.mtr;
    
    if (this.controls.mr) {
      this.controls.mr.actionHandler = controlsUtils.scalingX;
      this.controls.mr.cursorStyleHandler = controlsUtils.scaleCursorStyleHandler;
    }
    
    if (this.controls.ml) {
      this.controls.ml.actionHandler = controlsUtils.scalingX;
      this.controls.ml.cursorStyleHandler = controlsUtils.scaleCursorStyleHandler;
    }
    
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
        const size = Theme.controls.cornerSize || fabricObject.cornerSize;

        ctx.save();
        ctx.translate(left, top);
        
        // Вращаем контекст вместе с объектом
        ctx.rotate(util.degreesToRadians(fabricObject.angle));

        // Рисуем круг
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, 2 * Math.PI, false);

        // Стилизация (используем цвета из настроек объекта или дефолтные)
        ctx.fillStyle = Theme.controls.cornerFill || fabricObject.cornerColor;
        ctx.fill();

        // Добавляем обводку (stroke), чтобы круглые углы не сливались с фоном холста
        ctx.strokeStyle = Theme.controls.cornerStroke || fabricObject.cornerStrokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      };
    });
  }

  // _render(ctx: CanvasRenderingContext2D) {
  //   ctx.save();

  //   const outlineWidth = 1; // Толщина outline

  //   ctx.fillStyle = OutWall.color;
  //   ctx.fillRect(
  //       -this.width / 2 - outlineWidth / (this.scaleX || 1),
  //       -this.height / 2 - outlineWidth / (this.scaleY || 1),
  //       this.width + (outlineWidth * 2) / (this.scaleX || 1),
  //       this.height + (outlineWidth * 2) / (this.scaleY || 1)
  //   );

  //   ctx.fillStyle = this.fill as string || OutWall.color;
  //   ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

  //   ctx.restore();
  // }
}