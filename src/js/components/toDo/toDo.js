export {ToDo};

class ToDo {
    #id
    title;
    description;
    dueDate;
    isUrgent;
    isCompleted;

    constructor(title, description, dueDate, isUrgent, isCompleted){
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

        this.#id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ?? NULL;
        this.isUrgent = isUrgent;
        this.isCompleted = isCompleted;
    }

    get Id() {
        return this.#id;
    }

    toggle(){
        this.isCompleted = !this.isCompleted;
    }
}