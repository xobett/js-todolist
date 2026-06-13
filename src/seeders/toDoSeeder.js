import { PriorityEnum } from "../enums/priorityEnum.js";

export { ToDoSeeder };

class ToDoSeeder {

    values = [
        {title: "Work out", description: "Go on and work, money won't come out of nowhere, right?!", dueDate: Date.now(), isCompleted: false, priority: PriorityEnum.HIGH},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isCompleted: true, priority: PriorityEnum.MEDIUM},
        {title: "Watch a movie", description: "Go and relax! Watch a movie", dueDate: Date.now(), isCompleted: true, priority: PriorityEnum.LOW},
    ];
}