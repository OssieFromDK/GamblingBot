module.exports = {
    eventName: "message",
    disabled: false,
    type: "on",
    run: async (bot, message, options) => {
        const {config, con, Discord} = options

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

        if (message.content.indexOf(config.prefix) !== 0) return;
        const command = args.shift().toLowerCase();
    
    
        if (!bot.commands.has(command)) return;
        
        function checkUser() {
            con.query("SELECT id FROM data WHERE id = ?", [message.author.id], function (err, result) {
                if (err) throw err;
                if (result.length === 0) con.query(`INSERT INTO data (id) VALUES (?)`, [message.author.id], function (err, result) { if (err) throw err; });
            })
        }

        
            
        if(!message.author.bot) {
            try {
                bot.commands.get(command).execute(bot, message, args, con);
                checkUser()
            } catch (error) {
                console.error(error);
                message.reply('An error occurred');
            }
        }
    }
}