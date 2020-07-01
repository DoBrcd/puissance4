const Colonne = require("./Column");
const Emoji = require('../emoji');
const app = require('../index');

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
        //console.log(this.colonnes[nbColonne -1]);
        const col = this.colonnes[nbColonne -1];
        const canPlay = !(col.isFull());
        console.debug(col);
        console.debug(this.possibleEmoji[this.actualEmoji]);
        if (canPlay) {
            console.log("truc");
            col.addPion(this.possibleEmoji[this.actualEmoji]);
            this.actualEmoji++;
            this.actualEmoji = this.actualEmoji %2;
        } else {
            console.log("Colonne pleine");
        }
    }

    toString() {
        let text = Emoji[1] + Emoji[2] + Emoji[3] + Emoji[4] + Emoji[5] + Emoji[6] + Emoji[7] + "\n";
        for (let i = 6 - 1; i >= 0; i--) {
            for (let j = 0; j < 7; j++) {
                if (this.colonnes[j].pions[i]) {
                    text += this.colonnes[j].pions[i];
                } else {
                    text += Emoji.circle.white;
                }
            }
            text += "\n";
        }
        //console.log(text);
        return text;
    }
}

module.exports = Playboard;