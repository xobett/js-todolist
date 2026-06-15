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

        this.#id = id ?? (crypto.randomUUID?.() ?? this.#generateUUID());
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

    #generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}