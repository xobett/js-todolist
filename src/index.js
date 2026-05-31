import {controller} from "./controllers/controller.js";
import { PriorityEnum } from "./enums/priorityEnum.js";

controller.run();

const projects = controller.getAllProjects();
console.log(projects);