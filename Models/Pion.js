const Emoji = require('../emoji');
class Pion {

    constructor(emoji){
        this.emoji = emoji;
    }

    toString(){
        return this.emoji;
    }
}

module.exports = Pion;