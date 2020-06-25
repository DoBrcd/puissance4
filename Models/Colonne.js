const Emoji = require('../emoji');
class Colonne {

    constructor(){
        this.pions = new Array(6);
    }

    addPion(emoji){
        if(pions.lenght < 6) {
            pions.push(emoji);
        }
    }

    isFull() {
        if(pions.lenght < 6) return false;
        else return true;
    }
    
}

module.exports = Colonne;