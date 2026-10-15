import { Rect } from 'fabric'; 
import { Theme } from '../../config/theme';
import { grid } from '../behavior/Grid';

export class Icon extends Rect {
  static className: string = 'Icon';
  static iconSize: number = 10;
  
  public planDescription: string = "Допольнительное описание на плане по необходимости";
  public code: string = '';
  public imageURL: string = "";
  public meaning: string = "";
  public meaning_short: string = '';
  public place_recommendations: string = "";
  public vital: boolean = true;
  public category: string = "prohibitive";

  // Ссылка на нативный элемент картинки
  private _imageElement: HTMLImageElement | null = null;

  constructor(options: any = {}) {
    const size = grid.mmToPx(Icon.iconSize) || 30;

    super({
      left: 0,
      top: 0,
      width: options.width || size,
      height: options.height || size,
      padding: 0,
      fill: 'transparent', 
      strokeWidth: 0,
      hasBorders: true, 
      borderColor: Theme.primary || '#007fff',
      originX: 'center',
      originY: 'center',
      ...options,
    });

    Icon.className = 'Icon';
    if (this.meaning_short === '') this.meaning_short = this.meaning;

    // Отключаем стандартные маркеры трансформации, оставляя только рамку выделения
    this.hasControls = false; 
    this.lockScalingX = true;
    this.lockScalingY = true;
    this.lockRotation = true;
    this.lockSkewingX = true;
    this.lockSkewingY = true;

    // ИСПРАВЛЕНИЕ: Берем путь НАПРЯМУЮ из переданных аргументов options
    const urlToLoad = options.imageURL;
    
    console.log("Конструктор Icon вызван. Путь к картинке:", urlToLoad);

    if (urlToLoad) {
      this.imageURL = urlToLoad;
      this._loadImage(urlToLoad);
    } else {
      console.warn("Предупреждение: Icon создан без imageURL");
    }
  }

  private _loadImage(url: string) {
    console.log("Запуск метода _loadImage для URL:", url);
    
    const img = new Image();
    img.src = url;
    
    img.onload = () => {
      console.log("Картинка успешно загружена браузером:", url);
      this._imageElement = img;
      
      // Форсируем перерисовку холста, если объект уже добавлен
      if (this.canvas) {
        this.canvas.requestRenderAll();
      }
    };
    
    img.onerror = () => {
      console.error(`Ошибка загрузки картинки в тег Image по пути: ${url}`);
    };
  }

  public override _render(ctx: CanvasRenderingContext2D) {
    // Вызываем базовый рендер Rect
    super._render(ctx);

    if (this._imageElement) {
      const w = this.width;
      const h = this.height;
      // Рисуем картинку из центра объекта (внутри _render 0,0 — это центр)
      ctx.drawImage(this._imageElement, -w / 2, -h / 2, w, h);
    } else {
      // Заглушка: если картинка еще не загрузилась, рисуем бледный полупрозрачный квадрат
      ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
  }
}
