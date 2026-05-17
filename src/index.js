import {controller} from "./js/controllers/controller.js";

controller.run();

const projectValue = {
    title: "New project!",
    notes: "Need a virtual connection",
};
controller.createProject(projectValue)
console.log(controller.getAllProjects());

//SEED