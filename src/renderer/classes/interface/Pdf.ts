import { interfaceElements } from "../../config/lang";
import Swal from "sweetalert2";

enum iconChoise{
    question = 'question',
    error = 'error',
    success = 'success',
    info = 'info'
    // add like others icons
}

// on 113 add empty pdf

export class PDF {
    firstPopup_Title: string | undefined;
    secondPopup_Title: string | undefined;
    firstPopup_HTML: string | undefined;
    documentName: string | undefined;
    popupIcon: iconChoise | undefined; // first popup
    openPDFButtonText: string | undefined;
    cancelPDFButtonText: string | undefined;
    firstPopup_Backdrop: number | undefined;
    secondPopup_Backdrop: number | undefined;
    confirmButtonColor: string | undefined; // first popup
    cancelButtonColor: string | undefined; // first popup
    accentColorForText: string | undefined; // first popup

    constructor(
        {
            title1 = "Справка",
            title2 = `Просмотр документа ${this.documentName}`,
            body1 = "<span>Экземпляр текста.</span>",
            document,
            icon = iconChoise.info,
            openPDF = "Открыть PDF",
            cancelPDF = "Закрыть",
            backdrop1 = 0.75,
            backdrop2 = 0.85,
            confirmColor = '#447274',
            cancelColor = 'rgb(92, 51, 97)',
            accentTextColor,
        }: {
            title1?: string | undefined;
            title2?: string | undefined;
            body1?: string | undefined;
            document?: string | undefined;
            icon?: iconChoise | undefined
            openPDF?: string | undefined;
            cancelPDF?: string | undefined;
            backdrop1?: number | undefined;
            backdrop2?: number | undefined;
            confirmColor?: string | undefined;
            cancelColor?: string | undefined;
            accentTextColor?: string | undefined;
        } = {}) {
        this.firstPopup_Title = title1;
        this.secondPopup_Title = title2;
        this.firstPopup_HTML = body1;
        this.documentName = document;
        this.popupIcon = icon;
        this.openPDFButtonText = openPDF;
        this.cancelPDFButtonText = cancelPDF;
        this.firstPopup_Backdrop = backdrop1;
        this.secondPopup_Backdrop = backdrop2;
        this.confirmButtonColor = confirmColor;
        this.cancelButtonColor = cancelColor;
        this.accentColorForText = accentTextColor;
    }
    // после того как написаны все поля - заменить переменные в методах на эти поля

    pathMap = new Map([
        ['34428-2018', '../../assets/document/ГОСТ 34428-2018.pdf#zoom=150'],
        ["34428-2018 9.3.9.8", '../../assets/document/ГОСТ 34428-2018.pdf#page=32&zoom=150']
    ]);

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
            icon: this.popupIcon,
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

// open popup on click
// outer wall advice
document.getElementById('wallClarification')
?.addEventListener('click', async ()=>{
    let text = new PDF({
        title1: "Справка",
        openPDF: 'Открыть PDF',
        cancelPDF: 'Закрыть',
        icon: iconChoise.question,
        document: "34428-2018 9.3.9.8",
    });
    if (text) {
        // await PDF.openPopupSequence(interfaceElements.GOST_34428_2018_Hint, text);
    }
});