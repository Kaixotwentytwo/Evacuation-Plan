## General Project Information:

This project represents an application for convient and safe drawing evacuation plans in a building. The main goal is to provide users with a user-friendly interface that allows them to create, edit, and save evacuation plans for buildings.

### Key Features:

- **Drawing Tools:** Users can draw walls, eiter outer or inner.
- **Obstacles:** Users can add obstacles of different sorts
- **Icons:** Users can put them on the plan to determine specific actions (e.g., fire alarm)
- **Refference:** Users can add on the work field refference images (as PNG, JPG, PDF), that will be used as a reference for the evacuation plan. 
- **Grid system:** Users can enable a grid system for better planning.
- **Autogenerating Evacuation Arrows:** Based on floor geometry arrows will be generated to closest exit(-s) (not implemented yet.)
- **Saving and Loading Plans:** Users can save their projects via json files
- **Export:** Users could export the plan as a SVG, JPG, PNG or PDF file. (PDF format is not implemented yet)
- **Documentation:** Everything on plan is happening strictly according to ГОСТ-documents (ГОСТ 15402-98) and other relevant standards.
- **Minimize Error while Drawing:** Application does it's best to allow user only do actions according to documentation base or fixing theirs mistakes.

### Technology Stack:

Project uses Fabric.js v7.4.0 for drawing functionality and work with object in its canvas.
Sweatalert2 for popup windows.
TypeScript for strict typization of code.
Webpack for bundling the project into one file.

### Roadmap:

For the moment the application is quite basic, but it's already capable of creating a simple plan. The next steps are to implement more advanced features: 
1. Autogenerating evacuation arrows;
2. Adding other obstacle classes like windows, door frames, staircases and so on;
3. Reference objects for easier drawing process;
4. Implementing history system for undo/redo actions;
5. Reworking keybind system for it to be more flexible and user-friendly;
6. Scale map for plans, so rooms could represents their actual size on a plan, and not just visual expression;
7. More flexible export system, that could fit entire plan and not just current scene
8. Adding "floor" functional as if it's separate layers of the building
9. Automatic generation of legend of the plan and legend of the building. (Fire safety phone number, basic determination of icons, etc.)

### File Structure:

All nessessary files are located in `src/` directory. The main entry point is `main/index.ts`. Main App file though, located at `src/renderer/`. All other files are related to specific features or functionalities of the application.
Main TypeScript located in `renderer/classes/`. In `renderer/classes/behavior/` folder there are classes that handle canvas behavior, like drawing objects, deleting them, grid-related functions, export functions and so on.
So Exact classes at the moment are following:
`Action.ts` (for saving history), `CanvasBehavior.ts` (for the various canvas-related functions), `Grid.ts`, `Clipboard.ts`, `Keybinds.ts` (for to handle key presses and hotkeys management), `Saving.ts` (for export), `Scale.ts` (for scale map).

In `renderer/classes/interface/` folder there are classes that handle exact interface-related processes. At the moment there's classes to work with some blocks and PDF popups in application.
By the path `renderer/config/` there's files `icons.ts`, where all fire safety icons are defined, and `Variables.ts`, where all configuration variables are defined in `Variables` class. In `theme.ts` there's color pallete. In `lang.ts` there's some translations for different languages.

Also there's `renderer/classes/obstacles/` folder, where all kinds of Canvas Object stored. Following list of them:
`OutWall.ts` (outer wall on the plan);
`InWall.ts` (inner wall on the plan);
`DoorWay.ts` (doorway on the plan);
`Icon.ts` (icon on the plan);
`Window.ts` (window on the plan);
`Refference.ts` (refference image);
`EvacArrow.ts` (evacuation arrow);
`Vault.ts` (general not classfied specifically obstacle type);
`Elevator.ts` (elevator);

In order to find some file in project tree, use this structure.
