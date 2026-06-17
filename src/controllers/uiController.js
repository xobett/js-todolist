import '../css/variables.css';
import '../css/josh-comeau-reset.css';
import '../css/xobett-reset.css';
import '../css/components.css';
import '../css/main.css';
import '../css/navbar.css';
import '../css/content.css';
import { format } from 'date-fns';

export class uiController {
    #currentSectionTxt;
    #toDosContainer;
    #hamburgerIcon;
    #header;
    #tabsContainer;

    #infoPanel;
    #closeInfoPanelBtn;
    #input_title;
    #input_description;
    #input_dueDate;
    #input_priority;

    #editModal;
    #deleteModal;

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
        this.#tabsContainer = this.#header.querySelector('ul');

        this.#infoPanel = document.querySelector('.info-panel');
        this.#closeInfoPanelBtn = document.getElementById('close-info-panel');
        this.#input_title = this.#infoPanel.querySelector('input[name="title"]');
        this.#input_description = this.#infoPanel.querySelector('input[name="description"]');
        this.#input_dueDate = this.#infoPanel.querySelector('input[name="dueDate"]');
        this.#input_priority = this.#infoPanel.querySelector('select[name="priority"]');

        this.#editModal = document.getElementById('edit-modal');
        this.#deleteModal = document.getElementById('delete-modal');

        this.#displayEditModal();
    }

    #assignEventHandlers() {
        this.#hamburgerIcon.addEventListener('click', (e) => {
            e.stopPropagation();

            if (document.body.classList.contains('info-displayed')) {
                document.body.classList.remove('info-displayed');
                return;
            }

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
            const clickedInsideEditModal = this.#editModal.contains(e.target);
            const clickedInsideDeleteModal = this.#deleteModal.contains(e.target);

            if (!clickedInsideInfoPanel) {
                document.body.classList.remove('info-displayed');
            }

            if (!clickedInsideHeader) {
                this.#header.classList.remove('active');
            }

            if (this.#editModal.open) {
                const rect = this.#editModal.getBoundingClientRect();
                const clickedOutside =
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom;

                if (clickedOutside) this.#editModal.close();
            }

            if (this.#deleteModal.open) {
                const rect = this.#deleteModal.getBoundingClientRect();
                const clickedOutside =
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom;

                if (clickedOutside) this.#deleteModal.close();
            }
        })

        this.#closeInfoPanelBtn.addEventListener('click', (e) => {
            if (document.body.classList.contains('info-displayed')) {
                document.body.classList.remove('info-displayed');
            }
        });
    }

    #assignClickHandlers() {
        const toDos = document.querySelectorAll('to-do');
        toDos.forEach(td => td.addEventListener('click', this.#toggleInfoPanel));

        const displayData = (e) => {
            const td = e.currentTarget;
            this.#input_title.value = td.dataset.title;
            this.#input_description.value = td.dataset.description;
            this.#input_dueDate.value = format(new Date(td.dataset.dueDate), 'yyyy-MM-dd');
            this.#input_priority.value = td.dataset.priority;
        };
        toDos.forEach(td => td.addEventListener('click', displayData));
    }

    #toggleInfoPanel = (e) => {
        e.stopPropagation();
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'DIV') return;

        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
            return;
        }

        if (document.body.classList.contains('info-displayed')) {
            document.body.classList.remove('info-displayed');
        }
        else {
            document.body.classList.add('info-displayed');
        }
    } 

    renderToDos(projectName, toDos) {
        this.#toDosContainer.replaceChildren();
        this.#currentSectionTxt.textContent = projectName ?? "No name";

        toDos.forEach(td => {
            if (td === undefined || td === null) return;
            
            const toDo = document.createElement('to-do');
            toDo.tabIndex = 1;
            toDo.dataset.Id = td.Id;
            toDo.dataset.title = td.title;
            toDo.dataset.description = td.description ?? '';
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

        this.#assignClickHandlers();
    }

    renderProjects(projects){
        const tabs = this.#tabsContainer.querySelectorAll('li.tab:not(.main)');
        tabs.forEach(tab => tab.remove());

        projects.forEach((p) => {
            const li = document.createElement('li');
            li.className = 'tab';
            li.dataset.Id = p.Id;

            const a = document.createElement('a');
            a.href = '#';
            a.insertAdjacentHTML('beforeend', `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-stack" viewBox="0 0 16 16">
                    <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"/>
                    <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"/>
                </svg>
            `);

            const span = Object.assign(document.createElement('span'), {
            textContent: p.title,
            });
            a.append(span);

            a.insertAdjacentHTML('beforeend', `
                <div class="edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                </div>
                <div class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
            `);

            li.append(a);

            const editBtn = li.querySelector('.edit-btn');
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.#displayEditModal();
            })
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.#displayDeleteModal();
            })

            this.#tabsContainer.append(li);
        });
    }

    #displayEditModal() {
        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
        }

        this.#editModal.showModal();
    }

    #displayDeleteModal() {
        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
        }

        this.#deleteModal.showModal();
    }

    closeHeader() {
        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
        }
    }

    get Inputs() {
        return document.querySelectorAll('to-do input[type="checkbox"]');
    }

    get NewToDoForm() {
        return document.getElementById('new-to-do');
    }

    get NewProjectForm() {
        return document.getElementById('new-project');
    }

    get EditForm() {
        return document.getElementById('edit-form');
    }

    get DeleteButtons() {
        return document.querySelectorAll('div.delete-btn');
    }

    get ProjectTabs() {
        return document.querySelectorAll('li.tab');
    }
}