import {controller} from "./controllers/controller.js";

controller.run();
const toDos = controller.getAllToDos()[0];
console.log(toDos)
const project = controller.getAllProjects()[0];
controller.addToDosToProject(project.Id, toDos);

controller.toggleToDo(toDos.Id);

const originProject = controller.getAllProjects()[0];
const targetProject = controller.getAllProjects()[1];

console.log(originProject);
console.log(targetProject);

controller.moveToDosToProject(originProject.Id, targetProject.Id, toDos);

console.log(originProject);
console.log(targetProject);

const projects = controller.getAllProjects();
controller.removeProject(originProject.Id);
console.log(projects);

//SEED