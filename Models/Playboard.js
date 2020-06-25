const Colonne = require("./Colonne");
const Emoji = require('../emoji');

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
        if (!this.colonnes[nbColonne].isFull) {
            this.colonnes[nbColonne].addPion(this.possibleEmoji[this.actualEmoji]);
            this.actualEmoji = this.actualEmoji++ % 2;
        }
    }

    toString() {
        let text = Emoji[1] + Emoji[2] + Emoji[3] + Emoji[4] + Emoji[5] + Emoji[6] + Emoji[7] +"\n";
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (this.colonnes[j].pions[i]) {
                    text += this.colonnes[j].pions[i];
                } else {
                    text += Emoji.circle.white;
                }
            }
            text += "\n";
        }
        return text;
    }
}

module.exports = Playboard;