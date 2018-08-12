function createElement(tag, attr, inner, ...child) {
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
};

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(type, listener) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(listener => listener(arg));
        }
    }
}

export {createElement, EventEmitter};