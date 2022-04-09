const NotesStorage = {
    findOne(id) {
        const note = localStorage.getItem(id);

        if (!note) {
            throw new Error(`Note with id '${id}' doesn't exist`);
        }

        return JSON.parse(note);
    },
    findAll() {
        const keys = Object.keys(localStorage);
        const notes = keys.map(key => this.findOne(key));
        const sortedNotes = notes.sort((a, b) => b.id - a.id);

        return sortedNotes;
    },
    save(id, data) {
        localStorage.setItem(id, JSON.stringify(data));

        return this;
    },
    delete(id) {
        localStorage.removeItem(id);

        return this;
    },
}