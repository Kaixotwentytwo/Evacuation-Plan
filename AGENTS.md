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