import '../css/variables.css';
import '../css/josh-comeau-reset.css';
import '../css/xobett-reset.css';
import '../css/components.css';
import '../css/main.css';
import '../css/navbar.css';
import '../css/content.css';
import { format } from 'date-fns';

export class uiController {
    #iconRepo = {
        airplane: `     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-airplane-engines" viewBox="0 0 16 16">
                        <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1s.458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z"/>
                        </svg>`,
        backpack: `     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backpack" viewBox="0 0 16 16">
                        <path d="M4.04 7.43a4 4 0 0 1 7.92 0 .5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z"/>
                        <path d="M6 2.341V2a2 2 0 1 1 4 0v.341c2.33.824 4 3.047 4 5.659v5.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5V8a6 6 0 0 1 4-5.659M7 2v.083a6 6 0 0 1 2 0V2a1 1 0 0 0-2 0m1 1a5 5 0 0 0-5 5v5.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V8a5 5 0 0 0-5-5"/>
                        </svg>`,
        balloon: `      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>
                        </svg>`,
        bug: `          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
                        <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
                        </svg>`,
        emoji: `        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-dizzy" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708m-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708M10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                        </svg>`,
        joystick: `     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-joystick" viewBox="0 0 16 16">
                        <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2"/>
                        <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23"/>
                        </svg>`,
        code: `         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
                        </svg>`,
        yingyang: `      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-yin-yang" viewBox="0 0 16 16">
                        <path d="M9.167 4.5a1.167 1.167 0 1 1-2.334 0 1.167 1.167 0 0 1 2.334 0"/>
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 0 1 7-7 3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 0 0 7 7 7 0 0 1-7-7m7 4.667a1.167 1.167 0 1 1 0-2.334 1.167 1.167 0 0 1 0 2.334"/>
                        </svg>`,
        default: `       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-stack" viewBox="0 0 16 16">
                        <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"/>
                        <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"/>
                        </svg>`,
    };

    #currentSectionTxt;
    #toDosContainer;
    #hamburgerIcon;
    #header;
    #tabsContainer;

    #infoPanel;
    #closeInfoPanelBtn;
    #edit_input_title;
    #edit_input_description;
    #edit_input_dueDate;
    #edit_input_priority;
    #edit_input_Id;

    #editModal;
    #deleteModal;

    #project_edit_input_title;
    #project_edit_input_Id;
    #project_edit_input_icon;
    
    #iconBtns;

    #project_delete_input_Id;

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
        this.#edit_input_title = this.#infoPanel.querySelector('input[name="title"]');
        this.#edit_input_description = this.#infoPanel.querySelector('input[name="description"]');
        this.#edit_input_dueDate = this.#infoPanel.querySelector('input[name="dueDate"]');
        this.#edit_input_priority = this.#infoPanel.querySelector('select[name="priority"]');
        this.#edit_input_Id = this.#infoPanel.querySelector('input[name="Id"]');

        this.#editModal = document.getElementById('edit-modal');
        this.#deleteModal = document.getElementById('delete-modal');

        this.#project_edit_input_title = this.#editModal.querySelector('input');
        this.#project_edit_input_Id = this.#editModal.querySelector('input[name="Id"]');
        this.#project_edit_input_icon = this.#editModal.querySelector('input[name="icon"]');
        
        this.#iconBtns = this.#editModal.querySelectorAll('.icon-option');

        this.#project_delete_input_Id = this.#deleteModal.querySelector('input[name="Id"]');
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

        this.#deleteModal.querySelector('.btn:not(.btn-danger)').addEventListener('click', () => this.closeDeleteModal());

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

                if (clickedOutside) this.closeEditModal();
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

        this.#iconBtns.forEach((icon) => icon.addEventListener('click', (e) => {
            this.#iconBtns.forEach((i) => i.classList.remove('selected'));
            this.#project_edit_input_icon.value = e.target.getAttribute('data-icon');
            e.target.classList.add('selected');
        }));
    }

    #assignClickHandlers() {
        const toDos = document.querySelectorAll('to-do');
        toDos.forEach(td => td.addEventListener('click', this.#toggleInfoPanel));

        const displayData = (e) => {
            const td = e.currentTarget;
            this.#edit_input_Id.value = td.dataset.Id;
            this.#edit_input_title.value = td.dataset.title;
            this.#edit_input_description.value = td.dataset.description;
            this.#edit_input_dueDate.value = td.dataset.dueDate;
            this.#edit_input_priority.value = td.dataset.priority;
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

        document.body.classList.add('info-displayed');
    } 

    renderToDos(projectName, toDos) {
        this.#toDosContainer.replaceChildren();
        this.#currentSectionTxt.textContent = projectName ?? "If you think you've got this bugged, no you did not";

        toDos.forEach(td => {
            if (td === undefined || td === null) return;
            
            const toDo = document.createElement('to-do');
            toDo.tabIndex = 1;
            toDo.dataset.Id = td.Id;
            toDo.dataset.title = td.title;
            toDo.dataset.description = td.description ?? '';
            toDo.dataset.dueDate = td.dueDate;
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
            li.dataset.title = p.title;

            const a = document.createElement('a');
            a.href = '#';
            a.insertAdjacentHTML('beforeend', this.#iconRepo[p.icon ?? 'default']);

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
            editBtn.addEventListener('click', this.#showEditModal);
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', this.#showDeleteModal);

            this.#tabsContainer.append(li);
        });
    }

    #showEditModal = (e) => {
        e.stopPropagation();
        const dataset = e.target.closest('li.tab').dataset;
        
        this.#project_edit_input_title.value = dataset.title;
        this.#project_edit_input_Id.value = dataset.Id;

        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
        }

        this.#editModal.showModal();
    };

    #showDeleteModal = (e) => {
        e.stopPropagation();
        const dataset = e.target.closest('li.tab').dataset;
        
        this.#project_delete_input_Id.value = dataset.Id;

        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
        }

        this.#deleteModal.showModal();
    }

    closeEditModal() {
        this.#iconBtns.forEach((icon) => icon.classList.remove('selected'));
        this.#editModal.close();
    }

    closeDeleteModal() {
        this.#deleteModal.close();
    }

    closeHeader() {
        if (this.#header.classList.contains('active')) {
            this.#header.classList.remove('active');
        }
    }

    closeInfoPanel(){
        document.body.classList.remove('info-displayed');
    }

    get Inputs() {
        return document.querySelectorAll('to-do input[type="checkbox"]');
    }

    get NewToDoForm() {
        return document.getElementById('new-to-do');
    }

    get EditToDoForm() {
        return document.getElementById('to-do-edit-form');
    }

    get NewProjectForm() {
        return document.getElementById('new-project');
    }

    get EditProjectForm() {
        return document.getElementById('project-edit-form');
    }

    get DeleteProjectForm() {
        return document.getElementById('project-delete-form');
    }

    get DeleteButtons() {
        return document.querySelectorAll('div.delete-btn');
    }

    get ProjectTabs() {
        return document.querySelectorAll('li.tab');
    }
}