import { PriorityEnum } from "../enums/priorityEnum.js";

export { ToDoSeeder };

class ToDoSeeder {

    values = [
        {title: "Give a like to this submit on TOP! :D", description: "Pretty cool first task, right?!", dueDate: new Date(), isCompleted: false, priority: PriorityEnum.HIGH},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: new Date(), isCompleted: true, priority: PriorityEnum.MEDIUM},
        {title: "Watch a movie", description: "Go and relax! Watch a movie", dueDate: new Date(), isCompleted: true, priority: PriorityEnum.LOW},
    ];
}