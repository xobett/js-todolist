import { toDoService } from "../services/toDoService.js";
import { projectService } from "../services/projectService.js";
import { ToDoSeeder } from "../seeders/toDoSeeder.js";
import { ProjectSeeder } from "../seeders/projectSeeder.js";
import { UiController } from "./uiController.js";

export { controller };

const controller = ((uiController) =>{
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
        onInitLoadSaved();
        
        uiController.initialRender();
        uiController.NewToDoForm.addEventListener('submit', (e) => console.log('test'));

        const toDos = getAllToDos();
        uiController.render('Test', toDos);
    }

    function onInitLoadSaved() {
        const loadedToDos = toDoService.loadSaved();
        const loadedProjects = projectService.loadSaved();
        
        if (!loadedToDos && !loadedProjects) {
            seed();
        }
    }

    function getAllToDos() {
        return toDoService.getAll();
    }

    function getToDo(id) {
        let response = {ok: true, error: null};
        try {
            response.data = toDoService.get(id);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function getToDoByName(term) {
        return toDoService.getByName(term);
    }

    function toggleToDo(id) {
        let response = {ok: true, error: null};
        try {
            toDoService.toggle(id);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function createToDo() {
        let response = {ok: true, error: null};
        try {
            response.data = toDoService.create(data);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function editToDo(id, data) {
        let response = {ok: true, error: null};
        try {
            toDoService.edit(id, data);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function removeToDo(id) {
        let response = {ok: true, error: null};
        try {
            toDoService.remove(id);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function getAllProjects() {
        return projectService.getAll();
    }

    function getProject(id) {
        let response = {ok: true, error: null};
        try {
            response.data = projectService.get(id);
        } catch (error) {
               response.ok = false;
            response.error = error;
        }
        return response;
    }

    function getProjectByName(term) {
        return projectService.getByName(term);
    }

    function createProject(data) {
        let response = {ok: true, error: null};
        try {
            response.data = projectService.create(data);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }
    
    function editProject(id, data) {
        let response = {ok: true, error: null};
        try {
            projectService.edit(id, data);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }
    
    function removeProject(id) {
        let response = {ok: true, error: null};
        try {
            projectService.remove(id);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function getToDosFromProject(projectId) {
        let response = {ok: true, error: null};
        try {
            response.data = projectService.getToDos(projectId);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function addToDosToProject(projectId, toDos) {
        let response = {ok: true, error: null};
        try {
            projectService.add(projectId, toDos);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function removeToDosFromProject(projectId, ...toDos) {
        let response = {ok: true, error: null};
        try {
            projectService.removeToDos(projectId, toDos);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    function moveToDosToProject(originProjectId, targetProjectid, ...toDos) {
        let response = {ok: true, error: null};
        try {
            projectService.moveToDosToProject(originProjectId, targetProjectid, toDos);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }

    return {
            run
        };
})(new UiController());