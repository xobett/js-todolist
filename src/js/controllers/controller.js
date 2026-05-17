import { uiController } from "./uiController.js";
import { toDoService } from "../services/toDoService.js";
import { projectService } from "../services/projectService.js";
import { ToDoSeeder } from "../helpers/seeders/toDoSeeder.js";
import { ProjectSeeder } from "../helpers/seeders/projectSeeder.js";

export { controller };

const controller = (() =>{
    function seed() {
        const projectSeeder = new ProjectSeeder();
        projectSeeder.values.forEach(p => {
            createProject(p);
        });

        const toDoSeeder = new ToDoSeeder();
        toDoSeeder.values.forEach(td => {
            createToDo(td);
        });
    }
    
    function run() {
        uiController.render();
        seed();
    }

    function addUiController(controller) {
        uiController = controller;
    }

    function getAllToDos() {
        return toDoService.getAll();
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
        return projectService.getAll();
    }

    function getProject(id) {
        projectService.get(id);
    }

    function createProject(data) {
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
})();