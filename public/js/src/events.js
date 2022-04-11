// Preview click handler
document.addEventListener('click', evt => {
    const target = evt.target;
    const clickedPreview = target.closest('.note__preview');

    if (clickedPreview) {
        const note = target.closest('.note');

        return toggleNoteText(note);
    }
});

// Buttons click handler
document.addEventListener('click', evt => {
    const target = evt.target;
    const clickedButton = target.closest('button');

    const handlers = {
        create() {
            return createNote();
        },
        delete() {
            const note = target.closest('.note');
            return deleteNote(note);
        }
    };

    if (clickedButton) {
        const action = clickedButton.getAttribute('action');

        // Get suitable action handler if it exists
        return Object.keys(handlers).includes(action)
            ? handlers[action]()
            : false;
    }
});

// Handles click outside note text, but not to preview
document.addEventListener('click', evt => {
    const target = evt.target;
    const clickedText = target.closest('.note__text');
    const clickedPreview = target.closest('.note__preview');

    if (!clickedText && !clickedPreview) {
        // Get shown note text on page
        const noteText = document.querySelector('.note__text.shown');

        // Get parent of shown note text if it exists
        const note = noteText
            ? noteText.closest('.note')
            : false;

        return note
            ? toggleNoteText(note)
            : false;
    }
});

// Enables save when Enter is pressed
document.addEventListener('keypress', evt => {
    // Check that user used mobile browser or not
    const isMobile = (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );

    const target = evt.target;
    const isEnterPressed = evt.key === 'Enter';
    const isShiftPressed = evt.shiftKey;

    // If Shift + Enter pressed do nothing
    if (isEnterPressed && isShiftPressed) {
        return false;
    }

    // If pressed single enter
    if (target.classList.contains('note__text') && isEnterPressed && !isMobile) {
        const note = target.closest('.note');

        evt.preventDefault();
        toggleNoteText(note);

        return false;
    }
});


// Updates note while user writes some text to note
document.addEventListener('keyup', evt => {
    const target = evt.target;

    if (target.classList.contains('note__text')) {
        const note = target.closest('.note');

        return updateNote(note);
    }
});