import { interfaceElements } from "../../config/lang";
import Swal from "sweetalert2";

// on 113 add empty pdf
enum popupIcons {
    info = 'info',
    error = 'error',
    success = 'success',
    warning = 'warning',
    question = 'question'
}

export class PDF {
    // Дефолтные значения (статический объект)
    static readonly defaults = {
        firstPopup_Title: "Справка",
        firstPopup_HTML: "<span>Экземпляр текста.</span>",
        popupIcon: popupIcons.info,
        openPDFButtonText: "Открыть PDF",
        cancelPDFButtonText: "Закрыть",
        firstPopup_Backdrop: 0.75,
        secondPopup_Backdrop: 0.85,
        confirmButtonColor: '#447274',
        cancelButtonColor: 'rgb(92, 51, 97)',
    };

    // Доступные переменные (типизация)
    firstPopup_Title!: string;
    secondPopup_Title!: string;
    firstPopup_HTML!: string;
    documentName?: string;
    popupIcon?: popupIcons;
    openPDFButtonText!: string;
    cancelPDFButtonText!: string;
    firstPopup_Backdrop!: number;
    secondPopup_Backdrop!: number;
    confirmButtonColor!: string;
    cancelButtonColor!: string;
    accentColorForText?: string;

    constructor(init?: Partial<PDF>) {
        // default
        Object.assign(this, PDF.defaults);
        // if user gives 
        if (init) {Object.assign(this, init);}

        // additional 
        this.secondPopup_Title = this.secondPopup_Title ?? `Просмотр документа ${this.documentName ?? ''}`;
        this.popupIcon = this.popupIcon ?? popupIcons.info;
    }

    pathMap = new Map([
        ['34428-2018', '../../assets/document/ГОСТ 34428-2018.pdf#zoom=150'],
        ["34428-2018 9.3.9.8", '../../assets/document/ГОСТ 34428-2018.pdf#page=32&zoom=150']
    ]);

    public static icons = popupIcons;

    private getFullPath(fileIDName: string) {
        if (!this.pathMap.has(fileIDName)) // error
            {throw new Error("Неверно указано название документа.")}
        return this.pathMap.get(fileIDName); // success
    }

    public async openPopupSequence() {
        // 1. Открываем первый попап с HTML-текстом
        const result = await Swal.fire({
            title: this.firstPopup_Title,
            customClass: {icon: 'math-font', popup: 'brs', title: 'sans-s', htmlContainer: 'pdfText'},
            html: this.firstPopup_HTML,
            icon: this.popupIcon??PDF.icons.info,
            backdrop: `rgba(0, 0, 0, ${this.firstPopup_Backdrop})`,
            showCancelButton: true,
            confirmButtonText: this.openPDFButtonText,
            cancelButtonText: 'Закрыть',
            confirmButtonColor: this.confirmButtonColor,
            cancelButtonColor: this.cancelButtonColor,
            theme: 'auto'
        });

        // 2. Проверяем, какую кнопку нажал пользователь
        if (result.isConfirmed) {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Создаем переменную для функции удаления слушателя в области видимости метода
            let deactivateShield: (() => void) | null = null;

            // Открываем второй попап с PDF
            Swal.fire({
                title: 'Просмотр документа ГОСТ 34428-2018',
                customClass: { title: 'sans-s', popup: 'resizable' },
                html: `
                    <div style="position: relative; width: 100%; height: 100%;">
                        <iframe 
                            src="${!this.documentName ? "path/to/empty/doc" : this.getFullPath(this.documentName)}"
                            style="width:100%; height:80vh; display: block;
                            outline-width: 16px !important; outline-style: solid !important; outline-offset: -1px !important;
                            ${prefersDarkMode ? 'outline-color: #3c3c3c !important;' : 'outline-color: #e4e4e4 !important;'}
                            ${prefersDarkMode ? 'filter: brightness(0.8)' : ''}"
                            frameborder="0">
                        </iframe>
                        <div id="iframe-shield" style="
                            position: absolute; 
                            top: 0; 
                            left: 0; 
                            width: 100%; 
                            height: 100%; 
                            display: none; 
                            z-index: 9999;
                            background: transparent;
                        "></div>
                    </div>
                `,
                width: '80%',
                theme: 'auto',
                showCloseButton: true,
                showConfirmButton: false,
                backdrop: `rgba(0, 0, 0, ${this.secondPopup_Backdrop})`,
                
                // block iframe on resizing to propper work
                didOpen: (popup: HTMLElement) => {
                    const shield = document.getElementById('iframe-shield');
                    if (!shield) return;

                    popup.addEventListener('mousedown', (e: MouseEvent) => {
                        const rect = popup.getBoundingClientRect();
                        if (e.clientX > rect.right - 30 && e.clientY > rect.bottom - 30)
                            {shield.style.display = 'block';}
                    });

                    deactivateShield = () => {shield.style.display = 'none';};
                    window.addEventListener('mouseup', deactivateShield);
                },

                willClose: () => {
                    if (deactivateShield)
                        {window.removeEventListener('mouseup', deactivateShield);}
                }
            });
        }
    }
}