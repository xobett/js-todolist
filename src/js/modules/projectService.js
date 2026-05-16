import { Project } from "../entities/project.js";
export {projectService};

const projectService = (() => {
    const projects = [];

    function getAll() {
        //RETURN ALL PROJECTS
    }

    function get(id) {
        //RETURN PROJECT
    }

    function create(data) {
        //CREATE
        const project = new Project(data.title, data.toDosIds, data.notes);
    }
    
    function edit(id, data) {
        //EDIT
    }
    
    function remove(id){
        //REMOVE
        projects = projects.filter((p) => p.Id != id);
    }

    function getToDos(id) {
        //RETURN TO DOS OF PROJECT
    }

    return { getAll, get, create, edit, remove, getToDos };
})();