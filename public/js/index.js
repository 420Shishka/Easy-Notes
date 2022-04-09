const bootstrap = () => {
    const app = document.getElementById('app');

    Header.render(app);
    CreateButton.render(app);
    NotesList.render(app);

    document.title = APP_NAME;
}

document.addEventListener('DOMContentLoaded', bootstrap);