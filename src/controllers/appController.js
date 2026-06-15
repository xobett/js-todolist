import { toDoService } from "../services/toDoService.js";
import { projectService } from "../services/projectService.js";
import { ToDoSeeder } from "../seeders/toDoSeeder.js";
import { ProjectSeeder } from "../seeders/projectSeeder.js";
import { uiController } from "./uiController.js";

export { appController };

const appController = ((uiController) =>{
    let currentProject = null;

    function seed() {
        const toDoSeeder = new ToDoSeeder();
        toDoService.seed(toDoSeeder.values);

        const projectSeeder = new ProjectSeeder();
        projectService.seed(projectSeeder.values);
    }
    
    function run() {
        uiController.init();
        assignFormHandlers();
        
        onInitLoadSaved();
        const toDos = getAllToDos();
        refreshToDos('All tasks', toDos);

        const projects = getAllProjects();
        refreshProjectSection(projects);
    }
    
    function refreshToDos(sectionName, toDos){
        uiController.renderToDos(sectionName, toDos);
        assignToggleHandlers();
        assignDeleteHandlers();
        assignCurrentProjectSelection();
    }

    function refreshProjectSection(projects) {
        uiController.renderProjects(projects);
    }

    function assignFormHandlers() {
        uiController.NewToDoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = new FormData(this);
            const response = createToDo(data);

            if (response.ok) {
                const toDos = getAllToDos();
                refreshToDos("Current", toDos);
                console.log('created');
            }
        });

        uiController.NewProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = new FormData(this);
            const response = createProject(data);
            
            if(response.ok) {
                const projects = getAllProjects();
                refreshProjectSection(projects);
            }
        });
    }

    function assignToggleHandlers() {
        uiController.Inputs.forEach((ip) => ip.addEventListener('change', (e) => {
            const dataset = e.target.parentNode.dataset;
            const response = toggleToDo(dataset.Id);

            if (!response.ok) {
                e.target.checked = !e.target.checked;
            }
        }));
    }

    function assignDeleteHandlers() {
        uiController.DeleteButtons.forEach((ip) => ip.addEventListener('click', (e) => {
            const dataset = e.target.parentNode.dataset;
            const response = removeToDo(dataset.Id);

            console.log(response);
            if (response.ok) {
                const toDos = getAllToDos();
                console.log(toDos)
                refreshToDos("Updated", toDos);
            }
        }));
    }

    function assignCurrentProjectSelection() {
        uiController.ProjectTabs.forEach((pt) => pt.addEventListener('click', (e) => {
            const dataset = e.target.dataset;

            console.log(dataset.projectId)
        }));
    }

    function onInitLoadSaved() {
        const loadedToDos = toDoService.loadSaved();
        const loadedProjects = projectService.loadSaved();
        console.log(loadedProjects, loadedToDos)
        
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

    function createToDo(inputData) {
        let response = {ok: true, error: null};
        try {
            response.data = toDoService.create(inputData);
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

    function createProject(inputData) {
        let response = {ok: true, error: null};
        try {
            response.data = projectService.create(inputData);
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

    return { run };
})(new uiController());