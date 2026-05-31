import { ToDo } from "../components/toDo/toDo.js";
import { ToDoDTO } from "../components/toDo/toDoDTO.js";
import { PriorityEnum } from "../enums/priorityEnum.js";
export { toDoService };

const toDoService = (() => {
    let repository = [];

    function loadSaved() {
        let loaded = false;
        const json = localStorage.getItem('toDos');
        if (json) {
            let values;
            try {
                values = JSON.parse(json);
                values = values.map(el => ToDo.fromJSON(el));

                repository = [...values];
                loaded = true;
            } catch (error) {
                loaded = false;
                console.log(`Error parsing To Dos from local storage. \n ${error}`);
            }
        }

        return loaded;
    }

    function getAll() {
        const values = repository.map(entity => mapToDTO(entity));
        return values;
    }

    function get(id) {
        const toDo = repository.find((td) => td.Id == id);

        if (!toDo) {
            throw new Error(`To Do ${id} not found`);
        }
        
        return toDo;
    }

    function getByName(term) {
        if (term == '') return;
        term = String(term).toLowerCase();

        const toDo = repository.filter((td) =>
            String(td.title).toLowerCase().includes(term) ||
            String(td.description).toLowerCase().includes(term)
        );

        return toDo;
    }

    function toggle(id) {
        const toDo = repository.find((td) => td.Id == id);
        
        if (!toDo) {
            throw new Error(`To Do ${id} not found`);
        }
        toDo.toggle();

        saveChanges();
    }

    function create(data) {
        //CREATE
        const toDo = new ToDo(data.title, data.description, data.dueDate,
            data.isUrgent ?? false, data.isCompleted ?? false, PriorityEnum[data.priority] ?? PriorityEnum.LOW);
        repository.push(toDo);

        saveChanges();

        return toDo;
    }

    function edit(id, data) {
        //EDIT
        const toDo = repository.find((td) => td.Id == id);

        if (!toDo) {
            throw new Error(`To Do ${id} not found`);
        }

        if (typeof data.title !== 'string' || data.title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        if (typeof data.description !== 'string' || data.description.length <= 0){
            throw new Error("Description must be a valid string");
        }

        if (typeof data.isUrgent !== 'boolean'){
            throw new Error("Is urgent value must be a valid boolean");
        }
        
        if (typeof data.isCompleted !== 'boolean'){
            throw new Error("Is completed value must be a valid boolean");
        }

        toDo.title = data.title ?? toDo.title;
        toDo.description = data.description ?? toDo.description;
        toDo.dueDate = data.dueDate ?? toDo.dueDate;
        toDo.isUrgent = data.isUrgent ?? toDo.isUrgent;
        toDo.isCompleted = data.isCompleted ?? toDo.isCompleted;
        toDo.priority = data.priority ?? toDo.priority;

        saveChanges();
    }

    function remove(id) {
        //REMOVE
        const toDo = repository.find((td) => td.Id == id);

        if (!toDo) {
            throw new Error(`To Do ${id} not found`);
        }

        saveChanges();
    }

    function saveChanges() {
        try {
            const json = JSON.stringify(repository);
            localStorage.setItem('toDos', json);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    function mapToDTO(entity) {
        return new ToDoDTO(entity.Id, entity.title, entity.description, entity.dueDate, entity.isUrgent, entity.isCompleted, entity.isCompleted);
    }

    return { loadSaved, getAll, get, getByName, toggle, create, edit, remove };
})();