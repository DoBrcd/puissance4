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

    playAt(colonneIndex) {
        const col = this.colonnes[colonneIndex - 1];
        const canPlay = !(col.isFull());
        if (canPlay) {
            col.addPion(this.possibleEmoji[this.actualEmoji]);
            this.actualEmoji++;
            this.actualEmoji = this.actualEmoji % 2;
        } else {
            console.log("Colonne pleine");
        }
        return this.checkVictory(colonneIndex);
    }

    checkVictory(colIdx){
        let heightCounter = 0;
        const col = this.colonnes[colIdx -1];
        let indexChecker = col.pions.length -1;
        const startIndex = indexChecker;
        const firstPion = col.pions[indexChecker];

        /*

        try {
            while (col.getChecker(indexChecker++).getColor() == checker.getColor()) {
                heightCounter++;
            }
        } catch (Exception ignored) {

        }*/

        indexChecker = startIndex;

        try {
            while (col.pions[indexChecker--] == firstPion) {
                heightCounter++;
            }
        } catch {

        }

        if (heightCounter >= 4) {
            return true;
        }

        indexChecker = startIndex;
        let widthCounter = 0;
        const startCol = colIdx;

        try {

            while (this.colonnes[colIdx++].pions[indexChecker] == firstPion) {
                widthCounter++;
            }
        } catch {

        }

        colIdx = startCol - 1;
        try {

            while (this.colonnes[colIdx--].pions[indexChecker] == firstPion) {
                widthCounter++;
            }
        } catch {

        }

        if (widthCounter >= 4) {
            return true;
        }


        let diagGHBDCounter = 0; // diagonnal de en haut à gauche vers en bas à droite
        colIdx = startCol;
        indexChecker = startIndex;

        try {
            while (this.colonnes[colIdx--].pions[indexChecker++] == firstPion) {
                diagGHBDCounter++;
            }
        } catch {

        }

        colIdx = startCol + 1;
        indexChecker = startIndex - 1;

        try {
            while (this.colonnes[colIdx++].pions[indexChecker--] == firstPion) {
                diagGHBDCounter++;
            }
        } catch {

        }

        if (diagGHBDCounter >= 4) {
            return true;
        }

        let diagDHBGCounter = 0; // diagonnal de en haut à droite vers en bas à gauche
        colIdx = startCol;
        indexChecker = startIndex;

        try {
            while (this.colonnes[colIdx++].pions[indexChecker++] == firstPion) {
                diagDHBGCounter++;
            }
        } catch {

        }

        colIdx = startCol - 1;
        indexChecker = startIndex - 1;

        try {
            while (this.colonnes[colIdx--].pions[indexChecker--] == firstPion) {
                diagDHBGCounter++;
            }
        } catch {

        }

        return (diagDHBGCounter >= 4);
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