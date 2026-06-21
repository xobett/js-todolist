import { ToDo } from "../components/toDo/toDo.js";
import { ToDoDTO } from "../components/toDo/toDoDTO.js";
import { PriorityEnum } from "../enums/priorityEnum.js";
import { addDays, format } from "date-fns";
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
    
    function seed(toDos) {
        try {
            toDos.forEach((td) => {
                repository.push(new ToDo(td.title, td.description, format(td.dueDate, 'yyyy-MM-dd'), td.isCompleted, td.priority));
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
        const toDo = repository.find((td) => td.Id == id);
        return mapToDTO(toDo);
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

    function create(inputData) {
        let date;
        const dueIn = Number(inputData.get('dueIn'));
        if (Number.isInteger(dueIn)) {
            date = addDays(new Date(), dueIn);
        }
        else {
            date = inputData.get('dueDate');
        }
        
        const data = {
            title: inputData.get('title'),
            description: null,
            dueDate: format(date, 'yyyy-MM-dd'),
            isCompleted: false,
            priority: PriorityEnum[inputData.get('priority')],
        };

        const toDo = new ToDo(data.title, data.description, data.dueDate, data.isCompleted, data.priority);
        repository.push(toDo);

        saveChanges();

        return mapToDTO(toDo);
    }

    function edit(id, inputData) {
        //EDIT
        const toDo = repository.find((td) => td.Id == id);

        if (!toDo) {
            throw new Error(`To Do ${id} not found`);
        }

        const data = {
            title: inputData.get('title'),
            description: inputData.get('description'),
            dueDate: inputData.get('dueDate'),
            priority: PriorityEnum[inputData.get('priority')],
        };

        toDo.title = data.title == '' ? toDo.title : data.title;
        toDo.description = data.description;
        toDo.dueDate = data.dueDate == '' ? toDo.dueDate : data.dueDate;
        toDo.priority = data.priority ?? toDo.priority;

        saveChanges();
    }

    function remove(id) {
        const toDo = repository.find((td) => td.Id == id);

        if (!toDo) {
            throw new Error(`To Do ${id} not found`);
        }
        repository = repository.filter((td) => td.Id !== toDo.Id);

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
        return new ToDoDTO(entity.Id, entity.title, entity.description, entity.dueDate, entity.isCompleted, Object.keys(PriorityEnum).find(k => PriorityEnum[k] === entity.priority));
    }

    return { loadSaved, seed, getAll, get, getByName, toggle, create, edit, remove };
})();