const config = require('./config.json');
const Discord = require('discord.js');
const emoji = require('./emoji');
const Playboard = require('./Models/Playboard');

const bot = new Discord.Client({ disableEveryone: true });
const partie = new Playboard();

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

    if (args[0] === `start`) {

        const filter = (reaction, user) => {
            return emoji.all.includes(reaction.emoji.name);
        }
        //let embed = ":one::two::three::four::five::six::seven:\n:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:\n:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:\n:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:\n:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:\n:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:\n:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:"
        let embed = partie.toString();

        let msg = await message.channel.send(embed);


        await msg.react(emoji[1]);
        await msg.react(emoji[2]);
        await msg.react(emoji[3]);
        await msg.react(emoji[4]);
        await msg.react(emoji[5]);
        await msg.react(emoji[6]);
        await msg.react(emoji[7]);

        msg.awaitReactions(filter, { max: 1 })
            .then(collected => {
                const reaction = collected.first();

                switch (reaction.emoji.name) {
                    case emoji[1]:
                        partie.playAt(1);
                        break;
                    case emoji[2]:
                        partie.playAt(2);
                        break;
                    case emoji[3]:
                        partie.playAt(3);
                        break;
                    case emoji[4]:
                        partie.playAt(4);
                        break;
                    case emoji[5]:
                        partie.playAt(5);
                        break;
                    case emoji[6]:
                        partie.playAt(6);
                        break;
                    case emoji[7]:
                        partie.playAt(7);
                        break;
                }
                //draw();
            })
            .catch(collected => {
                message.reply('This make no sense');
            })
    }
})

bot.login(config.token);