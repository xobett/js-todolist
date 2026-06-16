import { toDoService } from "../services/toDoService.js";
import { projectService } from "../services/projectService.js";
import { ToDoSeeder } from "../seeders/toDoSeeder.js";
import { ProjectSeeder } from "../seeders/projectSeeder.js";
import { uiController } from "./uiController.js";

export { appController };

const appController = ((uiController) =>{
    let currentProject;

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
    }

    function refreshProjectSection(projects) {
        uiController.renderProjects(projects);
        assignCurrentProjectSelection();
    }

    function assignFormHandlers() {
        uiController.NewToDoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = new FormData(this);
            const response = createToDo(data);

            if (response.ok) {
                if (currentProject != null){
                    const project = getProject(currentProject.Id);

                    if (!project) return;
                    addToDosIdsToProject(project.Id, response.data.Id);
                    const toDosIds = getToDosIdsFromProject(project.Id);
                    const toDos = toDosIds.map((id) => getToDo(id));

                    refreshToDos(project.title, toDos);
                }
                else {
                    const toDos = getAllToDos();
                    refreshToDos("All tasks", toDos);
                }
            }

            this.reset();
        });

        uiController.NewProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const data = new FormData(this);
            const response = createProject(data);
            
            if(response.ok) {
                const projects = getAllProjects();
                refreshProjectSection(projects);
            }

            this.reset();
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

            if (response.ok) {
                const toDos = getAllToDos();
                refreshToDos("Updated", toDos);
            }
        }));
    }

    function assignCurrentProjectSelection() {
        uiController.ProjectTabs.forEach((pt) => pt.addEventListener('click', (e) => {
            const dataset = e.target.closest('.tab').dataset;

            if (dataset.Id) {
                const project = getProject(dataset.Id);
                const toDosIds = getToDosIdsFromProject(project.Id);
                const toDos = toDosIds.map((id) => getToDo(id));
                
                if (project) {
                    refreshToDos(project.title, toDos);
                    currentProject = project;
                }
            }
            else {
                const toDos = getAllToDos();
                refreshToDos('All tasks', toDos);

                currentProject = null;
            }
            
            uiController.closeHeader();
            document.activeElement.blur();
        }));
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

    function getToDo(id) {
        return toDoService.get(id);
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

            const projects = getAllProjects();
            projects.forEach((p) => {
                removeToDosIdsFromProject(p.Id, id);
            })
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
        return projectService.get(id);
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

    function getToDosIdsFromProject(projectId) {
        return projectService.getToDosIds(projectId);
    }

    function addToDosIdsToProject(projectId, toDosIds) {
        projectService.add(projectId, toDosIds);
    }

    function removeToDosIdsFromProject(projectId, ...toDosIds) {
        projectService.removeToDosIds(projectId, toDosIds);
    }

    function moveToDosIdsToProject(originProjectId, targetProjectid, ...toDosIds) {
        projectService.moveToDosIdsToProject(originProjectId, targetProjectid, toDosIds);
    }

    return { run };
})(new uiController());