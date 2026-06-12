import '../css/variables.css';
import '../css/josh-comeau-reset.css';
import '../css/xobett-reset.css';
import '../css/components.css';
import '../css/main.css';
import '../css/navbar.css';
import '../css/content.css';

export class UiController {
    #currentSectionTxt;
    #toDosContainer;
    #hamburgerIcon;
    #header;
    #infoPanel;

    //INFO PANEL

    constructor(){
        
    }

    initialRender(){
        this.#getRefs();
        this.#assignEventHandlers();
    }

    #getRefs() {
        this.#currentSectionTxt = document.getElementById('current-section-txt');
        this.#toDosContainer = document.getElementById('to-dos-container');
        this.#hamburgerIcon = document.getElementById('hamburger-icon');
        this.#header = document.querySelector('header');
        this.#infoPanel = document.querySelector('.info-panel');
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
            if (e.target.tagName === 'INPUT') return;

            if (document.body.classList.contains('info-displayed')) {
                document.body.classList.remove('info-displayed');
            }
            else {
                document.body.classList.add('info-displayed');
            }
        }
    }

    render(projectName, toDos) {
        this.#currentSectionTxt.textContent = projectName ?? "No name";

        toDos.forEach(td => {
            //CREATE ELEMENT
            const toDo = document.createElement('to-do');
            toDo.tabIndex = 1;

            const input = Object.assign(document.createElement('input'), {
                name: td.Id,
                type: "checkbox",
            });
            const span = Object.assign(document.createElement('span'), {
                textContent: td.title,
            });

            toDo.append(input, span);
            this.#toDosContainer.append(toDo);
        });

        this.#handleInfoPanel();
    }

    get NewToDoForm() {
        return document.getElementById('new-to-do-form');
    }
}