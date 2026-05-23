import { ToDo } from "../components/toDo/toDo.js";
import { PriorityEnum } from "../enums/priorityEnum.js";
export { toDoService };

const toDoService = (() => {
    const repository = [];    

    function getAll() {
        //RETURN ALL TO DOS
        return [...repository.values()];
    }

    function get(id) {
        const toDo = repository.find((td) => td.Id == id);
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
        toDo.toggle();
    }

    function create(data) {
        //CREATE
        const toDo = new ToDo(data.title, data.description, data.dueDate,
            data.isUrgent ?? false, data.isCompleted ?? false, PriorityEnum[data.priority] ?? PriorityEnum.LOW);
        repository.push(toDo);
    }

    function edit(id, data) {
        //EDIT
        const toDo = repository.find((td) => td.Id == id);
        toDo.title = data.title ?? toDo.title;
        toDo.description = data.description ?? toDo.description;
        toDo.dueDate = data.dueDate ?? toDo.dueDate;
        toDo.title = data.isUrgent ?? toDo.isUrgent;
        toDo.title = data.title ?? toDo.title;
    }

    function remove(id) {
        //REMOVE
    }

    return { getAll, get, getByName, toggle, create, edit, remove };
})();