// code - код знака
// url - ссылка на svg
// meaning - название знака, его смысловое значение
// meaning_short - неоффициальное название знака, которое будет использоваться в легенде для упрощения, 
// потому что оффициальное обычно очень длинное
// place_recommendations - рекомендации по установке знака, будь то физически или на плане
// vital - обязателен ли символ к размещению в легенде
// elevator - для лифта - создаст отдельную легенду 

const iconsMap = new Set();
iconsMap.add(
    {
        code: "mainExit",
        url: "idk",
        meaning: "Путь к основному эвакуационному выходу",
        meaning_short: meaning,
        place_recommendations: "idk",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "otherExit",
        url: "idk",
        meaning: "Путь к основному запасному выходу",
        meaning_short: meaning,
        place_recommendations: "idk",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "you",
        url: "idk",
        meaning: "Вы находитесь здесь",
        meaning_short: meaning,
        place_recommendations: "Располагать в месте предполагаемого расположения эвакуационного плана",
        vital: true,
        category: "prohibitive"
    },
    
    // prohibitive
    {
        code: "Р01",
        url: "../assets/svg/p01.svg",
        meaning: "Запрещается курить",
        meaning_short: meaning,
        place_recommendations: "Использовать, когда курение может стать причиной пожара. На дверях и стенах помещений, участках, где имеются горючие и легковоспламеняющиеся вещества, или в помещениях, где курить запрещается",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "Р02",
        url: "../assets/svg/p02.svg",
        meaning: "Запрещается пользоваться открытым огнем и курить",
        meaning_short: meaning,
        place_recommendations: "Использовать, когда открытый огонь и курение могут стать причиной пожара. На входных дверях, стенах помещений, участках, рабочих местах, емкостях, производственной таре",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "Р03",
        url: "../assets/svg/p03.svg",
        meaning: "Проход запрещен",
        meaning_short: meaning,
        place_recommendations: "У входа в опасные зоны, помещения, участки и др.",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P04",
        url: "../assets/svg/p04.svg",
        meaning: "Запрещается тушить водой",
        meaning_short: meaning,
        place_recommendations: "В местах расположения электрооборудования, складах и других местах, где нельзя применять воду при тушении горения или пожара",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P05",
        url: "../assets/svg/p05.svg",
        meaning: "Запрещается использовать в качестве питьевой воды",
        meaning_short: "Запрещается пить",
        place_recommendations: "На техническом водопроводе и емкостях с технической водой, непригодной для питья и бытовых нужд",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P06",
        url: "../assets/svg/p06.svg",
        meaning: "Доступ посторонним запрещен",
        meaning_short: meaning,
        place_recommendations: "На дверях помещений, у входа на объекты, участки и т.п. для обозначения запрета на вход (проход) в опасные зоны или для обозначения служебного входа (прохода)",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P07",
        url: "../assets/svg/p07.svg",
        meaning: "Запрещается движение средств напольного транспорта",
        meaning_short: "Запрещается использование транспорта",
        place_recommendations: "В тех местах, где запрещается применять средства напольного транспорта (например, погрузчики или напольные транспортеры)",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P08",
        url: "../assets/svg/p08.svg",
        meaning: "Запрещается прикасаться. Опасно",
        meaning_short: "Запрещается прикасаться",
        place_recommendations: "На оборудовании (узлах оборудования), дверцах, щитах или других поверхностях, прикосновение к которым опасно",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P09",
        url: "../assets/svg/p09.svg",
        meaning: "Запрещается прикасаться. Корпус под напряжением",
        meaning_short: "Запрещается прикасаться",
        place_recommendations: "На поверхности корпусов, щитов и т.п., где есть возможность поражения электрическим током",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P10",
        url: "../assets/svg/p10.svg",
        meaning: "Не включать!",
        meaning_short: meaning,
        place_recommendations: "На пультах управления и включения оборудования или механизмов, при ремонтных и пусконаладочных работах",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P11",
        url: "../assets/svg/p11.svg",
        meaning: "Запрещается работа (присутствие) людей со стимуляторами сердечной деятельности",
        meaning_short: "Запрещается присутствие людей с сердечными стимуляторами",
        place_recommendations: "В местах и на оборудовании, где запрещено работать или находиться людям с вживленными стимуляторами сердечной деятельности",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P12",
        url: "../assets/svg/p12.svg",
        meaning: "Запрещается загромождать проходы и/или складировать",
        meaning_short: "Запрещается загромождать проходы",
        place_recommendations: "На пути эвакуации, у выходов, в местах размещения средств противопожарной защиты, аптечек первой медицинской помощи и других местах",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P13",
        url: "../assets/svg/p13.svg",
        meaning: "Запрещается подъем (спуск) людей по шахтному стволу (запрещается транспортирование пассажиров)",
        meaning_short: "Запрещается пользоваться грузовым лифтом",
        place_recommendations: "На дверях грузовых лифтов и других подъемных механизмов",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P14",
        url: "../assets/svg/p14.svg",
        meaning: "Запрещается вход (проход) с животными",
        meaning_short: "Запрещается проход с животными",
        place_recommendations: "На воротах и дверях зданий, сооружений, помещений, объектов, территорий и т.п., где не должны находиться животные и где запрещен вход (проход) вместе с животными",
        vital: true,
        category: "prohibitive"
    },
    { // l8r
        code: "P15",
        url: "../assets/svg/p0_.svg",
        meaning: "",
        meaning_short: meaning,
        place_recommendations: "",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P16",
        url: "../assets/svg/p16.svg",
        meaning: "Запрещается работа (присутствие) людей, имеющих металлические импланты",
        meaning_short: "Запрещается присутствие людей с металлическими имплантами",
        place_recommendations: "На местах, участках и оборудовании, где запрещено работать или находиться людям с вживленными металлическими имплантами",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P17",
        url: "../assets/svg/p17.svg",
        meaning: "Запрещается разбрызгивать воду",
        meaning_short: meaning,
        place_recommendations: "На местах и участках, где запрещено разбрызгивать воду",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P18",
        url: "../assets/svg/p18.svg",
        meaning: "Запрещается пользоваться мобильным (сотовым) телефоном или переносной рацией",
        meaning_short: "Запрещается пользоваться средствами связи",
        place_recommendations: "На дверях помещений, у входа на объекты, где запрещено пользоваться средствами связи, имеющими собственные радиочастотные электромагнитные поля",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P21",
        url: "../assets/svg/p21.svg",
        meaning: "Запрещение (прочие опасности или опасные действия)",
        meaning_short: "Запрет",
        place_recommendations: "Применять для обозначения опасности, не предусмотренной настоящим стандартом. Знак необходимо использовать вместе с поясняющей надписью или с дополнительным знаком безопасности с поясняющей надписью",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P27",
        url: "../assets/svg/p27.svg",
        meaning: "Запрещается иметь при (на) себе металлические предметы (часы и т.п.)",
        meaning_short: "Запрещается иметь металлические предметы",
        place_recommendations: "При входе на объекты, на рабочих местах, оборудовании, приборах и т.п. Область применения знака может быть расширена",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P30",
        url: "../assets/svg/p30.svg",
        meaning: "Запрещается принимать пищу",
        meaning_short: meaning,
        place_recommendations: "На местах и участках работ с вредными для здоровья веществами, а также в тех местах, где прием пищи запрещен. Область применения знака может быть расширена",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P32",
        url: "../assets/svg/p32.svg",
        meaning: "Запрещается подходить к элементам оборудования с маховыми движениями большой амплитуды",
        meaning_short: "Запрещается приближаться к движущимся механизмам",
        place_recommendations: "На оборудовании и рабочих местах по обслуживанию оборудования с элементами, выполняющими маховые движения большой амплитуды",
        vital: true,
        category: "prohibitive"
    },
    {
        code: "P33",
        url: "../assets/svg/p33.svg",
        meaning: "Запрещается брать руками. Сыпучая масса (непрочная упаковка)",
        meaning_short: "Запрещается брать руками",
        place_recommendations: "На производственной таре, в складах и иных местах, где используют сыпучие материалы",
        vital: false,
        category: "prohibitive"
    },
    {
        code: "P34",
        url: "../assets/svg/p34.svg",
        meaning: "Запрещается пользоваться лифтом для подъема (спуска) людей",
        meaning_short: "Запрещается пользоваться лифтом",
        place_recommendations: 'На дверях грузовых лифтов и других подъемных механизмах. Знак входит в состав группового знака безопасности "При пожаре лифтом не пользоваться, выходить по лестнице"',
        vital: true,
        elevator: true,
        category: "prohibitive"
    },
    
    // warninging signs
    {
        code: "W01",
        url: "../assets/svg/w01.svg",
        meaning: "Пожароопасно. Легковоспламеняющиеся вещества",
        meaning_short: "Легковоспламеняющиеся вещества",
        place_recommendations: "Использовать для привлечения внимания к помещениям с легковоспламеняющимися веществами. На входных дверях, дверцах шкафов, емкостях и т.д.",
        vital: true,
        category: "warning"
    },
    {
        code: "W02",
        url: "../assets/svg/w02.svg",
        meaning: "Взрывоопасно",
        meaning_short: meaning,
        place_recommendations: "Использовать для привлечения внимания к взрывоопасным веществам, а также к помещениям и участкам. На входных дверях, стенах помещений, дверцах шкафов и т.д.",
        vital: true,
        category: "warning"
    },
    {
        code: "W03",
        url: "../assets/svg/w03.svg",
        meaning: "Опасно. Ядовитые вещества",
        meaning_short: "Ядовитые вещества",
        place_recommendations: "",
        vital: true,
        category: "warning"
    },
    {
        code: "W04",
        url: "../assets/svg/w04.svg",
        meaning: "Опасно. Едкие и коррозионные вещества",
        meaning_short: "Кислота",
        place_recommendations: "В местах хранения, выделения, производства и применения едких и коррозионных веществ",
        vital: true,
        category: "warning"
    },
    {
        code: "W05",
        url: "../assets/svg/w05.svg",
        meaning: "Опасно. Радиоактивные вещества или ионизирующее излучение",
        meaning_short: "Радиоактивные вещества",
        place_recommendations: "На дверях помещений, дверцах шкафов и в других местах, где находятся и применяются радиоактивные вещества или имеется ионизирующее излучение. Допускается применять знак радиационной опасности по ГОСТ 17925",
        vital: true,
        category: "warning"
    },
    {
        code: "W06",
        url: "../assets/svg/w06.svg",
        meaning: "Опасно. Возможно падение груза",
        meaning_short: "Возможно падение груза",
        place_recommendations: "Вблизи опасных зон, где используют подъемно-транспортное оборудование, на строительных площадках, участках, в цехах, мастерских и т.п.",
        vital: true,
        category: "warning"
    },
    {
        code: "W07",
        url: "../assets/svg/w07.svg",
        meaning: "Внимание. Автопогрузчик",
        meaning_short: meaning,
        place_recommendations: "В помещениях и участках, где проводят погрузочно-разгрузочные работы",
        vital: true,
        category: "warning"
    },
    {
        code: "W08",
        url: "../assets/svg/.svg",
        meaning: "Опасность поражения электрическим током",
        meaning_short: meaning,
        place_recommendations: "На опорах линий электропередачи, электрооборудовании и приборах, дверцах силовых щитков, на электротехнических панелях и шкафах, а также на ограждениях токоведущих частей оборудования, механизмов, приборов",
        vital: true,
        category: "warning"
    },
    {
        code: "W09",
        url: "../assets/svg/.svg",
        meaning: "Внимание. Опасность (прочие опасности)",
        meaning_short: "Внимание. Опасность",
        place_recommendations: "Применять для привлечения внимания к прочим видам опасности, не обозначенной настоящим стандартом. Знак необходимо использовать вместе с дополнительным знаком безопасности с поясняющей надписью",
        vital: true,
        category: "warning"
    },
    {
        code: "W10",
        url: "../assets/svg/.svg",
        meaning: "Опасно. Лазерное излучение",
        meaning_short: "Лазерное излучение",
        place_recommendations: "На дверях помещений, оборудовании, приборах и в других местах, где имеется лазерное излучение",
        vital: true,
        category: "warning"
    },
    {
        code: "W11",
        url: "../assets/svg/.svg",
        meaning: "Пожароопасно. Окислитель",
        meaning_short: meaning,
        place_recommendations: "На дверях помещений, дверцах шкафов для привлечения внимания на наличие окислителя",
        vital: true,
        category: "warning"
    },
    {
        code: "W12",
        url: "../assets/svg/.svg",
        meaning: "Внимание. Электромагнитное поле",
        meaning_short: "Электромагнитное поле",
        place_recommendations: "На дверях помещений, оборудовании, приборах и в других местах, где действуют электромагнитные поля",
        vital: true,
        category: "warning"
    },
    {
        code: "W13",
        url: "../assets/svg/.svg",
        meaning: "	Внимание. Магнитное поле",
        meaning_short: "Магнитное поле",
        place_recommendations: "На дверях помещений, оборудовании, приборах и в других местах, где действуют магнитные поля",
        vital: true,
        category: "warning"
    },
    {
        code: "W14",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Малозаметное препятствие",
        meaning_short: "Малозаметное препятствие",
        place_recommendations: "В тех местах, где имеются малозаметные препятствия, о которые можно споткнуться",
        vital: true,
        category: "warning"
    },
    {
        code: "W15",
        url: "../assets/svg/.svg",
        meaning: "	Осторожно. Возможность падения с высоты",
        meaning_short: "Возможность падения с высоты",
        place_recommendations: "Перед входом на опасные участки и в местах, где возможно падение с высоты",
        vital: true,
        category: "warning"
    },
    {
        code: "W16",
        url: ["../assets/svg/w16_2.svg", "../assets/svg/w16_1.svg"],
        meaning: "Осторожно. Биологическая опасность (инфекционные вещества)",
        meaning_short: "Биологическая опасность",
        place_recommendations: "В местах хранения, производства или применения вредных для здоровья биологических веществ",
        vital: true,
        category: "warning"
    },
    {
        code: "W17",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Холод",
        meaning_short: meaning,
        place_recommendations: "На дверцах холодильников и морозильных камер, компрессорных агрегатах и других холодильных аппаратах",
        vital: true,
        category: "warning"
    },
    {
        code: "W18",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Вредные для здоровья аллергические (раздражающие) вещества",
        meaning_short: "Вредные для здоровья аллергены",
        place_recommendations: "В местах хранения, производства или применения вредных для здоровья аллергических (раздражающих) веществ",
        vital: true,
        category: "warning"
    },
    {
        code: "W19",
        url: "../assets/svg/.svg",
        meaning: "Газовый баллон",
        meaning_short: meaning,
        place_recommendations: "На газовых баллонах, складах и участках хранения и применения сжатых или сжиженных газов. Цвет баллона: черный или белый, выбирается по ГОСТ 19433",
        vital: true,
        category: "warning"
    },
    {
        code: "W20",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Аккумуляторные батареи",
        meaning_short: "Аккумуляторные батареи",
        place_recommendations: "В помещениях и на участках изготовления, хранения и применения аккумуляторных батарей",
        vital: true,
        category: "warning"
    },
    {
        code: "W22",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Режущие валы",
        meaning_short: "Режущие валы",
        place_recommendations: "На участках работ и оборудовании, имеющем незащищенные режущие валы, например на деревообрабатывающем, дорожном или сельскохозяйственном оборудовании",
        vital: true,
        category: "warning"
    },
    {
        code: "W23",
        url: "../assets/svg/.svg",
        meaning: "Внимание. Опасность зажима",
        meaning_short: "Опасность зажима",
        place_recommendations: "На дверцах турникетов и шлагбаумах",
        vital: true,
        category: "warning"
    },
    {
        code: "W24",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Возможно опрокидывание",
        meaning_short: "Возможно опрокидывание",
        place_recommendations: "На дорогах, рампах, складах, участках, где возможно опрокидывание внутризаводского транспорта",
        vital: true,
        category: "warning"
    },
    {
        code: "W25",
        url: "../assets/svg/.svg",
        meaning: "Внимание. Автоматическое включение (запуск) оборудования",
        meaning_short: "Автоматический запуск оборудования",
        place_recommendations: "На рабочих местах, оборудовании или отдельных узлах оборудования с автоматическим включением",
        vital: true,
        category: "warning"
    },
    {
        code: "W26",
        url: "../assets/svg/.svg",
        meaning: "",
        meaning_short: meaning,
        place_recommendations: "",
        vital: true,
        category: "warning"
    },
    {
        code: "W27",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Возможно травмирование рук",
        meaning_short: "Возможно травмирование рук",
        place_recommendations: "На оборудовании, узлах оборудования, крышках и дверцах, где возможно получить травму рук",
        vital: true,
        category: "warning"
    },
    {
        code: "W28",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Скользко",
        meaning_short: "Скользко",
        place_recommendations: "На территории и участках, где имеются скользкие места",
        vital: true,
        category: "warning"
    },
    {
        code: "W29",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Возможно затягивание между вращающимися элементами",
        meaning_short: "Возможно затягивание между вращающимися элементами",
        place_recommendations: "На рабочих местах и оборудовании, имеющем вращающиеся элементы, например, на валковых мельницах",
        vital: true,
        category: "warning"
    },
    {
        code: "W30",
        url: "../assets/svg/.svg",
        meaning: "Осторожно. Сужение проезда (прохода)",
        meaning_short: "Сужение прохода",
        place_recommendations: "На территориях, участках, в цехах и складах, где имеются сужения прохода (проезда) или присутствуют выступающие конструкции, затрудняющие проход (проезд)",
        vital: true,
        category: "warning"
    },
    
    // mandatory
    {
        code: "M01",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитных очках",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и участках, где требуется защита органов зрения",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M02",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитной каске (шлеме)",
        meaning_short: "Работать в шлеме",
        place_recommendations: "На рабочих местах и участках, где требуется защита головы",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M03",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитных наушниках",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и участках с повышенным уровнем шума",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M04",
        url: "../assets/svg/.svg",
        meaning: "Работать в средствах индивидуальной защиты органов дыхания",
        meaning_short: "Работать в СИЗ органов дыхания",
        place_recommendations: "На рабочих местах и участках, где требуется защита органов дыхания",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M05",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитной обуви",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и участках, где необходимо применять средства индивидуальной защиты",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M06",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитных перчатках",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и участках работ, где требуется защита рук от воздействия вредных или агрессивных сред, защита от возможного поражения электрическим током",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M07",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитной одежде",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и участках, где необходимо применять средства индивидуальной защиты",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M08",
        url: "../assets/svg/.svg",
        meaning: "Работать в защитном щитке",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и участках, где необходима защита лица и органов зрения",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M09",
        url: "../assets/svg/.svg",
        meaning: "Работать в предохранительном (страховочном) поясе",
        meaning_short: "Работать в страховочном поясе",
        place_recommendations: "На рабочих местах и участках, где для безопасной работы требуется применение предохранительных (страховочных) поясов",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M10",
        url: "../assets/svg/.svg",
        meaning: "Проход здесь",
        meaning_short: meaning,
        place_recommendations: "На территориях и участках, где разрешается проход",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M11",
        url: "../assets/svg/.svg",
        meaning: "Общий предписывающий знак (прочие предписания)",
        meaning_short: "Общий предписывающий знак",
        place_recommendations: "Для предписаний, не обозначенных настоящим стандартом. Знак необходимо применять вместе с поясняющей надписью на дополнительном знаке безопасности",
        vital: false,
        category: "mandatory"
    },
    {
        code: "M12",
        url: "../assets/svg/.svg",
        meaning: "Переходить по надземному переходу",
        meaning_short: meaning,
        place_recommendations: "На участках и территориях, где установлены надземные переходы",
        vital: true,
        category: "mandatory"
    },
    {
        code: "M13",
        url: "../assets/svg/.svg",
        meaning: "Отключить штепсельную вилку",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и оборудовании, где требуется отключение от электросети при наладке или остановке электрооборудования и в других случаях",
        vital: false,
        category: "mandatory"
    },
    {
        code: "M14",
        url: "../assets/svg/.svg",
        meaning: "Отключить перед работой",
        meaning_short: meaning,
        place_recommendations: "На рабочих местах и оборудовании при проведении ремонтных или пусконаладочных работ",
        vital: true,
        category: "mandatory"
    },
    
    // fire safety
    {
        code: "F01-01",
        url: "../assets/svg/.svg",
        meaning: "Направляющая стрелка",
        meaning_short: meaning,
        place_recommendations: "Использовать только вместе с другими знаками пожарной безопасности для указания направления движения к месту нахождения (размещения) средства противопожарной защиты",
        vital: false,
        category: "fire_safety"
    },
    {
        code: "F01-02",
        url: "../assets/svg/.svg",
        meaning: "Направляющая стрелка под углом 45°",
        meaning_short: "Направляющая стрелка",
        place_recommendations: "",
        vital: false,
        category: "fire_safety"
    },
    {
        code: "F02",
        url: "../assets/svg/.svg",
        meaning: "Пожарный кран",
        meaning_short: meaning,
        place_recommendations: "В местах нахождения комплекта пожарного крана с пожарным рукавом и стволом",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F03",
        url: "../assets/svg/.svg",
        meaning: "Пожарная лестница",
        meaning_short: meaning,
        place_recommendations: "В местах нахождения пожарной лестницы",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F04",
        url: "../assets/svg/.svg",
        meaning: "Огнетушитель",
        meaning_short: meaning,
        place_recommendations: "В местах размещения огнетушителя",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F05",
        url: "../assets/svg/.svg",
        meaning: "Телефон для использования при пожаре (в том числе телефон прямой связи с пожарной охраной)",
        meaning_short: "Телефон",
        place_recommendations: "В местах размещения телефона, по которому можно вызвать пожарную охрану",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F06",
        url: "../assets/svg/.svg",
        meaning: "Место размещения нескольких средств противопожарной защиты",
        meaning_short: "Место размещения средств противопожарной защиты",
        place_recommendations: "В местах одновременного нахождения (размещения) нескольких средств противопожарной защиты",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F07",
        url: "../assets/svg/.svg",
        meaning: "Пожарный водоисточник",
        meaning_short: meaning,
        place_recommendations: "В местах нахождения пожарного водоема или пирса для пожарных машин",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F08",
        url: "../assets/svg/.svg",
        meaning: "Пожарный сухотрубный стояк",
        meaning_short: meaning,
        place_recommendations: "В местах нахождения пожарного сухотрубного стояка",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F09",
        url: "../assets/svg/.svg",
        meaning: "Пожарный гидрант",
        meaning_short: meaning,
        place_recommendations: "У мест нахождения подземных пожарных гидрантов. На знаке должны быть цифры, обозначающие расстояние от знака до гидранта, м. Расстояние от знака до края проезда пожарных автомобилей должно быть не более расстояния опознавания знака",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F10",
        url: "../assets/svg/.svg",
        meaning: "Кнопка включения установок (систем) пожарной автоматики",
        meaning_short: "Кнопка включения систем пожарной автоматики",
        place_recommendations: "В местах ручного пуска установок пожарной сигнализации, пожаротушения и (или) систем противодымной защиты. В местах (пунктах) подачи сигнала пожарной тревоги",
        vital: true,
        category: "fire_safety"
    },
    {
        code: "F11",
        url: "../assets/svg/.svg",
        meaning: "Звуковой оповещатель пожарной тревоги",
        meaning_short: meaning,
        place_recommendations: 'В местах нахождения звукового оповещателя или совместно со знаком F10 "Кнопка включения установок (систем) пожарной автоматики"',
        vital: true,
        category: "fire_safety"
    },
    
    //evacuation
    {
        code: "E01-01",
        url: "../assets/svg/.svg",
        meaning: "Выход здесь (левосторонний)",
        meaning_short: "Выход здесь",
        place_recommendations: "Над дверями (или на дверях) эвакуационных выходов, открывающихся с левой стороны. На стенах помещений вместе с направляющей стрелкой для указания направления движения к эвакуационному выходу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E01-02",
        url: "../assets/svg/.svg",
        meaning: "Выход здесь",
        meaning_short: "Выход здесь (правосторонний)",
        place_recommendations: "Над дверями (или на дверях) эвакуационных выходов, открывающихся с правой стороны. На стенах помещений вместе с направляющей стрелкой для указания направления движения к эвакуационному выходу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E02-01",
        url: "../assets/svg/.svg",
        meaning: "Направляющая стрелка",
        meaning_short: meaning,
        place_recommendations: "Использовать только вместе с другими эвакуационными знаками для указания направления движения",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E02-02",
        url: "../assets/svg/.svg",
        meaning: "Направляющая стрелка под углом 45°",
        meaning_short: "Направляющая стрелка",
        place_recommendations: "Использовать только вместе с другими эвакуационными знаками для указания направления движения",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E03",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу направо",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На стенах помещений для указания направления движения к эвакуационному выходу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E04",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу налево",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На стенах помещений для указания направления движения к эвакуационному выходу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E05",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу направо вверх",
        meaning_short: "Направление к эвакуационному",
        place_recommendations: "На стенах помещений для указания направления движения к эвакуационному выходу по наклонной плоскости",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E06",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу налево вверх",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На стенах помещений для указания направления движения к эвакуационному выходу по наклонной плоскости",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E07",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу направо вниз",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На стенах помещений для указания направления движения к эвакуационному выходу по наклонной плоскости",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E08",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу налево вниз",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На стенах помещений для указания направления движения к эвакуационному выходу по наклонной плоскости",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E09",
        url: "../assets/svg/.svg",
        meaning: "Указатель двери эвакуационного выхода (правосторонний)",
        meaning_short: "Указатель двери эвакуационного выхода",
        place_recommendations: "Над дверями эвакуационных выходов",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E10",
        url: "../assets/svg/.svg",
        meaning: "Указатель двери эвакуационного выхода (левосторонний)",
        meaning_short: "Указатель двери эвакуационного выхода",
        place_recommendations: "Над дверями эвакуационных выходов",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E11",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу прямо",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "Над проходами, проемами, в помещениях большой площади. Размещается на верхнем уровне или подвешивается к потолку",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E12",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу прямо",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "Над проходами, проемами, в помещениях большой площади. Размещается на верхнем уровне или подвешивается к потолку",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E13",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу по лестнице вниз",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На лестничных площадках и стенах, прилегающих к лестничному маршу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E14",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу по лестнице вниз",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На лестничных площадках и стенах, прилегающих к лестничному маршу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E15",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу по лестнице вверх",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На лестничных площадках и стенах, прилегающих к лестничному маршу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E16",
        url: "../assets/svg/.svg",
        meaning: "Направление к эвакуационному выходу по лестнице вверх",
        meaning_short: "Направление к эвакуационному выходу",
        place_recommendations: "На лестничных площадках и стенах, прилегающих к лестничному маршу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E17",
        url: "../assets/svg/.svg",
        meaning: "Для доступа вскрыть здесь",
        meaning_short: meaning,
        place_recommendations: "На дверях, стенах помещений и в других местах, где для доступа в помещение или выхода необходимо вскрыть определенную конструкцию, например разбить стеклянную панель и т.п.",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E18",
        url: "../assets/svg/.svg",
        meaning: "Открывать движением от себя",
        meaning_short: meaning,
        place_recommendations: "На дверях помещений для указания направления открывания дверей",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E19",
        url: "../assets/svg/.svg",
        meaning: "Открывать движением на себя",
        meaning_short: meaning,
        place_recommendations: "На дверях помещений для указания направления открывания дверей",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E20",
        url: "../assets/svg/.svg",
        meaning: "Для открывания сдвинуть",
        meaning_short: meaning,
        place_recommendations: "На дверях помещений для обозначения действий по открыванию сдвижных дверей",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E21",
        url: "../assets/svg/.svg",
        meaning: "Пункт (место) сбора",
        meaning_short: "Место сбора",
        place_recommendations: "На дверях, стенах помещений и в других местах для обозначения заранее предусмотренных пунктов (мест) сбора людей в случае возникновения пожара, аварии или другой чрезвычайной ситуации",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E22",
        url: "../assets/svg/.svg",
        meaning: "Указатель выхода",
        meaning_short: meaning,
        place_recommendations: "Над дверями эвакуационного выхода или в составе комбинированных знаков безопасности для указания направления движения к эвакуационному выходу",
        vital: true,
        category: "evacuation"
    },
    {
        code: "E23",
        url: "../assets/svg/.svg",
        meaning: "Указатель аварийного выхода",
        meaning_short: meaning,
        place_recommendations: "Над дверями аварийного выхода",
        vital: true,
        category: "evacuation"
    },
    
    // medical and sanitar signs
    {
        code: "EC01",
        url: "../assets/svg/.svg",
        meaning: "Аптечка первой медицинской помощи",
        meaning_short: "Аптечка",
        place_recommendations: "На стенах, дверях помещений для обозначения мест размещения аптечек первой медицинской помощи",
        vital: true,
        category: "aid"
    },
    {
        code: "EC02",
        url: "../assets/svg/.svg",
        meaning: "Средства выноса (эвакуации) пораженных",
        meaning_short: "Средства эвакуации пораженных",
        place_recommendations: "На дверях и стенах помещений в местах размещения средств выноса (эвакуации) пораженных",
        vital: true,
        category: "aid"
    },
    {
        code: "EC03",
        url: "../assets/svg/.svg",
        meaning: "Пункт приема гигиенических процедур (душевые)",
        meaning_short: "Душевые",
        place_recommendations: "На дверях и стенах помещений в местах расположения душевых и т.п.",
        vital: true,
        category: "aid"
    },
    {
        code: "EC04",
        url: "../assets/svg/.svg",
        meaning: "Пункт обработки глаз",
        meaning_short: "Пункт обработки глаз",
        place_recommendations: "На дверях и стенах помещений в местах расположения пункта обработки глаз",
        vital: true,
        category: "aid"
    },
    {
        code: "EC05",
        url: "../assets/svg/.svg",
        meaning: "Медицинский кабинет",
        meaning_short: "Медкабинет",
        place_recommendations: "На дверях медицинских кабинетов",
        vital: true,
        category: "aid"
    },
    {
        code: "EC06",
        url: "../assets/svg/.svg",
        meaning: "Телефон связи с медицинским пунктом (скорой медицинской помощью)",
        meaning_short: "Телефон",
        place_recommendations: "В местах установки телефонов",
        vital: true,
        category: "aid"
    },
    
    {
        code: "D01",
        url: "../assets/svg/.svg",
        meaning: "Пункт (место) приема пищи",
        meaning_short: "Место приема пищи",
        place_recommendations: "На дверях комнат приема пищи, буфетах, столовых, бытовых помещениях и в других местах, где разрешается прием пищи",
        vital: true,
        category: "aid"
    },
    {
        code: "D02",
        url: "../assets/svg/.svg",
        meaning: "Питьевая вода",
        meaning_short: meaning,
        place_recommendations: "На дверях бытовых помещений и в местах расположения кранов с водой, пригодной для питья и бытовых нужд (туалеты, душевые, пункты приема пищи и т.д.)",
        vital: true,
        category: "aid"
    },
    {
        code: "D03",
        url: "../assets/svg/.svg",
        meaning: "Место курения",
        meaning_short: meaning,
        place_recommendations: "Используется для обозначения места курения",
        vital: true,
        category: "aid"
    }
);