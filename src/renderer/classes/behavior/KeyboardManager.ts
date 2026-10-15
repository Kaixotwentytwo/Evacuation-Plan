// this class determines which button what action does
// allowing to rebind any button to any action
// relies on event.key

// base type of data
// type KeyInfo = {
//     code: number;          // event.keyCode
//     name: string;          // event.key
// } 
// type Single = {type:"single", key:KeyInfo}; // need to press all the buttons
// type Combo = {type:"combo", keys:KeyInfo[]}; // need to press all the buttons
// type Variant = {type:"variant", keys:Single[]}; // need to press at least one of the buttons

enum KeyActivation {
    Single = 0,
    Variant = 1,
    Combo = 2,
}

type Hotkey = {
    activation: KeyActivation,
    variants: 
        {keys: {
            code: number,
            name: string
        }[], activation: KeyActivation}[]
}

class KeyboardManager {

    static Hotkeys = {
        General: {
            selectAll: {
                activation: KeyActivation.Variant,
                variants: [
                    {keys: [
                        {code:17, name:"Control"},
                        {code:83, name:"s"}
                    ], activation:KeyActivation.Combo},

                    {keys: [{code:13, name:"Enter"}],
                    activation: KeyActivation.Single}
                ]
            } as Hotkey
        }
    }

    // static Hotkeys = {
    //     FabricObjects: {
    //         create: {
    //             OutWall: null,
    //             InWall: null,
    //             //etc.
    //         },
    //         delete: {
    //             any: {type: "variant", keys:[
    //                 {type:"single", key:{code:46, name:"Delete"}}
    //             ]} as Variant,
    //             // not sure is there's should be more things
    //         }
    //     },

    //     General: {
    //         // selectAll: [{}] as Variant
    //     }
    // }
}