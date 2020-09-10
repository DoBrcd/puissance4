const Colonne = require("./Column");
const Emoji = require('../emoji');
const app = require('../index');
const space = '       '

class Playboard {
    constructor() {
        this.colonnes = [
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne()
        ];
        this.possibleEmoji = [
            Emoji.circle.red,
            Emoji.circle.yellow
        ]
        this.actualEmoji = 0;
    }

    playAt(nbColonne) {
        const col = this.colonnes[nbColonne - 1];
        const canPlay = !(col.isFull());
        if (canPlay) {
            col.addPion(this.possibleEmoji[this.actualEmoji]);
            this.actualEmoji++;
            this.actualEmoji = this.actualEmoji % 2;
        } else {
            console.log("Colonne pleine");
        }
    }

    toString() {
        let text = Emoji[1] + space + Emoji[2] + space + Emoji[3] + space + Emoji[4] + space + Emoji[5] + space + Emoji[6] + space + Emoji[7] + "\n";
        for (let i = 6 - 1; i >= 0; i--) {
            for (let j = 0; j < 7; j++) {
                if (this.colonnes[j].pions[i]) {
                    text += this.colonnes[j].pions[i] ;
                } else {
                    text += Emoji.circle.white;
                }
                text += space;
            }
            text += "\n";
        }
        //console.log(text);
        return text;
    }
}

module.exports = Playboard;