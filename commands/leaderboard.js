const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: 'leaderboard',
    description: 'Viser leaderboarded over dem med flest coins',
    permissions: 'Ingen',
    example: '!leaderboard',
    async execute(bot, message, args, con) {
        
        let promise = () => {
            return new Promise((resolve, reject) => {
                con.query(`SELECT * FROM data`, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        let prm = await promise();

        let promisedata = prm.map(function(item){return item.id}).reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }
          
            return acc;
        }, {});

        let coll = Object.fromEntries(Object.entries(promisedata))

        var sortable = [];
        for(var user in coll){
            sortable.push([user, coll[user]]);
        };

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let embed = new Discord.MessageEmbed()
            .setTitle('Askov GD Coin Leaderboard')
            .setColor('#2F3136')

        const entries = sortable;
        console.log(entries)
        for(let i = 0; i < 10; i++) {
            const entry = entries[i]
            let name = await bot.users.fetch(entry[0]).then(user => user.username)
            con.query(`SELECT money FROM data WHERE id = ?`, [entry[0]], function (err, result) {
                embed.addField(`${i + 1}. ${name}`, `${result[0].money} `)
            });
        };

        return message.channel.send(embed);

    },
};