// работа с машстабом, если это вовсе пригодится

// let mmScaleTo: string = "1cm";

class ScaleManager {

    public static scaleMap = {
        real: {
            number: 40,
            measurement: "см"
        },
        plan: {
            number: 2,
            measurement: "мм"
        },
        ratio: [1, 40] // масштаб 1:40
    };

    // возвращает список в формате [
    // исходное значение в реальности,
    // значение в мм,
    // исходное значение на плане,
    // значение в мм
    // соотношение (масштаб)]
    public static convertMeasurements(map = this.scaleMap, changePlanMeasurement: boolean = true) 
    {
        // changePlanMeasurement выступает значением которое будет изменяться на основе второго
        const allowedMeasurements_en = ['mm', 'cm', 'dm', 'm'];
        const allowedMeasurements_ru = ['мм', "см", "дм", "м"];
        const commonMeasurement = allowedMeasurements_en[0];
    
        try {
            // error check
            if (!(allowedMeasurements_en.includes(map.plan.measurement.toString().toLowerCase()) 
                || allowedMeasurements_ru.includes(map.plan.measurement.toString().toLowerCase()))) throw new Error(``);
            // error check
            if (!(allowedMeasurements_en.includes(map.real.measurement.toString().toLowerCase()) 
                || allowedMeasurements_ru.includes(map.real.measurement.toString().toLowerCase()))) throw new Error(``);
        
            // забираем под одну гребёнку значения
            if (allowedMeasurements_ru.includes(map.plan.measurement.toLowerCase())) {
                let local_index = allowedMeasurements_ru.indexOf(map.plan.measurement);
                map.plan.measurement = allowedMeasurements_en[local_index];
            }
            if (allowedMeasurements_ru.includes(map.real.measurement.toLowerCase())) {
                let local_index = allowedMeasurements_ru.indexOf(map.real.measurement);
                map.real.measurement = allowedMeasurements_en[local_index];
            }
    
            // local variable of converted to common plan & real number
            let LPNC = map.plan.number;
            let LRNC = map.real.number;
    
            // приведение значений к общему знаменателю
            if (map.plan.measurement !== commonMeasurement) {
                switch (map.plan.measurement) {
                    case "mm":
                        // *1
                        LRNC*=1;
                        break;
                    case "cm":
                        // *10
                        LPNC*=10;
                        break;
                    case "dm":
                        LPNC*=100;
                        // *100
                        break;
                    case "m":
                        LPNC*=1000;
                        // *1000
                        break;
                }
            }
            if (map.real.measurement !== commonMeasurement) {
                switch (map.real.measurement) {
                    case "mm":
                        // *1
                        LRNC*=1;
                        break;
                    case "cm":
                        // *10
                        LRNC*=10;
                        break;
                    case "dm":
                        LRNC*=100;
                        // *100
                        break;
                    case "m":
                        LRNC*=1000;
                        // *1000
                        break;
                }
            }
    
            // вычисления соотношения
            (function(){
                const min = Math.min(LRNC, LPNC);
                const max = Math.max(LRNC, LPNC);
                map.ratio[0] = 1;
                map.ratio[1] = max/min;
            })();
    
            // возвращает объект полный информации
            return {
                initial_real_size : `${map.real.number}${map.real.measurement}`,
                real_size_mm : `${map.plan.number}${map.plan.measurement}`,
                initial_plan_size : `${LRNC}${commonMeasurement}`,
                plan_size_mm : `${LPNC}${commonMeasurement}`, 
                ratio: map.ratio
            }
        
        } catch (error) {
            console.error(error);
        }
    }
}