const DOM = {

    /**
     * Options:
     * 
     * @id string
     * @classString string
     * @html element | array
     * @data object
     * @attr object
     */

    create(tagName, options = {}) {
        const availableTags = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'li',
            'div', 'span',
            'button',
            'i',
        ];

        if (!availableTags.includes(tagName)) {
            throw new Error(`Unsupported tag '${tagName}'`)
        }

        const element = document.createElement(tagName);

        if ('id' in options) {
            element.id = options.id;
        }

        if ('classString' in options) {
            element.classList.add(options.classString);
        }

        if ('html' in options) {
            Array.isArray(options.html)
                ? options.html.forEach(item => element.append(item))
                : element.append(options.html);
        }

        if ('data' in options) {
            for (const key in options.data) {
                element.dataset[key] = options.data[key];
            }
        }

        if ('attr' in options) {
            for (const key in options.attr) {
                element.setAttribute(key, options.attr[key]);
            }
        }

        return element;
    }
}