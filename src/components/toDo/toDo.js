import './toDo.css';

export class ToDo {
    #id
    title;
    description;
    dueDate;
    isUrgent;
    isCompleted;
    priority;

    static fromJSON(data) {
        return new this(data.title, data.description, data.dueDate, data.isUrgent, data.isCompleted, data.priority, data.Id);
    }

    constructor(title, description, dueDate, isUrgent, isCompleted, priority, id = null){
        if (typeof title !== 'string' || title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        if (typeof description !== 'string' || description.length <= 0){
            throw new Error("Description must be a valid string");
        }

        if (typeof isUrgent !== 'boolean'){
            throw new Error("Is urgent value must be a valid boolean");
        }
        
        if (typeof isCompleted !== 'boolean'){
            throw new Error("Is completed value must be a valid boolean");
        }

        this.#id = id ?? crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ?? null;
        this.isUrgent = isUrgent;
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
            "isUrgent" : this.isUrgent,
            "isCompleted" : this.isCompleted,
            "priority" : this.priority,
        };
    }
}