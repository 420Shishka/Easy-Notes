const NotesList = {
    render(app) {
        const notesData = NotesStorage.findAll();

        const list = DOM.create('ul', {
            id: 'notes-list',
        });

        notesData.length
            ? notesData.forEach(noteData => {
                Note.render(list, noteData);
            })
            : NoDataMark.render(list);

        app.append(list);

        return list;
    }
}