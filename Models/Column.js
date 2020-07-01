const Emoji = require('../emoji');
class Column {

    constructor() {
        this.pions = new Array();
    }

    addPion(emoji) {
        const notFull = !this.isFull();
        if (notFull) {
            this.pions.push(emoji);
        }
    }

    isFull() {
        const notFull = (this.pions.length < 6);
        if (notFull) {
            return false;
        }
        else return true;
    }

    toString(){
        let text = "";
        this.pions.forEach(pion => {
            text += pion;
        });
    }

}

module.exports = Column;