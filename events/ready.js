module.exports = {
    eventName: "ready",
    disabled: false,
    type: "on",
    run: async (bot, options) => {
        const {config, con} = options
    
        console.log(`Gambling botten er startet.`);
    }
}