// Main app logic
const setFocus = (targetElement) => {
    const selection = window.getSelection();
    const range = document.createRange();

    // Focus on shown note text and set caret at the end
    selection.removeAllRanges();
    range.selectNodeContents(targetElement);
    range.collapse(false);
    selection.addRange(range);
    targetElement.focus();
}

const selectContent = (targetElement) => {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(targetElement);
    selection.removeAllRanges();
    selection.addRange(range);
}

const toggleNoteText = (note, doSelection = false) => {
    const noteText = note.querySelector('.note__text');
    const notes = document.querySelectorAll('.note__text');

    notes.forEach(note => {
        if (note === noteText) return;
        note.classList.remove('shown');
    });

    noteText.classList.toggle('shown');
    setFocus(noteText);

    if (doSelection) {
        selectContent(noteText);
    }
}

const createNote = () => {
    const data = {
        id: Date.now(),
        text: DEFAULT_NOTE_TEXT,
    }

    NotesStorage.save(data.id, data);

    const notesList = document.getElementById('notes-list');
    const note = Note.render(notesList, data, {
        mode: 'prepend',
    });

    const noDataMark = document.getElementById('notes-no-data');

    if (noDataMark) {
        noDataMark.remove();
    }

    // DOM && Event Loop crutch :)
    setTimeout(() => toggleNoteText(note, true), 0);
}

const updateNote = (note) => {
    const noteId = Number(note.dataset.id);
    const noteText = note.querySelector('.note__text');

    const data = {
        id: noteId,
        text: noteText.innerText.trim(),
    }

    const notePreview = note.querySelector('.note__preview');
    const newNoteMarkup = Note.render(null, data, {
        lazy: true,
    });
    const newNotePreview = newNoteMarkup.querySelector('.note__preview');

    notePreview.replaceWith(newNotePreview);

    NotesStorage.save(noteId, data);
}

const deleteNote = (note) => {
    const noteId = Number(note.dataset.id);

    NotesStorage.delete(noteId);
    note.remove();

    const notes = NotesStorage.findAll();

    if (!notes.length) {
        const notesList = document.getElementById('notes-list');
        NoDataMark.render(notesList)
    }
} 