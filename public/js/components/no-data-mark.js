const NoDataMark = {
    render(targetElement) {
        const noDataMark = DOM.create('li', {
            id: 'notes-no-data',
            classString: 'note',
            html: 'No data',
        });

        targetElement.append(noDataMark);

        return noDataMark;
    }
}