import { format } from "date-fns";

class ProjectSeeder {
    #values = [
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isUrgent: false, isCompleted: false},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isUrgent: false, isCompleted: false},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isUrgent: false, isCompleted: false},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isUrgent: false, isCompleted: false},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isUrgent: false, isCompleted: false},
        {title: "Laundry", description: "Go on and wash your dirty clothes!", dueDate: Date.now(), isUrgent: false, isCompleted: false},
    ];
    
    constructor(repository) {
        repository.push(...this.#values);
    }
}