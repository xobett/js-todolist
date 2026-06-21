import { PriorityEnum } from "../enums/priorityEnum.js";

export { ToDoSeeder };

class ToDoSeeder {

    values = [
        {title: "Give a like to this submit on TOP! :D", description: "Pretty cool first task, right?!", dueDate: new Date(), isCompleted: false, priority: PriorityEnum.HIGH},
        {title: "Click me!", description: "Helo!", dueDate: new Date(), isCompleted: true, priority: PriorityEnum.MEDIUM},
        {title: 'Give "Your first project" a unique icon!', description: "Make it unique!", dueDate: new Date(), isCompleted: true, priority: PriorityEnum.LOW},
    ];
}