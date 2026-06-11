import './toDo.css';

export class ToDo {
    #id
    title;
    description;
    dueDate;
    isCompleted;
    priority;

    static fromJSON(data) {
        return new this(data.title, data.description, data.dueDate, data.isCompleted, data.priority, data.Id);
    }

    constructor(title, description, dueDate, isCompleted, priority, id = null){
        if (typeof title !== 'string' || title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        this.#id = id ?? crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
        this.priority = priority;
    }

    get Id() {
        return this.#id;
    }

    toggle(){
        this.isCompleted = !this.isCompleted;
    }

    toJSON() {
        return {
            "Id" : this.Id,
            "title" : this.title,
            "description" : this.description,
            "dueDate" : this.dueDate,
            "isCompleted" : this.isCompleted,
            "priority" : this.priority,
        };
    }
}