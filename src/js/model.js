class Model {
    constructor(){
        this.date = new Date();
        this.events = [];
        this.today = `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`;
        this.date.setDate(1);
        this.date.setMonth(this.date.getMonth() + 1);
    }

    getCalendarMonth(targetId){

        if(targetId === 'btn-next') this.date.setMonth(this.date.getMonth() + 1);
        if(targetId === 'btn-prev') this.date.setMonth(this.date.getMonth() - 1);
        if(targetId === 'current-day-btn') {
            let date = new Date();
            date.setMonth(date.getMonth() + 1);
            this.date.setTime(date.getTime());
        };

        return this.getGivenMonthArray();
        
    }

    getGivenMonthArray() {
        var calendarMonth = [],
            currentDate = new Date(this.date),
            currentDay;

        currentDate.setDate(1);

        currentDate.setMonth(currentDate.getMonth() - 1);

        const currentMonth = currentDate.getMonth();

        for(var i = 1; i <= 42; i++){

            if(i == 36 && currentDate.getMonth() != currentMonth) break;
            
            currentDay = currentDate.getDay();
            if(currentDay == 0) currentDay = 7;

            if(currentDay > i){
                currentDate.setDate(currentDate.getDate() - (currentDay - 1));
            };
            const currentDateAbb = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
            const event = this.getTagEvent(currentDateAbb);
            

            const dayObj = {
                date: currentDateAbb,
                event: event,
                today: currentDateAbb === this.today ? true : false
            };

            calendarMonth.push( dayObj );
            currentDate.setDate(currentDate.getDate() + 1);
            
        };

        return calendarMonth;
    }

    getStrTags(arr) {
        var newArr = [];
        var week = 0;
        for(var i = 0; i < arr.length; i++) {

            const currentDay = arr[i].date.split('/')[0];
            const currentDate = arr[i].date;
            const event = arr[i].event || '';
            const today = arr[i].today ? '<span class="td-bg today-bg"></span>' : '';

            if(week == 7) {
                newArr.push('</tr>');
                week = 0;
            }

            if(week == 0) newArr.push('<tr>');
            
            week++;
            

            if(i < 7){
                let day = week == 1 ? 'Понедельник' : week == 2 ? 'Вторник' : week == 3 ? 'Среда' : week == 4 ? 'Четверг' : week == 5 ? 'Пятница' : week == 6 ? 'Суббота' : week == 7 ? 'Воскресенье' : false;
                newArr.push(`<td data-date="${currentDate}"><span class="calendar__num">${day}, ${currentDay}</span>${event}${today}</td>`);
            } else {
                newArr.push(`<td data-date="${currentDate}"><span class="calendar__num">${currentDay}</span>${event}${today}</td>`);
            };
            
        }

        return newArr.join(' ');
    }

    getDateStr() {
        let strMonth = this.date.getMonth();
        const strYear = this.date.getFullYear();

        strMonth = strMonth === 0 ? 'Декабрь' : strMonth === 1 ? 'Январь' : strMonth === 2 ? 'Февраль' : strMonth === 3 ? 'Март' : strMonth === 4 ? 'Апрель' : strMonth === 5 ? 'Май' : strMonth === 6 ? 'Июнь' : strMonth === 7 ? 'Июль' : strMonth === 8 ? 'Август' : strMonth === 9 ? 'Сентябрь' : strMonth === 10 ? 'Октябрь' : strMonth === 11 ? 'Ноябрь' : false;
        
        return `${strMonth} ${strYear}`;
    }

    getObjectEvent(value) {
        let arr = value.split(',');

        arr[0] = arr[0].trim();
        let dateDay = arr[0].match(/^\d{1,2}/g)[0];

        let dateMonth = arr[0].match(/[а-я]+/gi)[0].toLowerCase();
        dateMonth = dateMonth === 'января' ? 1 : dateMonth === 'февраля' ? 2 : dateMonth === 'марта' ? 3 : dateMonth === 'апреля' ? 4 : dateMonth === 'мая' ? 5 : dateMonth === 'июня' ? 6 : dateMonth === 'июля' ? 7 : dateMonth === 'августа' ? 8 : dateMonth === 'сентября' ? 9 : dateMonth === 'октября' ? 10 : dateMonth === 'ноября' ? 11 : dateMonth === 'декабря' ? 12 : false;

        let dateYear = arr[0].match(/[0-9]{4}/g) || this.date.getFullYear();

        if(dateYear != this.date.getFullYear()) dateYear = dateYear[0];

        let obj = {
            name: arr[2].trim(),
            time: arr[1].trim(),
            date: `${dateDay}/${dateMonth}/${dateYear}`
        };

        const eventsSameDate = this.events.find(item => item.date == obj.date);
        
        if(eventsSameDate != undefined) return 'На заданное число уже есть событие !';

        this.events.push(obj);

        return obj;
    }

    getTagEvent(date) {
        const event = this.events.find(item => item.date == date);
        
        if(event === undefined) return false;

        return `<div class="event"><span class="event__name">${event.name}</span><span class="event__time">${event.time}</span><span class="td-bg event__bg"></span></div>`
        
    }

    getEvent(date) {
        const event = this.events.find(item => item.date == date);

        if(event === undefined) return false;

        return event;
    }

    addEvent(event) {
        this.events.push(event);
    }

    updateEvent(newEvent) {
        let eventIndex = this.events.findIndex(item => item.date === newEvent.date);
        
        this.events[eventIndex] = newEvent;
    }
    
}

export default Model;