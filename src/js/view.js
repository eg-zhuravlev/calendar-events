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

    getEventElements() {
        
        let eventNameInp = this.createElement('input', {
            type: 'text',
            class: 'event-detail__name event-detail__inp completed',
            id: 'event-detail-name'
        });

        let eventTimeInp = this.createElement('input', {
            type: 'text',
            class: 'event-detail__time event-detail__inp completed',
            id: 'event-detail-time',
            placeholder: 'Время'
        });

        let eventPartyInp = this.createElement('input', {
            type: 'text',
            class: 'event-detail__party event-detail__inp completed',
            id: 'event-detail-party',
            placeholder: 'Имена участников'
        });

        let eventDescInp = this.createElement('textarea', {
            class: 'event-detail__desc',
            id: 'event-detail-desc',
            placeholder: 'Описание'
        });

        let eventComletedBtn = this.createElement('button', {
            class: 'event-detail__completed event-detail__btn',
            id: 'event-detail-completed'
        }, 'Готово');

        let eventDelBtn = this.createElement('button', {
            class: 'event-detail__del event-detail__btn',
            id: 'event-detail-del'
        }, 'Удалить');

        let container = this.createElement('div', {
            id: 'event-detail',
            class: 'event-detail'
        }, '', eventNameInp, eventTimeInp, eventPartyInp, eventDescInp, eventComletedBtn, eventDelBtn);

        return container;
    }

    showEventDetail(event) {


        // <div class="event-detail" id="event-detail">
        //         <input type="text" class="event-detail__name event-detail__inp completed" value="Праздник труда !" placeholder="" id="event-detail-name">
        //         <input type="text" class="event-detail__time event-detail__inp completed" placeholder="Время" id="event-detail-time">
        //         <input type="text" class="event-detail__party event-detail__inp" value="" placeholder="Имена участников" id="event-detail-party">
        //         <textarea class="event-detail__desc" placeholder="Описание" id="event-detail-message"></textarea>
        //         <button class="event-detail__completed event-detail__btn" id="event-detail-completed">Готово</button>
        //         <button class="event-detail__del event-detail__btn" id="event-detail-del">Удалить</button>
        //     </div>

        const container = this.getEventElements();
        this.eventDetailName = document.getElementById('event-detail-name');
        this.eventDetailTime = document.getElementById('event-detail-time');
        this.eventDetailParty = document.getElementById('event-detail-party');
        this.eventDetailDesc = document.getElementById('event-detail-message');
        this.eventDetailCompleted = document.getElementById('event-detail-completed');
        this.eventDetailDel = document.getElementById('event-detail-del');

        container.getElementById('event-detail-name').value = event.name;
        container.getElementById('event-detail-time').value = event.time ? event.time : '';
        container.getElementById('event-detail-party').value = event.party ? event.party : '';
        container.getElementById('event-detail-desc').value = event.desc ? event.desc : '';

        let dateItem = document.querySelector(`.calendar td[data-date='${event.date}']`);

        dateItem.appendChild(container);

        this.eventDetailPopup.classList.add('active');

        

        console.log(event);
        
    }

    showError(str) {
        alert(str);
    }

}

export default View;