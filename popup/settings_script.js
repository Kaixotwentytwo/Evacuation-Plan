const symbols = "▼▶";
const options = document.querySelectorAll(".settingsListOption");

const appearenceBlock = document.getElementById("appearence");
const saveBlock = document.getElementById("save");
const iconBlock = document.getElementById("icon");
const controlsBlock = document.getElementById("controls");
const varsBlock = document.getElementById("vars");
//const;
const errorBlock = document.getElementById("error");

let blockList = [errorBlock, appearenceBlock, saveBlock, iconBlock, controlsBlock, varsBlock];

function chooseOption() {
    function offAllBlocks(){blockList.forEach(block => block.style.display = "none");}
    
    let typeOfSettings = this.getAttribute("type");
    
    // обязательный код
    options.forEach(t => {
        if (t.hasAttribute("chosen")) {t.removeAttribute("chosen");}
    });
    this.setAttribute("chosen", "");
    offAllBlocks();
    
    switch (typeOfSettings) {
        case "appearence":
            appearenceBlock.style.display = "block";
            break;
        case "save":
            saveBlock.style.display = "block";
            break;
        case "icon":
            iconBlock.style.display = "block";
            break;
        case "controls":
            controlsBlock.style.display = "block";
            break;
        case "vars":
            varsBlock.style.display = "block";
            break;
        default:
            errorBlock.style.display = "block";
            errorcode1.innerHTML = `Вы не должны видеть этот блок, это ошибка разработчика.<br><br> Был получен блок с типом ${typeOfSettings}, который не обрабатывается системой.`;
            break;
    }
}

options.forEach(e => e.addEventListener("mousedown", chooseOption));

// theme buttons

let localTheme = localStorage.getItem("theme");

const lightThemeButton = document.getElementById("lightThemeButton");
const darkThemeButton = document.getElementById("darkThemeButton");

lightThemeButton.addEventListener("click", function(){changeTheme(localTheme);});
darkThemeButton.addEventListener("click", function(){changeTheme(localTheme);});

const objectsContainingThemeAttributeInside = [
    ".leftPart", ".rightPart"];

function test(message) {
    alert(message);
}

function changeTheme(currentTheme) {
    try {
        switch (currentTheme) {
            // меняем на тёмную
            case "system":
                
                localStorage.setItem("theme", "system");
                break;
            case "light":
                objectsContainingThemeAttributeInside.forEach(o => 
                {
                    if (document.querySelector(o).hasAttribute("theme")==false) {
                        throw new Error(`Объект, обозначаемый как ${o} не имеет атрибута theme`);
                    }
                    document.querySelector(o).setAttribute("theme", "dark");
                });
                localStorage.setItem("theme", "dark");
                break;
            case "dark":
                objectsContainingThemeAttributeInside.forEach(o => 
                {
                    if (document.querySelector(o).hasAttribute("theme")==false) {
                        throw new Error(`Объект, обозначаемый как ${o} не имеет атрибута theme`);
                    }
                    document.querySelector(o).setAttribute("theme", "light");
                });
                localStorage.setItem("theme", "dark");
                break;
            default:
                throw new Error(`Неизвестная тема: ${currentTheme}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}