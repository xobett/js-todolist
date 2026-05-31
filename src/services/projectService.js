import { Project } from "../components/project/project.js";
import { ProjectDTO } from "../components/project/projectDTO.js";
export {projectService};

const projectService = (() => {
    let repository = [];

    function loadSaved() {
        let loaded = false;
        const json = localStorage.getItem('projects');
        if (json) {
            let values;
            try {
                values = JSON.parse(json);
                values = values.map(el => Project.fromJSON(el));

                repository = [...values];
                loaded = true;
            } catch (error) {
                loaded = false;
                console.log(`Error parsing Projects from local storage. \n ${error}`);
            }
        }

        return loaded;
    }

    function getAll() {
        const values = repository.map(entity => mapToDTO(entity));
        return values;
    }

    function get(id) {
        const project = repository.find(p => p.Id == id); 

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }

        return project;
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
        const project = new Project(data.title, data.notes, data.color);
        repository.push(project);

        saveChanges();
        
        return project;
    }
    
    function edit(id, data) {
        const project = repository.find(p => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }

        project.title = data.title ?? project.title;
        project.notes = data.notes ?? project.notes;
        project.color = data.color ?? project.color;

        saveChanges();
    }
    
    function remove(id){
        const project = repository.find(p => p.Id == id);
        
        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        project.removeAll();

        repository = repository.filter((p) => p.Id != project.Id);

        saveChanges();
    }

    function add(id, toDos) {
        if (!Array.isArray(toDos)) {
            toDos = [toDos];
        }
        const project = repository.find((p) => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        project.add(toDos);

        saveChanges();
    }

    function getToDos(id) {
        const project = repository.find(p => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        
        return project.ToDos;
    }

    function removeToDos(id, toDos){
        const project = repository.find((p) => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        project.remove(toDos);
        
        saveChanges();
    }

    function moveToDosToProject(originProjectId, targetProjectid, toDos) {
        const originProject = repository.find((p) => p.Id == originProjectId);
        const targetProject = repository.find((p) => p.Id == targetProjectid);

        if (!originProject) {
            throw new Error(`Project ${originProjectId} not found`);
        }

        if (!targetProject) {
            throw new Error(`Project ${targetProjectid} not found`);
        }
        
        originProject.remove(toDos);
        targetProject.add(toDos);

        saveChanges();
    }

    function saveChanges() {
        try {
            const json = JSON.stringify(repository);
            localStorage.setItem('projects', json);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    function mapToDTO(entity){
        return new ProjectDTO(entity.Id, entity.title, entity.notes, entity.color);
    }

    return { loadSaved, getAll, get, getByName, create, edit, remove, removeToDos, getToDos, add, moveToDosToProject };
})();
