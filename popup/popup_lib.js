'use strict';

//<script src="popup_lib.js"></script>

//pid
//animationType
//toggle
//lifes
//turnON & turnOFF
//popupOpenStyle & popupCloseStyle


let // постоянные переменные
    popup = document.querySelectorAll('.popup'), // тело попапа
    popupSwitch = document.querySelectorAll('.popupSwitch'), // переключатель попапа
    
    stateAttribute = "popupState",
    anim = "animationType",
    tg = "toggle"
;

// Создание связей между попапами
popupSwitch.forEach(e => e.addEventListener('click', PopupSwitch));

//// starts when dom's loaded idk for what purpose
//document.addEventListener('DOMContentLoaded', function() {popupinitialization();});

// can switch popup at the dom loads in
function popupinitialization() {
    if ((popup.length > 0) && (popupSwitch.length > 0)) {
        popupSwitch.forEach(switcher => {
            if ((switcher.hasAttribute("popupState")) && (switcher.getAttribute("popupState")=="true")) {
                let localpid = switcher.getAttribute("pid");
                PopupSwitchID(localpid);
            }
        });
    }
}

// Переключение popup нажатием на popupSwitch
function PopupSwitch()
{
    function cf(e) {e.setAttribute(stateAttribute, "false");} // установка popupState на false
    function ct(e) {e.setAttribute(stateAttribute, "true");} // установка popupState на true
    
    if (this != undefined) 
    {
        // Локальные переменные
        let state, pid, at = "none",
        zIndexMax = 1000,
        toggableParams = [];
        let sizeX = window.innerWidth;
        let sizeY = window.innerHeight;
        
        // ID попапа
        if (this.hasAttribute('pid')) {pid = this.getAttribute("pid");}
        
        // z-index
        if (this.hasAttribute("zIndexMax") || this.hasAttribute("ZIndexMax") || this.hasAttribute("zindexmax") || this.hasAttribute("z-index-max")) {
            if (this.hasAttribute("zIndexMax")) {zIndexMax = this.getAttribute("zIndexMax");}
            if (this.hasAttribute("ZIndexMax")) {zIndexMax = this.getAttribute("ZIndexMax");}
            if (this.hasAttribute("zindexmax")) {zIndexMax = this.getAttribute("zindexmax");}
            if (this.hasAttribute("z-index-max")) {zIndexMax = this.getAttribute("z-index-max");}
        }
        
        // Анимация попапа
        if (this.hasAttribute(anim)) {at = this.getAttribute(anim);}
        
        // Изменяемые параметры
        if (this.hasAttribute(tg)) {
            let initialValueOfToggleParams = this.getAttribute(tg);
            
            initialValueOfToggleParams = initialValueOfToggleParams.replaceAll("[","");
            initialValueOfToggleParams = initialValueOfToggleParams.replaceAll("]","");
            initialValueOfToggleParams = initialValueOfToggleParams.replaceAll(" ","");
            initialValueOfToggleParams = initialValueOfToggleParams.toLowerCase();
            
            // , indeed
            if (initialValueOfToggleParams.includes(",")) {
                toggableParams = initialValueOfToggleParams.split(",");
            }
            // ; indeed
            if (initialValueOfToggleParams.includes(";")) {
                toggableParams = initialValueOfToggleParams.split(";");
            }
        }

        // ошибка при вызове попапа откуда-то не оттуда
        if ((this != undefined) && this.hasAttribute(stateAttribute)) 
            {state = this.getAttribute(stateAttribute);}
        else {
            this.setAttribute(stateAttribute, true);
            state = true;
            console.log("Фукнция вызывается от лица неизвестного объекта");
        }

        // основной код
        popup.forEach(e => {
            let trueStatements = ["ScaleX(1)", "ScaleY(1)", "Scale(1)", "translateX(0)", "rotate(0deg)"];
            let falseStatements = ["ScaleX(0)", "ScaleY(0)", "Scale(0)"];
            //let animationList = ["opacity", "squishToX", "squishToY", "scaling", "moveLeft", "moveRight", "moveUp", "moveDown", "rotate"];
            if (e.attributes['pid'].nodeValue == this.attributes["pid"].nodeValue) {
                
                // z-index
                if (toggableParams.includes("z-index") || toggableParams.includes("zindex") || toggableParams.includes("z")) {
                    switch (state) {
                        case "true": // Выключение
                            e.style.zIndex = "-1000";
                            cf(this);
                            break;
                        case "false": // Включение
                            e.style.zIndex = zIndexMax;
                            ct(this);
                            break;
                    }
                }
                
                // =-= ANIMATION PART =-=
                switch (at)
                {                        
                    //
                    case "opacity":
                        switch (state) {
                            case "true": // Выключение
                                e.style.opacity = 0;
                                setTimeout(function(){e.style.display = "none";}, 200);
                                cf(this);
                                break;
                                
                            case "false": // Включение
                                e.style.display = "block";
                                setTimeout(function(){e.style.opacity = 1;}, 200);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "squishToY":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", falseStatements[0]);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[0]);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "squishToX":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", falseStatements[1]);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[1]);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "scalling":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", falseStatements[2]);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[2]);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveLeft":
                        let x = e.getBoundingClientRect().right;
                        let diffL = sizeX - x;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateX(${-1*diffL}px)`);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveRight":
                        let xx = e.getBoundingClientRect().left;
                        let diffR = sizeX - xx;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateX(${diffR}px)`);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveUp":
                        let y = e.getBoundingClientRect().bottom;
                        let diffU = sizeY - y;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateY(${-1*y}px)`);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(this);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveDown":
                        let yy = e.getBoundingClientRect().top;
                        let diffD = sizeY - yy;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateY(${diffD}px)`);
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(this);
                                break;
                        }
                        break;
                    //
                    
                    //
                    case "rotate":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", "rotate(180deg) scale(0)");
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[4]);
                                ct(this);
                                break;
                        }
                        break;
                    //
                    
                    //
                    default:
                        switch (state) {
                            case "true": // Выключение
                                e.style.visibility = "hidden";
                                cf(this);
                                break;
                            case "false": // Включение
                                e.style.visibility = "visible";
                                ct(this);
                                break;
                        }
                }// switch block
            }
        });
    }
    else {console.log("Фукнция вызывается от лица неизвестного объекта");}
}

// Переключение popup по pid
function PopupSwitchID(rpid)
{
    // finds a switcher that has exact popupID
    let localSwitcher;
    popupSwitch.forEach(switcher => {
        if ((switcher.hasAttribute("pid")) && (switcher.getAttribute("pid")==rpid)) {
            localSwitcher = switcher;
        }
    });
    
    function cf(e) {e.setAttribute(stateAttribute, "false");} // установка popupState на false
        function ct(e) {e.setAttribute(stateAttribute, "true");} // установка popupState на true
    
    // если такие есть
    if (localSwitcher != undefined) 
    {
        let state, pid, at = "none";
        let sizeX = window.innerWidth;
        let sizeY = window.innerHeight;
        
        // ID попапа
        if (localSwitcher.hasAttribute('pid')) {pid = localSwitcher.getAttribute("pid");}
        
        // Анимация попапа
        if (localSwitcher.hasAttribute(anim)) {at = localSwitcher.getAttribute(anim);}

        // ошибка при вызове попапа откуда-то не оттуда
        if ((localSwitcher != undefined) && localSwitcher.hasAttribute(stateAttribute)) 
        {state = localSwitcher.getAttribute(stateAttribute);}
        else {
            localSwitcher.setAttribute(stateAttribute, true);
            state = true;
            console.log("Фукнция вызывается от лица неизвестного объекта");
        }

        // основной код
        popup.forEach(e => {
            let trueStatements = ["ScaleX(1)", "ScaleY(1)", "Scale(1)", "translateX(0)", "rotate(0deg)"];
            let falseStatements = ["ScaleX(0)", "ScaleY(0)", "Scale(0)"];
            let animationList = ["opacity", "squishToX", "squishToY", "scaling", "moveLeft", "moveRight", "moveUp", "moveDown", "rotate"];
            if (e.attributes['pid'].nodeValue == localSwitcher.attributes["pid"].nodeValue) {
                let animationsMassive = at.split(' ');
                
                switch (at)
                {                        
                    //
                    case "opacity":
                        switch (state) {
                            case "true": // Выключение
                                e.style.opacity = 0;
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.opacity = 1;
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "squishToY":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", falseStatements[0]);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[0]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "squishToX":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", falseStatements[1]);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[1]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "scalling":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", falseStatements[2]);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[2]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveLeft":
                        let x = e.getBoundingClientRect().right;
                        let diffL = sizeX - x;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateX(${-1*diffL}px)`);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveRight":
                        let xx = e.getBoundingClientRect().left;
                        let diffR = sizeX - xx;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateX(${diffR}px)`);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveUp":
                        let y = e.getBoundingClientRect().bottom;
                        let diffU = sizeY - y;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateY(${-1*y}px)`);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //

                    //
                    case "moveDown":
                        let yy = e.getBoundingClientRect().top;
                        let diffD = sizeY - yy;
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", `translateY(${diffD}px)`);
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[3]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //
                    
                    //
                    case "rotate":
                        switch (state) {
                            case "true": // Выключение
                                e.style.setProperty("transform", "rotate(180deg) scale(0)");
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.setProperty("transform", trueStatements[4]);
                                ct(localSwitcher);
                                break;
                        }
                        break;
                    //
                    
                    //
                    default:
                        switch (state) {
                            case "true": // Выключение
                                e.style.visibility = "hidden";
                                cf(localSwitcher);
                                break;
                            case "false": // Включение
                                e.style.visibility = "visible";
                                ct(localSwitcher);
                                break;
                        }
                }// switch block
            }
        });
    }
    else {console.log(`Объект с popupID=${rpid} не найден.`);}
}