import {controller} from "./controllers/controller.js";

controller.run();
const toDo = controller.getToDoByName('was');
console.log(toDo);

const project = controller.getProjectByName('Test')[0];
console.log(project)
console.log(project.Id)

controller.addToDos(project.Id, toDo);

const toDosFromProject = controller.getToDos(project.Id);
const mock = toDosFromProject[0];
console.log(toDosFromProject)
console.log(mock)



//SEED