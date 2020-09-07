const config = require('./config.json');
const Discord = require('discord.js');
const emoji = require('./emoji');
const Playboard = require('./Models/Playboard');
const Controller = require('./Models/Controler');
const Player = require('./Models/Player');

const bot = new Discord.Client({ disableEveryone: true });
const controller = new Controller(bot);

bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne !`);
    bot.user.setActivity('puissance 4')
})

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (command === `${prefix}salut`) {
        return message.channel.send('Salut');
    }
    if (args[0] === `info`) {
        let botIcon = bot.user.displayAvatarURL;
        let embed = new Discord.MessageEmbed()
            .setDescription('information')
            .setColor('#FFCCFF')
            .setThumbnail(botIcon)
            .addField('Nom du bot', bot.user.username);

        return message.channel.send(embed);
    }

    if (args[0] === `s`) {
        const user1 = args[1];
        const user2 = args[2];
        const listPlayer = [new Player(user1), new Player(user2)];
        let partie = new Playboard(listPlayer);
        const filter = (reaction, user) => {
            return emoji.all.includes(reaction.emoji.name) && (!user.bot) && (user === user1 || user === user2);
        }
        let out = true;
        while (out == true) {
            await controller.draw(message, filter, partie, out);
        }
    }
    if (args[0] === 'avatar') {
        const user = message.author;
        return message.channel.send(`${user}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    }
    
})

bot.login(config.token);

module.exports = bot;