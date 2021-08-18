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
        
            
        if(!message.author.bot) {
            try {
                bot.commands.get(command).execute(bot, message, args, con);
                loglortet()
            } catch (error) {
                console.error(error);
                message.reply('An error occurred');
            }
        }
    }
}