const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: 'pay',
    description: 'Giv andre dine coins',
    permissions: 'Ingen',
    example: '!pay @user <coins>',
    async execute(bot, message, args, con) {
        
        let user = message.mentions.members.first() || message.guild.members.get.get(args[0]);
        let coins = args[1]

        con.query("SELECT money FROM data WHERE id = ?", [message.author.id], function (err, result) {
            if (err) throw err;
            if(result[0].money <= 0) return message.reply('du har ikke nogle penge.')
            if(result[0].money - Number(coins) < 0) return message.channel.send('du har ikke så mange penge.')
            try {
                con.query(`UPDATE data SET money = money + ? WHERE id = ?`, [coins, user.id], function (err, result) { if (err) throw err; });
                con.query(`UPDATE data SET money = money - ? WHERE id = ?`, [coins, message.author.id], function (err, result) { if (err) throw err; });
                let embed = new Discord.MessageEmbed()
                    .setTitle('Payment')
                    .setColor('#2F3136')
                    .setDescription(`Du sendte ${coins} til ${user}.`)
                    .setFooter(message.author.username, message.author.displayAvatarURL());

                message.reply(embed)
            } catch(err) {
                message.reply('du var ikke oprettet i databasen, men det er du nu, brug commanden igen :)')
            }
        });

    },
};