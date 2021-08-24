const Discord = require("discord.js");
const date = require('date-and-time');
const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: 'daily',
    description: 'Giver dig dine daily coins!',
    permissions: 'Ingen',
    example: '',
    async execute(bot, message, args, con) {
        
        let now = new Date()
        const tom = date.addDays(now, 1)
        let tmrw = new Date(tom)

        con.query("SELECT daily FROM data WHERE id = ?", [message.author.id], function (err, result) {
            if (err) throw err;
            try {
                if (now.getTime() >= result[0].daily || result[0].daily === 0) {
                    message.reply('du fik dine daglige 5000 coins')
                    con.query(`UPDATE data SET daily = ? WHERE id = ?`, [tmrw.getTime(), message.author.id], function (err, result) { if (err) throw err; });
                    con.query(`UPDATE data SET money = money + ? WHERE id = ?`, [5000, message.author.id], function (err, result) { if (err) throw err; });
                } else {
                    message.reply('der er ikke gået mere end 24 timer din abe')
                }
            } catch(err) {
                message.reply('du var ikke oprettet i databasen, men det er du nu, brug commanden igen :)')
            }
        });

    },
};