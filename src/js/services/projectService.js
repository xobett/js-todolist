import { Project } from "../components/project/project.js";
export {projectService};

const projectService = (() => {
    const repository = [];

    function getAll() {
        return [...repository.values()];
    }

    function get(id) {
        //RETURN PROJECT
        return repository.find(p => p.Id == id);
    }
    
    function create(data) {
        //CREATE
        const project = new Project(data.title, data.notes);
        repository.push(project);
        
        return project;
    }
    
    function edit(id, data) {
        const project = repository.find(p => p.Id == id);
        .apply.
    }
    
    function remove(id){
        //REMOVE
        repository = repository.filter((p) => p.Id != id);
    }

    function getToDos(id) {
        //RETURN TO DOS OF PROJECT
    }

    return { getAll, get, create, edit, remove, getToDos };
})();