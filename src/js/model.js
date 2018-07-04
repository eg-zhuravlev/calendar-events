class Model {
    constructor(){
        
    }

    getCalendarMonth(obj){
        
        if(!obj) {
            var date = new Date();

            obj = {
                year: date.getFullYear(),
                month: date.getMonth()
            }
        }

        return this.getGivenMonthArray(obj);
        
    }


    getGivenMonthArray(obj) {
        var calendarMonth = [],
            currentDate = new Date(obj.year, obj.month),
            currentMonth = currentDate.getMonth(),
            currentDay;

        for(var i = 1; currentDate.getMonth() == currentMonth; i++){
            
            currentDay = currentDate.getDay();
            if(currentDay == 0) currentDay = 7;

            if(currentDay > i){
                calendarMonth.push('n');
                continue;
            };
            
            calendarMonth.push(currentDate.getDate());
            currentDate.setDate(currentDate.getDate() + 1);
            
        };

        return calendarMonth;
    }
    
}

export default Model;