const Header = {
    render(app) {
        const header = DOM.create('h1', {
            html: APP_NAME,
        });

        // .append - Adds an element at the end of app
        app.append(header);

        return header;
    }
}