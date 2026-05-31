export class ToDoDTO {
    constructor(id, title, description, dueDate, isUrgent, isCompleted, priority){
        this.Id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent;
        this.isCompleted = isCompleted;
        this.priority = priority;
    }
}