class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('generate', this.generate.bind(this));
        view.on('quickCreationEvent', this.quickCreatEvent.bind(this));
        view.on('dateClick', this.dateEvent.bind(this));
        view.on('checkEvent', this.checkEvent.bind(this));
    }

    generate(targetId) {
        const arr = this.model.getCalendarMonth(targetId);
        const str = this.model.getStrTags(arr);
        const dateStr = this.model.getDateStr();

        this.view.showCalendarMonth(str);
        this.view.showDate(dateStr);
    }

    quickCreatEvent(value) {
        const event = this.model.getObjectEvent(value);
        if(typeof event == 'string') {
            this.view.showError(event);
        };

        this.view.generate();
        this.view.handleEventPopup();
    }

    checkEvent(obj) {
        const event = this.model.getEvent(obj.date);
        const newEvent = this.view.createEvent(obj.popup, obj.date);

        if(event) {
            console.log(newEvent);
            this.updateEvent(newEvent);
        } else {
            this.addEvent(newEvent);
        }

        this.view.generate();
    }

    addEvent(event) {
        this.model.addEvent(event);
    }

    updateEvent(event) {
        this.model.updateEvent(event);
    }
    
    dateEvent(date) {
        if(date === null) return false;

        const event = this.model.getEvent(date);

        let eventPopup = this.view.createEventDetailPopup(event);

        if(event) eventPopup = this.view.updateEventDetailPopup(event, eventPopup);

        this.view.showEventDetailPopup(date, eventPopup);
    }

    
}

export default Controller;