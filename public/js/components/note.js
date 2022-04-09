const Note = {
    // If lazy is true component just returns markup without actual render
    render(targetElement, data, options = { lazy: false, mode: 'append', }) {
        const note = DOM.create('li', {
            classString: 'note',
            html: [
                this.getManagement(data),
                this.getText(data),
            ],
            data: {
                id: data.id,
            },
        });

        if (options.lazy) {
            return note;
        }

        if (options.mode === 'prepend') {
            targetElement.prepend(note);
            return note;
        }

        targetElement.append(note);
        return note;
    },
    getNoTextMark() {
        return DOM.create('span', {
            classString: 'fade',
            html: FALLBACK_NOTE_TEXT,
        });
    },
    getManagement(data) {
        return DOM.create('div', {
            classString: 'note__managment',
            html: [
                this.getPreview(data),
                this.getButtons(),
            ],
        });
    },
    getPreview(data) {
        const noTextMark = this.getNoTextMark();

        const previewText = data.text
            ? data.text.split('\n').shift()
            : noTextMark;

        return DOM.create('div', {
            classString: 'note__preview',
            html: previewText,
        });
    },
    getButtons() {
        return DOM.create('div', {
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
        });
    },
    getText(data) {
        return DOM.create('div', {
            classString: 'note__text',
            html: data.text,
            attr: {
                contentEditable: true,
            },
        });
    }
}