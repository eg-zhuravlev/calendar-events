class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('generate', this.generate.bind(this));
    }

    generate() {
        const arr = this.model.getCalendarMonth();
        this.view.showCalendarMonth(arr);
    }
}

export default Controller;