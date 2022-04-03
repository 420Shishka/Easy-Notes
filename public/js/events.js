document.addEventListener('click', evt => {
    const target = evt.target;
    const clickedPreview = target.closest('.note__preview');
    const clickedButton = target.closest('button');

    if (!clickedPreview && !clickedButton) return;

    if (clickedPreview) {
        const note = target.closest('.note');

        toggleNoteText(note);

        return;
    }

    if (target.closest('button').getAttribute('action') === 'create') {
        createNote();

        return;
    }

    if (target.closest('button').getAttribute('action') === 'delete') {
        const note = target.closest('.note');

        deleteNote(note);

        return;
    }
});

document.addEventListener('keyup', evt => {
    const target = evt.target;

    if (target.classList.contains('note__text')) {
        const note = target.closest('.note');

        updateNote(note);
    }
})
