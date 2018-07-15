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
        this.currentDayBtn = document.getElementById('current-day-btn');
        
        this.controlNext.addEventListener('click', this.generateAnother.bind(this));
        this.controlPrev.addEventListener('click', this.generateAnother.bind(this));
        this.currentDayBtn.addEventListener('click', this.generateAnother.bind(this));

        this.addEventBtn.addEventListener('click', this.handleEventPopup.bind(this));
        this.addEventPopupClose.addEventListener('click', this.handleEventPopup.bind(this));
        this.createEventBtn.addEventListener('click', this.handleQuickAddEvent.bind(this));
        this.refreshBtn.addEventListener('click', this.generate.bind(this));
        
    }

    addEventListeners(event, elems, func) {

        for(let i = 0; i < elems.length; i++) {
            elems[i].addEventListener(event, func);
        }

    }

    generate() {
        this.emit('generate');

        this.addEventListenerDate();
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

    addEventListenerDate() {
        const calendarItem = document.querySelectorAll('.calendar td');
        
        this.addEventListeners('click', calendarItem, this.handleEvent.bind(this));
    }

    handleEventPopup() {
        this.addEventBtn.classList.toggle('active');
        this.addEventPopup.classList.toggle('active');
    }

    handleQuickAddEvent() {
        const value = this.createEventInp.value;
        
        this.emit('quickCreationEvent', value);
    }

    handleEvent(event) {
        const targetDate = event.target.getAttribute('data-date');

        this.emit('dateClick', targetDate);
    }

    showError(str) {
        alert(str);
    }

}

export default View;