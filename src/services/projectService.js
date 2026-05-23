import { Project } from "../components/project/project.js";
export {projectService};

const projectService = (() => {
    let repository = [];

    function getAll() {
        return [...repository.values()];
    }

    function get(id) {
        return repository.find(p => p.Id == id);
    }

    function getByName(term) {
        if (term == '') return;
        term = String(term).toLowerCase();

        const project = repository.filter((p) =>
            String(p.title).toLowerCase().includes(term) ||
            String(p.notes).toLowerCase().includes(term)
        );

        return project;
    }
    
    function create(data) {
        const project = new Project(data.title, data.notes);
        repository.push(project);
        
        return project;
    }
    
    function edit(id, data) {
        const project = repository.find(p => p.Id == id);
    }
    
    function remove(id){
        const project = repository.find(p => p.Id == id);
        project.removeAll();

        repository = repository.filter((p) => p.Id != project.Id);
    }

    function add(id, toDos) {
        if (!Array.isArray(toDos)) {
            toDos = [toDos];
        }
        const project = repository.find((p) => p.Id == id);
        project.add(toDos);
    }

    function getToDos(id) {
        const project = repository.find(p => p.Id == id);
        return project.ToDos;
    }

    function removeToDos(id, toDos){
        const project = repository.find((p) => p.Id == id);
        project.remove(toDos);
    }

    function moveToDosToProject(originProjectId, targetProjectid, toDos) {
        const originProject = repository.find((p) => p.Id == originProjectId);
        originProject.remove(toDos);
        
        const targetProject = repository.find((p) => p.Id == targetProjectid);
        targetProject.add(toDos);
    }

    return { getAll, get, getByName, create, edit, remove, removeToDos, getToDos, add, moveToDosToProject };
})();
