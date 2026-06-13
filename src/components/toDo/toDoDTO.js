export class ToDoDTO {
    constructor(id, title, description, dueDate, isCompleted, priority){
        this.Id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
        this.priority = priority;
    }
}