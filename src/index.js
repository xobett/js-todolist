import {controller} from "./controllers/controller.js";

controller.run();
const toDo = controller.getToDoByName('was');
console.log(toDo);

const project = controller.getProjectByName('Test')[0];
console.log(project)
console.log(project.Id)

controller.addToDos(project.Id, toDo);
console.log(controller.getToDos(project.Id))

//SEED