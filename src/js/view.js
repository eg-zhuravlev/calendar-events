import EventEmitter from "./helpers";

class View extends EventEmitter {
    constructor(){
        super();

        this.calendar = document.getElementsByClassName('calendar')[0];
        this.addEventBtn = document.getElementsByClassName('header__btn_add')[0];
        this.refreshBtn = document.getElementsByClassName('header__btn_refresh')[0];
        this.controlNext = document.getElementsByClassName('control__btn_right')[0];
        this.controlPrev = document.getElementsByClassName('control__btn_left')[0];
        
        this.currentDateStr = document.getElementsByClassName('control__date')[0];
     
    }

    generate() {
        this.emit('generate');
    }

    showCalendarMonth(arrMonth) {
        console.log(arrMonth);
        // for(var i = 0; i < arrMonth.length; i++){
        //     this.calendar.appendChild(arrMonth[i]);
        // }
    }
}

export default View;