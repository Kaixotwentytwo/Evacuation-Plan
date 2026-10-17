// this class determines which button what action does
// allowing to rebind any button to any action
// relies on event.key

enum KeyActivation {
    Single = 0,
    Variant = 1,
    Combo = 2,
}

type Hotkey = {
    activation: KeyActivation,
    variants: 
        {keys: {
            code: number, // e.keyCode 83
            output: string, // e.key 's'
            name: string, //e.code 'KeyS'
        }[], activation: KeyActivation}[]
}

class KeyboardManager {

    static Hotkeys = {
        General: {

            selectAll: {
                activation: KeyActivation.Variant,
                variants: [
                    // ctrl + S
                    {keys: [
                        {code:17, output:"Control", name:"ControlLeft"},
                        {code:83, output:"s", name:"KeyS"}
                    ], activation:KeyActivation.Combo},

                    // RCtrl + S
                    {keys: [
                        {code:17, output:"Control", name:"ControlRight"},
                        {code:83, output:"s", name:"KeyS"}
                    ], activation:KeyActivation.Combo},

                    // // Enter
                    // {keys: [{code:13, output:"Enter", name:"Enter"}],
                    // activation: KeyActivation.Single}
                ]
            } as Hotkey,

            deleteObject: {
                activation: KeyActivation.Variant,
                variants: [
                    {keys: [{code: 46, name:"Delete", output:"Delete"}], activation:KeyActivation.Single},
                    {keys: [{code: 8, name:"Backspace", output:"Backspace"}], activation:KeyActivation.Single},
                ]
            } as Hotkey,
        },

        drawObjects: {
            text: {
                activation: KeyActivation.Single,
                variants: [{keys:[{code: 84, name:"KeyT", output:"t"}], activation:KeyActivation.Single}],
            } as Hotkey,
        }
    }
}