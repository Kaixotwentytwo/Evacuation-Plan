// ru, en

export const interfaceElements = {
    OSUI: {
        file: {
            self: ['Файл', 'File'],
            open: ['Открыть', 'Open'],
            save: ['Сохранить', 'Save'],
            export: ['Экспортировать', 'Export'],
            close: ['Закрыть файл', 'Close file'],
        },
        window: {
            self: ['Окно', 'Window'],
            exit: ['Выход', 'Exit'],
            minimize: ['Свернуть', 'Minimize'],
            reload: ['Перезагрузить', 'Reload'],
            devTools: ['Открыть инструменты разработчика', 'Open developer tools'],
            // close: ['Закрыть приложение', 'Close Application'],
            // zoom: ['Изменить масштаб', 'Zoom'],
        },
        view: {
            self: ['Вид','View'],
            fullscreen: ['Полноэкранный режим', 'Toggle full screen'],
            zoomIn: ['Повысить масштаб', 'Zoom In'],
            zoomOut: ['Уменьшить масштаб', 'Zoom Out'],
            actualSize: ['Исходный масштаб', 'Reset Zoom'],
            appearence: ['Внешний вид', 'Appearance'],
        },
        edit: {
            selectClass: ['Выбрать класс объектов', 'Select Class'],
            self: ['Правка','Edit'],
            undo: ['Отменить', 'Undo'],
            redo: ['Вернуть', 'Redo'],
            cut: ['Вырезать', 'Cut'],
            copy: ['Копировать', 'Copy'],
            duplicate: ['Дублировать', 'Duplicate'],
            paste: ['Вставить', 'Paste'],
            delete: ['Удалить', 'Delete'],
            selectAll: ['Выбрать все', 'Select All'],
        },
        help: {
            guide: ["Руководство", "Guide"],
            self: ["Справка","Help"],
            about: ['О программе', 'About Application'],
            license: ['Лицензия', 'License'],
            documentation: ['Документация','Documentation'], // with gost
        },
    },
    propertiesBlock: {
        editProp: ["Редактирование свойств:", "Properties Editing:"]
    },
    clarification_wall: ["Существует два вида стен: внешние и внутренние. Они представляют собой чисто визуальное отображение того, где находятся стены без учёта масштаба и толщин этих стен. Ключевое отличие внешних стен от внутренних в том, что они изображаются визуально шире ради наглядности. <br><br> В соответствии с <a href='../../assets/document/ГОСТ 34428-2018.pdf#page=15'>ГОСТ 34428-2018 п.9.3.9.8</a> ширина внешних стен не должна превышать 3мм, а ширина внутренних стен - 1,5мм.",
        "There are two types of walls: external and internal. They represent a purely visual representation of the wall's location, without regard to scale or thickness. The key difference between external and internal walls is that they are visually drawn wider for clarity. According to <a href='../../assets/document/ГОСТ 34428-2018.pdf#page=15'>GOST 34428-2018 p.9.3.9.8</a> width of the outer walls should be less than 3mm, inner wall though - less than 1.5mm."
    ],
    clarification_outWall: ["В соответствии с ГОСТ рекомендованная толщина не более 3мм и не менее ширины внутренних стен.",
        "According to GOST, the recommended thickness is no more than 3 mm and no less than the width of internal walls."
    ],
    clarification_inWall: ["В соответствии с ГОСТ рекомендованная толщина не более 1.5мм",
        "According to GOST, the recommended thickness in no more than 1.5mm."
    ],
    clarification_door: ["Зачем нужен такой объект как дверной проём, когда можно просто оставить расстояние между двумя стенами, идущими вдоль линии? Основное его назначение в указании границы помещения алгоритму автоматической генерации эвакуационных путей.", 'empty'],
    clarification_window: ["Объект окно так же как и стены носит чисто поясняющий характер. Не имеет много смысла пытаться нарисовать окно правильных размеров, объект должен лишь служить обозначением того, где оно есть.", 'empty'],
    clarification_obstacle: ["Это может быть что угодно: от столов и парт, до стилажей. Основная цель этого объекта на плане указать, как маршрут эвакуции может быть затруднён из-за посторонних объектов.", 'empty'],
    gridText: ["Размер сетки:", "Grid Size:"],
    zoomText: ["Степерь приближения:", "Zoom:"],
    clarification_scale: [''],
    GOST_34428_2018_Hint: `
            <span style="font-family: sans-serif;">
            Существует два вида стен: внешние и внутренние.<br>
            Они представляют собой чисто визуальное отображение того, где находятся стены без учёта масштаба и толщин этих стен.<br>
            Ключевое отличие внешних стен от внутренних в том, что они изображаются визуально шире ради наглядности.<br>
            В соответствии с <strong style="color: #63aaad">ГОСТ 34428-2018 п.9.3.9.8</strong> ширина внешних стен не должна превышать 3 мм, а ширина внутренних стен - 1,5 мм.
            </span>`
}