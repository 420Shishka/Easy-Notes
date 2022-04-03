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

        return notes.sort((a, b) => {
            if (Number(a) > Number(b)) return 1;
            if (Number(a) < Number(b)) return -1;
            return 0;
        });
    },
    save(id, data) {
        localStorage.setItem(id, JSON.stringify(data));

        return this;
    },
    delete(id) {
        localStorage.removeItem(id);

        return this;
    },
    purge() {
        localStorage.clear();

        return this;
    },
}