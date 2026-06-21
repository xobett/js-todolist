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
        refreshToDos();

        const projects = getAllProjects();
        refreshProjectSection(projects);
    }
    
    function refreshToDos(){
        let toDos;
        if (currentProject) {
            const toDosIds = getToDosIdsFromProject(currentProject.Id); 
            toDos = toDosIds.map((id) => getToDo(id));
        }
        else {
            toDos = getAllToDos();
        }

        uiController.renderToDos(currentProject ? currentProject.title : 'All tasks', toDos);
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
                if (currentProject !== null){
                    const project = getProject(currentProject.Id);

                    if (!project) return;
                    addToDosIdsToProject(project.Id, response.data.Id);
                }
                refreshToDos();
            }

            this.reset();
        });

        uiController.EditToDoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = new FormData(this);
            const response = editToDo(data);

            console.log(response);

            if (response.ok) {
                refreshToDos();
            }

            uiController.closeInfoPanel();
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

        uiController.EditProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = new FormData(this);
            const response = editProject(data);

            if (response.ok) {
                const projects = getAllProjects();
                refreshProjectSection(projects);
            }

            this.reset();
            uiController.closeEditModal();
        });

        uiController.DeleteProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const data = new FormData(this);
            const response = removeProject(data);

            if (response.ok) {
                currentProject = null;
                const projects = getAllProjects();
                refreshProjectSection(projects);

                refreshToDos();
            }

            uiController.closeDeleteModal();
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
                refreshToDos();
            }
        }));
    }

    function assignCurrentProjectSelection() {
        uiController.ProjectTabs.forEach((pt) => pt.addEventListener('click', (e) => {
            const dataset = e.target.closest('.tab').dataset;

            if (dataset.Id) {
                currentProject = getProject(dataset.Id);
            }
            else {
                currentProject = null;
            }

            refreshToDos();
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

    function editToDo(inputData) {
        let response = {ok: true, error: null};
        try {
            toDoService.edit(inputData.get('Id'), inputData);
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
    
    function editProject(inputData) {
        let response = {ok: true, error: null};
        try {
            projectService.edit(inputData.get('Id'), inputData);
        } catch (error) {
            response.ok = false;
            response.error = error;
        }
        return response;
    }
    
    function removeProject(inputData) {
        let response = {ok: true, error: null};
        try {
            const ids = getToDosIdsFromProject(inputData.get('Id'));
            ids.forEach((id) => removeToDo(id));
            projectService.remove(inputData.get('Id'));
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