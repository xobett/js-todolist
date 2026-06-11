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

    //INFO PANEL

    constructor(){
        
    }

    initialRender(){
        customElements.define('to-do', class extends HTMLElement {});
        this.#getRefs();
    }

    #getRefs() {
        this.#currentSectionTxt = document.getElementById('current-section-txt');
        this.#toDosContainer = document.getElementById('to-dos-container');
    }

    #handleInfoPanel() {
        const toDos = document.querySelectorAll('to-do');
        toDos.forEach(td => td.addEventListener('click', toggleInfoPanel));

        const closeInfoPanelBtn = document.getElementById('close-info-panel');
        closeInfoPanelBtn.addEventListener('click', toggleInfoPanel);

        function toggleInfoPanel(e) {
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