import { ToDo } from "../components/toDo/toDo.js";
export { toDoService };

const toDoService = (() => {
    const repository = [];    

    function getAll() {
        //RETURN ALL TO DOS
        return [...repository.values()];
    }

    function get(id) {
        //RETURN TO DO
    }

    function toggle(id) {
        //TOGGLE A TO DO
    }

    function create(data) {
        //CREATE
        const toDo = new ToDo(data.title, data.description, data.dueDate, data.isUrgent ?? false, data.isCompleted ?? false);
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

    return { getAll, get, toggle, create, edit, remove };
})();