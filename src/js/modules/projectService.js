import { Project } from "../entities/project.js";
export {projectService};

const projectService = (() => {
    const projects = [];

    //CREATE A PROJECT
    function create(params){
        const project = new Project(params.title, params.toDosIds, params.notes);
        projects.push(project);
    }
    
    //REMOVE A PROJECT
    function removeById(id){
        projects = projects.filter((p) => p.Id != id);
        //REMOVE ALL TODOS LATER
    }

    function addToDoId(projectId, toDoId) {
        const project = projects.find((p) => p.Id == projectId);
        projectId.toDosIds.push(toDoId);
    }
    
    function removeToDoId(projectId, toDoId) {
        const project = projects.find((p) => p.Id == projectId);
        project.toDosIds = project.toDosIds.filter((td) => td.Id != toDoId);
    }

    return { create, removeById, addToDoId, removeToDoId }
})();