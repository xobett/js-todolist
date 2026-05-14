import {ToDo} from "../entities/toDo.js";
export {toDoService};

const toDoService = (() => {
    const toDos = [];

    function create(params) {
        const toDo = new ToDo(params.title, params.description, params.dueDate, params.isUrgent, params.i)
    }

    function edit(id, params) {
        const toDo = toDos.find((td) => td.Id == id);
        toDo.title = params.title ?? toDo.title;
        toDo.description = params.description ?? toDo.description;
        toDo.dueDate = params.dueDate ?? toDo.dueDate;
        toDo.title = params.isUrgent ?? toDo.isUrgent;
        toDo.title = params.title ?? toDo.title;
    }

    function removeById() {

    }

    function toggleById() {

    }

    return { create, edit, remove }
})();