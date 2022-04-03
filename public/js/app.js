const APP_NAME = 'Easy Notes';
const DEFAULT_NOTE_TEXT = 'New note';
const FALLBACK_NOTE_TEXT = '< empty >';

const ICONS = {
    trash: 'icon-trash-empty',
    plus: 'icon-plus',
    eyeOff: 'icon-eye-off',
};

const renderHeader = (app) => {
    const header = DOM.create('h1', {
        html: APP_NAME,
    });

    app.append(header);
}

const getNoteMarkup = (noteData) => {
    const noTextMark = DOM.create('span', {
        classString: 'fade',
        html: FALLBACK_NOTE_TEXT,
    });

    const previewText = noteData.text
        ? noteData.text.split('\n').shift()
        : noTextMark;

    return (
        DOM.create('li', {
            classString: 'note',
            html: [

                DOM.create('div', {
                    classString: 'note__managment',
                    html: [

                        DOM.create('div', {
                            classString: 'note__preview',
                            html: previewText,
                        }),

                        DOM.create('div', {
                            classString: 'note__buttons',
                            html: [

                                DOM.create('button', {
                                    html: [

                                        DOM.create('i', {
                                            classString: ICONS.trash,
                                        }),
                                    ],
                                    attr: {
                                        type: 'button',
                                        action: 'delete',
                                    },
                                }),
                            ],
                        }),
                    ],
                }),

                DOM.create('div', {
                    classString: 'note__text',
                    html: noteData.text,
                    attr: {
                        contentEditable: true,
                    },
                }),
            ],
            data: {
                id: noteData.id,
            },
        })
    );
}

const getNoDataMark = () => {
    return DOM.create('li', {
        id: 'notes-no-data',
        classString: 'note',
        html: 'No data',
    });
}

const renderNotesList = (app) => {
    const notesData = NotesStorage.findAll();

    const notesMarkup = notesData.length
        ? notesData.map(noteData => {
            return getNoteMarkup(noteData);
        })
        : getNoDataMark();

    const notesListMarkup = DOM.create('ul', {
        id: 'notes-list',
        html: notesMarkup,
    });

    app.append(notesListMarkup);
}

const renderCreateButton = (app) => {
    const button = DOM.create('div', {
        id: 'add-note-btn-container',
        html: [

            DOM.create('button', {
                html: [

                    DOM.create('i', {
                        classString: ICONS.plus,
                    }),
                    'New note'
                ],
                attr: {
                    type: 'button',
                    action: 'create',
                },
            }),
        ]
    });

    app.append(button);
}

const toggleNoteText = (note) => {
    const noteText = note.querySelector('.note__text');
    const notes = document.querySelectorAll('.note__text');

    notes.forEach(note => {
        if (note === noteText) return;
        note.classList.remove('shown');
    });

    noteText.classList.toggle('shown');
}

const createNote = () => {
    const note = {
        id: Date.now(),
        text: DEFAULT_NOTE_TEXT,
    }

    NotesStorage.save(note.id, note);

    const noteMarkup = getNoteMarkup(note);
    const notesList = document.getElementById('notes-list');

    notesList.prepend(noteMarkup);

    const noDataMark = document.getElementById('notes-no-data');

    if (noDataMark) {
        noDataMark.remove();
    }
}

const updateNote = (note) => {
    const noteId = Number(note.dataset.id);
    const noteText = note.querySelector('.note__text');

    const newNote = {
        id: noteId,
        text: noteText.innerText.trim(),
    }

    const notePreview = note.querySelector('.note__preview');
    const newNoteMarkup = getNoteMarkup(newNote);
    const newNotePreview = newNoteMarkup.querySelector('.note__preview');

    notePreview.replaceWith(newNotePreview);
    NotesStorage.save(noteId, newNote);
}

const deleteNote = (note) => {
    const noteId = Number(note.dataset.id);

    NotesStorage.delete(noteId);
    note.remove();

    const notes = NotesStorage.findAll();

    if (!notes.length) {
        const notesList = document.getElementById('notes-list');
        const noDataMark = getNoDataMark();

        notesList.append(noDataMark);
    }
} 