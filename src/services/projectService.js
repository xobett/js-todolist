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
    
    function seed(projects) {
        try {
            projects.forEach((p) => {
                repository.push(new Project(p.title));
            });
            saveChanges();
        } catch (error) {
            console.log(error);
        }
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
            String(p.title).toLowerCase().includes(term)
        );

        return project;
    }
    
    function create(inputData) {
        const data = {
            title: inputData.get('title'),
        };

        const project = new Project(data.title);
        repository.push(project);

        saveChanges();
        
        return project;
    }
    
    function edit(id, inputData) {
        const project = repository.find(p => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }

        const data = {
            title: inputData.get('title'),
            icon: inputData.get('icon'),
        };

        project.title = data.title == '' ? project.title: data.title;
        project.icon = data.icon == '' ? project.icon: data.icon;

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

    function add(id, toDosIds) {
        if (!Array.isArray(toDosIds)) {
            toDosIds = [toDosIds];
        }
        const project = repository.find((p) => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        project.add(toDosIds);

        saveChanges();
    }

    function getToDosIds(id) {
        const project = repository.find(p => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        
        return project.ToDosIds;
    }

    function removeToDosIds(id, toDosIds){
        const project = repository.find((p) => p.Id == id);

        if (!project) {
            throw new Error(`Project ${id} not found`);
        }
        project.remove(toDosIds);
        
        saveChanges();
    }

    function moveToDosIdsToProject(originProjectId, targetProjectid, toDosIds) {
        const originProject = repository.find((p) => p.Id == originProjectId);
        const targetProject = repository.find((p) => p.Id == targetProjectid);

        if (!originProject) {
            throw new Error(`Project ${originProjectId} not found`);
        }

        if (!targetProject) {
            throw new Error(`Project ${targetProjectid} not found`);
        }
        
        originProject.remove(toDosIds);
        targetProject.add(toDosIds);

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
        return new ProjectDTO(entity.Id, entity.title, entity.icon);
    }

    return { loadSaved, seed, getAll, get, getByName, create, edit, remove, removeToDosIds, getToDosIds, add, moveToDosIdsToProject };
})();
