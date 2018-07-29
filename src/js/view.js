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
        
        this.controlNext.addEventListener('click', this.generate.bind(this));
        this.controlPrev.addEventListener('click', this.generate.bind(this));
        this.currentDayBtn.addEventListener('click', this.generate.bind(this));

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

    generate(event) {

        let targetId = '';

        if(event !== undefined) targetId = event.currentTarget.id;

        this.emit('generate', targetId);

        this.addEventListenerDate();
    }

    showCalendarMonth(str) {
        this.tbody.innerHTML = str;
    }

    showDate(str) {
        this.currentDateStr.innerHTML = str;
    }

    addEventListenerDate() {
        const calendarItem = document.querySelectorAll('.calendar td');

        this.addEventListeners('click', calendarItem, this.handleEventDetail.bind(this));
    }

    handleEventPopup() {
        this.addEventBtn.classList.toggle('active');
        this.addEventPopup.classList.toggle('active');
    }

    handleQuickAddEvent() {
        const value = this.createEventInp.value;
        
        this.emit('quickCreationEvent', value);
    }

    handleEventDetail(event) {
        const targetDate = event.target.getAttribute('data-date');

        this.emit('dateClick', targetDate);
    }

    //Перенести в helpers
    createElement(tag, attr, inner, ...child) {
        let elem = document.createElement(tag);

        if(inner) {
            elem.innerHTML = inner;
        };

        for(let key in attr) {
            elem.setAttribute(key, attr[key])
        };

        if(child) {
            for(let i = 0; i < child.length; i++) {
                elem.appendChild(child[i])
            };
        }

        return elem;
    }

    handleEvent(event) {
        const dateItem = event.path[2];
        const eventPopup = event.path[1];
        
        this.emit('checkEvent', { date: dateItem.getAttribute('data-date'), popup: eventPopup });
    }

    createEvent(popup, date) {
        const eventNameInp = popup.getElementsByClassName('event-detail__name')[0];
        const eventTimeInp = popup.getElementsByClassName('event-detail__time')[0];
        const eventPartyInp = popup.getElementsByClassName('event-detail__party')[0];
        const eventDescInp = popup.getElementsByClassName('event-detail__desc')[0];

        const eventObj = {
            name: eventNameInp.value,
            time: eventTimeInp.value,
            party: eventPartyInp.value,
            desc: eventDescInp.value,
            date: date
        }

        return eventObj;
    }

    createEventDetailPopup() {

        let eventNameInp = this.createElement('input', {
            type: 'text',
            class: 'event-detail__name event-detail__inp',
            placeholder: 'Событие'
        });

        let eventTimeInp = this.createElement('input', {
            type: 'text',
            class: 'event-detail__time event-detail__inp',
            placeholder: 'Время'
        });

        let eventPartyInp = this.createElement('input', {
            type: 'text',
            class: 'event-detail__party event-detail__inp',
            placeholder: 'Имена участников'
        });

        let eventDescInp = this.createElement('textarea', {
            class: 'event-detail__desc',
            placeholder: 'Описание'
        });

        let eventSaveBtn = this.createElement('button', {
            class: 'event-detail__save event-detail__btn',
        }, 'Сохранить');

        let eventDelBtn = this.createElement('button', {
            class: 'event-detail__del event-detail__btn',
        }, 'Удалить');

        let eventCloseBtn = this.createElement('span', {
            class: 'event-detail__close'
        });

        let eventEditBtn = this.createElement('span', {
            class: 'event-detail__edit'
        });

        eventSaveBtn.addEventListener('click', this.handleEvent.bind(this));
        eventCloseBtn.addEventListener('click', this.closeEventDetailPopup.bind(this));
        eventEditBtn.addEventListener('click', this.editFieldEventDetail.bind(this));

        let container = this.createElement('div', {
            class: 'event-detail active'
        }, '', eventNameInp, eventTimeInp, eventPartyInp, eventDescInp, eventSaveBtn, eventDelBtn, eventCloseBtn);

        return container;
    }

    closeEventDetailPopup() {
        let activeEventPopup = document.querySelector('.event-detail.active');
        activeEventPopup.classList.remove('active');
    }

    updateEventDetailPopup(event, popup) {
        let eventNameInp = popup.getElementsByClassName('event-detail__name')[0];
        let eventTimeInp = popup.getElementsByClassName('event-detail__time')[0];
        let eventPartyInp = popup.getElementsByClassName('event-detail__party')[0];
        let eventDescInp = popup.getElementsByClassName('event-detail__desc')[0];
        let popupChildrenText = popup.querySelectorAll('input, textarea');

        eventNameInp.value = event.name;

        eventTimeInp.value = event.time ? event.time : '';
        eventPartyInp.value = event.party ? event.party : '';
        eventDescInp.value = event.desc ? event.desc : '';

        for(let i = 0; i < popupChildrenText.length; i++) {
            if(popupChildrenText[i].value != '') {
                popupChildrenText[i].setAttribute('disabled', 'disabled');
            }
        }

        return popup;
    }

    showEventDetailPopup(date, eventPopup) {

        let dateItem = document.querySelector(`.calendar td[data-date='${date}']`);
        let dateItemEvent = dateItem.getElementsByClassName('event-detail');
        let eventPopupActive = document.querySelectorAll('.event-detail.active');

        if(dateItem.querySelector('.event-detail.active')) return false;

        if(eventPopupActive.length > 0) {
            eventPopupActive.forEach(item => item.classList.remove('active'))
        };

        if(dateItemEvent.length > 0) {
            dateItemEvent[0].classList.add('active');
        } else {
            dateItem.appendChild(eventPopup);
        }
        
    }

    editFieldEventDetail(event) {

    }

    showError(str) {
        alert(str);
    }

}

export default View;