import '../css/variables.css';
import '../css/josh-comeau-reset.css';
import '../css/xobett-reset.css';
import '../css/components.css';
import '../css/main.css';
import '../css/navbar.css';
import '../css/content.css';

export { uiController };

const uiController = (() => {

    function render() {

    }

    const toDos = document.querySelectorAll('to-do');
    toDos.forEach(td => td.addEventListener('click', toggleInfoPanel));

    const closeInfoPanelBtn = document.getElementById('close-info-panel');
    closeInfoPanelBtn.addEventListener('click', toggleInfoPanel);

    function toggleInfoPanel() {
        if (document.body.classList.contains('info-displayed')) {
            document.body.classList.remove('info-displayed');
        }
        else {
            document.body.classList.add('info-displayed');
        }
    }

    return { render }
})();