module.exports = {
    eventName: "ready",
    disabled: false,
    type: "on",
    run: async (bot, options) => {
        const {config, con} = options
    
        bot.user.setActivity("varmeste bot af Ossie", {
            type: 'WATCHING'
        })

        console.log(`Gambling botten er startet.`);
    }
}