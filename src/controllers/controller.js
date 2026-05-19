import { uiController } from "./uiController.js";
import { toDoService } from "../services/toDoService.js";
import { projectService } from "../services/projectService.js";
import { ToDoSeeder } from "../seeders/toDoSeeder.js";
import { ProjectSeeder } from "../seeders/projectSeeder.js";

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
        return toDoService.get(id);
    }

    function getToDoByName(term) {
        return toDoService.getByName(term);
    }

    function toggleToDo(id) {
        return toDoService.toggle(id);
    }

    function createToDo(data) {
        return toDoService.create(data);
    }

    function editToDo(id) {
        return toDoService.edit(id, data);
    }

    function removeToDo(id) {
        return toDoService.remove(id);
    }

    function getAllProjects() {
        return projectService.getAll();
    }

    function getProject(id) {
        return projectService.get(id);
    }

    function getProjectByName(term) {
        return projectService.getByName(term);
    }

    function createProject(data) {
        return projectService.create(data);
    }
    
    function editProject(id) {
        return projectService.edit(id, data);
    }
    
    function removeProject(id) {
        return projectService.remove(id);
    }

    function getToDos(projectId) {
        return projectService.getToDos(projectId);
    }

    function addToDos(projectId, ...toDos) {
        projectService.add(projectId, toDos);
    }

    function remvoeToDosFromProject(projectId, ...toDos) {
        
    }

    return {
            run,
            getAllToDos, getToDo, getToDoByName, toggleToDo, createToDo, editToDo, removeToDo,
            getAllProjects, getProject, getProjectByName, createProject, editProject, removeProject,
            getToDos, addToDos 
        };
})();