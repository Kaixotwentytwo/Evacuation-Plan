// config it is
export class Variables {
    // available variables
    language: string = Variables.defaults.language; // current one
    devMode: boolean = Variables.defaults.devMode; // determines if other dev commands available (like sv_cheats)
    maxZoom: number = Variables.defaults.maxZoom; // devcommand
    showCoordinates: boolean = Variables.defaults.showCoordinates; // shows a numbers x & y, that updates on mouse movement
    showZoom: boolean = Variables.defaults.showZoom; // shows a zoom ratio, that updates on mouse movement
    minAngle: number = Variables.defaults.minAngle; // rotation angle with "snap to grid" turned off
    baseSnapAngle: number = Variables.defaults.baseSnapAngle; // if object doesn't have own rotationAngle

    constructor(init?: Partial<Variables>) {
        // сохраняем все дефолтные значения
        Object.assign(this, Variables.defaults);
        // добавляем свойства
        if (init) {Object.assign(this, init);}
    }

    // setters
    set setLanguage(input: string) {this.language = input.toLowerCase()}
    set setDevMode(input: boolean) {this.devMode = input}
    set setMaxZoom(input: number) {if (Number.isFinite(input)) this.maxZoom = Math.trunc(input)}
    set setShowCoordinates(input: boolean) {this.showCoordinates = input}
    set setShowZoom(input: boolean) {this.showZoom = input}
    set setMinAngle(input: number) {this.minAngle = input}
    set setBaseSnapAngle(input: number) {this.baseSnapAngle = input}

    // getters
    get getLanguage() {return this.language}
    get getDevMode() {return this.devMode}
    get getMaxZoom() {return this.maxZoom}
    get getShowCoordinates() {return this.showCoordinates}
    get getShowZoom() {return this.showZoom}
    get getMinAngle() {return this.minAngle}
    get getBaseSnapAngle() {return this.baseSnapAngle}

    // functions 
    public toggleDevMode() {this.devMode = !this.devMode}
    public toggleShowCoordinates() {this.showCoordinates = !this.showCoordinates}
    public toggleShowZoom() {this.showZoom = !this.showZoom}
    public setDefaultSettings() {
        this.language = Variables.defaults.language;
        this.devMode = Variables.defaults.devMode;
        this.maxZoom = Variables.defaults.maxZoom;
        this.showCoordinates = Variables.defaults.showCoordinates;
        this.showZoom = Variables.defaults.showZoom;
        this.minAngle = Variables.defaults.minAngle;
        this.baseSnapAngle = Variables.defaults.baseSnapAngle;
    }
    public changeVariable(variable: any, value: any): void {
        if (variable in Variables) {(this as any)[variable] = value;}
    }

    // default settings
    private static readonly defaults = {
        language: "ru",
        devMode: false,
        maxZoom: 7.5,
        showCoordinates: false,
        showZoom: false,
        minAngle: 1,
        baseSnapAngle: 15,
    };
}

export let CommonConfig = new Variables({
    language: 'ru',
    devMode: true,
    maxZoom: 10,
    showCoordinates: true,
    showZoom: true,
    minAngle: 1,
    baseSnapAngle: 45,
});