const Discord = require("discord.js");
const bot = new Discord.Client( { intents: Discord.Intents.NON_PRIVILEGED } );
const fs = require("fs");
const moment = require("moment"); 
const { stripIndents } = require("common-tags") 
const config = require("./config.json"); 
const con = require('./BotDatabase')
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);

    if (typeof command.aliases !== "undefined") {
        for (var i = 0; i < command.aliases.length; i++) {
            bot.commands.set(command.aliases[i], command);
        }
    }
}

console.table(bot.commands)

fs.readdirSync("./events").filter(f => f.endsWith(".js")).forEach(file => {
    const event = require("./events/" + file);
    let {
        eventName,
        custom = false,
        disabled = false,
        type = "on"
    } = event

    if (disabled) return;
    if (custom) return event.run(bot)

    try {
        const options = {
            config, 
            con, 
            Discord, 
            stripIndents,
            moment,
            fs
        }

        bot[type](eventName, (...args) => {
            event.run(bot, ...args, options);
        });
    } catch (err) {
        console.error(err.stack);
    }
});

function randomNum(min = 10000000, max = 99999999) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

bot.login(config.token)