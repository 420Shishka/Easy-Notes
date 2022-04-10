const NoDataMark = {
    render(targetElement) {
        const noDataMark = DOM.create('li', {
            id: 'notes-no-data',
            classString: 'note fade',
            html: [
                DOM.create('div', {
                    id: 'notes-no-data-icon',
                    html: DOM.create('i', {
                        classString: ICONS.eyeOff,
                    }),
                }),
                DOM.create('div', {
                    id: 'notes-no-data-hint',
                    html: 'Notes not found',
                }),
            ],
        });

        targetElement.append(noDataMark);

        return noDataMark;
    }
}