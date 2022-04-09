const CreateButton = {
    render(app) {
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

        return button;
    }
}