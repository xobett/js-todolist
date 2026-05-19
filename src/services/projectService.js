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
        //CREATE
        const project = new Project(data.title, data.notes);
        repository.push(project);
        
        return project;
    }
    
    function edit(id, data) {
        //EDIT
        const project = repository.find(p => p.Id == id);
    }
    
    function remove(id){
        //REMOVE
        repository = repository.filter((p) => p.Id != id);
    }

    function add(id, toDos) {
        //ADD A TO DO
        const project = repository.find((p) => p.Id == id);
        project.add(...toDos);
    }

    function getToDos(id) {
        //RETURN TO DOS OF PROJECT
        const project = repository.find(p => p.Id == id);
        return project.ToDos;
    }

    function removeToDos(id, toDos){
        const project = repository.find((p) => p.Id == id);
        project.add(...toDos);
    }

    return { getAll, get, getByName, create, edit, remove, removeToDos, getToDos, add };
})();

//helpers

function mapEntityToDto(entity) {
}

function mapDtoToEntity(dto){

}