import { toDoService } from "./toDoService.js";
import { projectService } from "./projectService.js";
import { uiController } from "./uiController.js";

export { controller };

const controller = ((uiController) =>{
    function run() {
        uiController.render();
    }

    function addUiController(controller) {
        uiController = controller;
    }

    function getAllToDos() {
        toDoService.getAll();
    }

    function getToDo(id) {
        toDoService.get(id);
    }

    function toggleToDo(id) {
        toDoService.toggle(id);
    }

    function createToDo(data) {
        toDoService.create(data);
    }

    function editToDo(id) {
        toDoService.edit(id, data);
    }

    function removeToDo(id) {
        toDoService.remove(id);
    }

    function getAllProjects() {
        projectService.getAll();
    }

    function getProject(id) {
        projectService.get(id);
    }

    function createProject() {
        projectService.create(data);
    }
    
    function editProject(id) {
        projectService.edit(id, data);
    }
    
    function removeProject(id) {
        projectService.remove(id);
    }

    function getToDos(projectId) {
        projectService.getToDos(projectId)
    }

    return {
            run,
            getAllToDos, getToDo, toggleToDo, createToDo, editToDo, removeToDo,
            getAllProjects, getProject, createProject, editProject, removeProject,
            getToDos 
        };
})(uiController);