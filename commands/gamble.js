const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'gamble',
    description: 'Gamble et givet amount og få det angivet X tilbage hvis du vinder. Chancen for du vinder vil altid være 100/X% så hvis du tager 10x har du 10% chance.w',
    permissions: 'Ingen',
    example: '!gamble 1000 5',
    async execute(bot, message, args, con) { 

        let betAmount = args[0];
        let Times = args[1];

        if(!betAmount || Number(betAmount) == 0) return message.reply('Du skal angive hvor meget du vil bette.');
        if(Number(betAmount) < 0) return message.reply('Er du hjerneskadet?')
        if(!Times) return message.reply('Du skal angive hvor mange X du vil gamble (2x,3x,4x,5x,10x).');

        try {
            con.query("SELECT money FROM data WHERE id = ?", [message.author.id], function (err, result) {
                if (err) throw err;
                if(result[0].money-Number(betAmount) >= 0) {
                    let allowedTimes = [2, 3, 4, 5, 10];
                    if(Times.toLowerCase().includes('x')) Times.replace(/\D/g, ""); // regex
                    if(!allowedTimes.includes(Number(Times))) return message.reply('Du skal angive et ordentligt bet amount (2x,3x,4x,5x,10x).');
                    let chance = 100/Number(Times); // burde gerne give det korrekte %chance, f.eks. 2x = 100/2 = 50% chance
                    con.query(`UPDATE data SET money = money - ? WHERE id = ?`, [Number(betAmount), message.author.id], function (err, result) { if (err) throw err; });
                    if(Math.floor(Math.random() * 100) < chance){ // tjekker om man faktiskt vinder
                        let winnings = Number(betAmount)*Number(Times);
                        let embed = new Discord.MessageEmbed()
                            .setTitle('Gamble Vundet')
                            .setColor('#319c03')
                            .setDescription(`Du vandt ${winnings} med ${chance}% chance.`)
                            .setFooter('Askov Gambling Bot', 'https://cdn.discordapp.com/attachments/381547722374774784/879772602443378698/henry.png');
                        
                        message.reply(embed)
                        con.query(`UPDATE data SET money = money + ? WHERE id = ?`, [winnings, message.author.id], function (err, result) { if (err) throw err; });
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('Gamble Tabt')
                            .setColor('#a10f05')
                            .setDescription(`Du tabte ${betAmount} og havde ${chance}% chance for at vinde.`)
                            .setFooter('Askov Gambling Bot', 'https://cdn.discordapp.com/attachments/381547722374774784/879772602443378698/henry.png');
            
                        return message.reply(embed)
                    }
                } else {
                    message.reply('Du har ikke penge nok til at gamble så meget din abe.')
                }
            });
        } catch(err) {
            message.reply('du var ikke oprettet i databasen, men det er du nu, brug commanden igen :)')
        }


    },
};