const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: 'coins',
    description: 'Viser dit antal coins',
    permissions: 'Ingen',
    example: '!coins',
    async execute(bot, message, args, con) {
        
        con.query("SELECT money FROM data WHERE id = ?", [message.author.id], function (err, result) {
            if (err) throw err;
            try {
                let embed = new Discord.MessageEmbed()
                        .setTitle('Askov Game Design Coins')
                        .setColor('#2F3136')
                        .setDescription(`Du har **${result[0].money}** coins!`)
                        .setFooter(message.author.username, message.author.displayAvatarURL());

                message.reply(embed)
            } catch(err) {
                message.reply('du var ikke oprettet i databasen, men det er du nu, brug commanden igen :)')
            }
        });

    },
};