import EventEmitter from "./helpers";

class View extends EventEmitter {
    constructor(){
        super();

        this.calendar = document.getElementsByClassName('calendar')[0];
        this.tbody = document.querySelector('.calendar tbody');
        this.addEventBtn = document.getElementsByClassName('header__btn_add')[0];
        this.refreshBtn = document.getElementsByClassName('header__btn_refresh')[0];
        this.controlNext = document.getElementsByClassName('control__btn_right')[0];
        this.controlPrev = document.getElementsByClassName('control__btn_left')[0];
        this.addEventPopup = document.getElementById('add-event-popup');
        this.addEventPopupClose = document.getElementById('add-event-close');
        this.createEventBtn = document.getElementById('add-event__btn');
        this.createEventInp = document.getElementById('add-event__inp');
        this.currentDateStr = document.getElementsByClassName('control__date')[0];
        
        this.controlNext.addEventListener('click', this.generateAnother.bind(this));
        this.controlPrev.addEventListener('click', this.generateAnother.bind(this));
        this.addEventBtn.addEventListener('click', this.handleEventPopup.bind(this));
        this.addEventPopupClose.addEventListener('click', this.handleEventPopup.bind(this));
        this.createEventBtn.addEventListener('click', this.handleQuickAddEvent.bind(this));
    }

    generate() {
        this.emit('generate');
    }

    generateAnother(event) {
        const targetId = event.currentTarget.id;
        this.emit('generate', targetId);
    }

    showCalendarMonth(str) {
        this.tbody.innerHTML = str;
    }

    showDate(str) {
        this.currentDateStr.innerHTML = str;
    }

    handleEventPopup() {
        this.addEventBtn.classList.toggle('active');
        this.addEventPopup.classList.toggle('active');
    }

    handleQuickAddEvent() {
        const value = this.createEventInp.value;
        
        this.emit('quickCreationEvent', value);
    }

    addEvent(event) {
        
    }
}

export default View;