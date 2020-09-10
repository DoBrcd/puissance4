const Discord = require('discord.js');
const emoji = require('../emoji');


class Controller {
    constructor(bot) {
        this.bot = bot;
    }

    async draw(message, filter, partie) {

        let embed = partie.toString();

        let msg = await message.channel.send(embed);

        await msg.react(emoji[1]);
        await msg.react(emoji[2]);
        await msg.react(emoji[3]);
        await msg.react(emoji[4]);
        await msg.react(emoji[5]);
        await msg.react(emoji[6]);
        await msg.react(emoji[7]);

        return msg.awaitReactions(filter, { max: 1 })
            .then(collected => {
                const reaction = collected.first();

                switch (reaction.emoji.name) {
                    case emoji[1]:
                        console.log("Jouer dans la colonne 1");
                        return partie.playAt(1);
                    case emoji[2]:
                        console.log("Jouer dans la colonne 2");
                        return partie.playAt(2);
                    case emoji[3]:
                        console.log("Jouer dans la colonne 3");
                        return partie.playAt(3);
                    case emoji[4]:
                        console.log("Jouer dans la colonne 4");
                        return partie.playAt(4);
                    case emoji[5]:
                        console.log("Jouer dans la colonne 5");
                        return partie.playAt(5);
                    case emoji[6]:
                        console.log("Jouer dans la colonne 6");
                        return partie.playAt(6);
                    case emoji[7]:
                        console.log("Jouer dans la colonne 7");
                        return partie.playAt(7);
                    default:
                        msg.channel.send("Trolololololololololol");
                        break;
                }
            })
            .catch(collected => {
                console.log(collected);
                console.log("other");
            })
    }

    async redraw(message, filter, partie, result) {

        let embed = partie.toString();
        let msg = message;
        msg.edit(embed);

        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        await msg.react(emoji[1]);
        await msg.react(emoji[2]);
        await msg.react(emoji[3]);
        await msg.react(emoji[4]);
        await msg.react(emoji[5]);
        await msg.react(emoji[6]);
        await msg.react(emoji[7]);

        return msg.awaitReactions(filter, { max: 1 })
            .then(collected => {
                const reaction = collected.first();

                result = false;

                switch (reaction.emoji.name) {
                    case emoji[1]:
                        console.log("Jouer dans la colonne 1");
                        result = partie.playAt(1);
                        break;
                    case emoji[2]:
                        console.log("Jouer dans la colonne 2");
                        result = partie.playAt(2);
                        break;
                    case emoji[3]:
                        console.log("Jouer dans la colonne 3");
                        result =  partie.playAt(3);
                        break;
                    case emoji[4]:
                        console.log("Jouer dans la colonne 4");
                        result = partie.playAt(4);
                        break;
                    case emoji[5]:
                        console.log("Jouer dans la colonne 5");
                        result = partie.playAt(5);
                        break;
                    case emoji[6]:
                        console.log("Jouer dans la colonne 6");
                        result = partie.playAt(6);
                        break;
                    case emoji[7]:
                        console.log("Jouer dans la colonne 7");
                        result = partie.playAt(7);
                        break;
                    default:
                        msg.channel.send("Trolololololololololol");
                        break;
                }

                if(result) {
                    message.channel.send("Victoire");
                }
                return result;
            })
            .catch(collected => {
                console.log(collected);
                console.log("other");
            })
    }
}

module.exports = Controller;