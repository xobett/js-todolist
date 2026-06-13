import '../css/variables.css';
import '../css/josh-comeau-reset.css';
import '../css/xobett-reset.css';
import '../css/components.css';
import '../css/main.css';
import '../css/navbar.css';
import '../css/content.css';
import { format } from 'date-fns';

export class UiController {
    #currentSectionTxt;
    #toDosContainer;
    #hamburgerIcon;
    #header;

    #infoPanel;
    #input_title;
    #input_description;
    #input_dueDate;
    #input_priority;

    //INFO PANEL

    constructor(){}

    init(){
        this.#getRefs();
        this.#assignEventHandlers();
    }

    #getRefs() {
        this.#currentSectionTxt = document.getElementById('current-section-txt');
        this.#toDosContainer = document.getElementById('to-dos-container');
        this.#hamburgerIcon = document.getElementById('hamburger-icon');
        this.#header = document.querySelector('header');

        this.#infoPanel = document.querySelector('.info-panel');
        this.#input_title = this.#infoPanel.querySelector('input[name="title"]');
        this.#input_description = this.#infoPanel.querySelector('input[name="description"]');
        this.#input_dueDate = this.#infoPanel.querySelector('input[name="dueDate"]');
        this.#input_priority = this.#infoPanel.querySelector('select[name="priority"]');
    }

    #assignEventHandlers() {
        this.#hamburgerIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.#header.classList.contains('active')) {
                this.#header.classList.remove('active');
            }
            else{
                this.#header.classList.add('active');
            }
        });

        document.addEventListener('click', (e) => {
            const clickedInsideInfoPanel = this.#infoPanel.contains(e.target);
            const clickedInsideHeader = this.#header.contains(e.target);

            if (!clickedInsideInfoPanel) {
                document.body.classList.remove('info-displayed');
            }

            if (!clickedInsideHeader) {
                this.#header.classList.remove('active');
            }
        })
    }

    #handleInfoPanel() {
        const toDos = document.querySelectorAll('to-do');
        toDos.forEach(td => td.addEventListener('click', toggleInfoPanel));

        const closeInfoPanelBtn = document.getElementById('close-info-panel');
        closeInfoPanelBtn.addEventListener('click', toggleInfoPanel);

        function toggleInfoPanel(e) {
            e.stopPropagation();
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'DIV') return;

            if (document.body.classList.contains('info-displayed')) {
                document.body.classList.remove('info-displayed');
            }
            else {
                document.body.classList.add('info-displayed');
            }
        }

        const displayData = (e) => {
            const td = e.currentTarget;
            this.#input_title.value = td.dataset.title;
            this.#input_description.value = td.dataset.description;
            this.#input_dueDate.value = format(new Date(td.dataset.dueDate), 'yyyy-MM-dd');
            this.#input_priority.value = td.dataset.priority;
        };
        toDos.forEach(td => td.addEventListener('click', displayData));
    }

    render(projectName, toDos) {
        this.#toDosContainer.replaceChildren();
        this.#currentSectionTxt.textContent = projectName ?? "No name";

        toDos.forEach(td => {
            //CREATE ELEMENT
            const toDo = document.createElement('to-do');
            toDo.tabIndex = 1;
            toDo.dataset.Id = td.Id;
            toDo.dataset.title = td.title;
            toDo.dataset.description = td.description;
            toDo.dataset.dueDate = new Date(td.dueDate);
            toDo.dataset.priority = td.priority;

            const input = Object.assign(document.createElement('input'), {
                name: toDo.dataset.Id,
                type: "checkbox",
            });
            input.checked = td.isCompleted;

            const span = Object.assign(document.createElement('span'), {
                textContent: td.title,
            });

            const deleteBtn = document.createElement('div');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            `;

            toDo.append(input, span, deleteBtn);
            this.#toDosContainer.append(toDo);
        });

        this.#handleInfoPanel();
    }

    get Inputs() {
        return document.querySelectorAll('to-do input[type="checkbox"]');
    }

    get NewToDoForm() {
        return document.getElementById('new-to-do-form');
    }

    get EditForm() {
        return document.getElementById('edit-form');
    }

    get DeleteButtons() {
        return document.querySelectorAll('div.delete-btn');
    }
}