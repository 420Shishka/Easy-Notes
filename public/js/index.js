const bootstrap = () => {
    const app = document.getElementById('app');

    renderHeader(app);
    renderCreateButton(app);
    renderNotesList(app);
}

document.addEventListener('DOMContentLoaded', bootstrap);