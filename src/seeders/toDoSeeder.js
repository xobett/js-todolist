import { PriorityEnum } from "../enums/priorityEnum.js";

export { ToDoSeeder };

class ToDoSeeder {

    values = [
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isCompleted: false, priority: PriorityEnum.HIGH},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isCompleted: false, priority: PriorityEnum.HIGH},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isCompleted: false, priority: PriorityEnum.HIGH},
    ];
}