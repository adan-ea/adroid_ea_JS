const { GENERAL } = require("../../utils/config");

module.exports = {
    name: 'messageCreate',
    once: false,
    /**
     * Event triggered when a user sends a message in the guild. When triggered, sends a welcome message in the public log channel.
     * @param {Client} client - The main hub for interacting with the Discord API, and the starting point for the bot.
     * @param {Message} message - Represents a message on Discord.
     */
    execute(client, message) {
        //Accepts (case insensitive) : i'm / i am / I be
        const englishDadRegex = /\bi(?:(?:\s+a|')?m|\s+be)\s+(?=\S)/i;
        //Accepts (case insensitive) : je suis / jsuis / j'suis
        const frenchDadRegex = /j(?:e+\s|')?suis/i;
        const englishMatch = message.content.match(englishDadRegex);
        const frenchMatch = message.content.match(frenchDadRegex);
        if (message.channel.id === GENERAL) {
            if (!message.author.bot) {
                let randomReact = Math.random();
                switch (true) {
                    case /\ballo\b/gi.test(message.content):
                        return message.reply(
                            'https://cdn.discordapp.com/attachments/771934231647223848/932926764253052949/oui_allo_jegoutte.jpg'
                        );

                    case /hello there/gim.test(message.content):
                        return message.reply(
                            'https://tenor.com/view/hello-there-general-kenobi-star-wars-grevious-gif-17774326'
                        );

                    case /jpp/gim.test(message.content):
                        if (randomReact > 0.95) {
                            return message.reply(
                                'https://cdn.discordapp.com/attachments/771934231647223848/938389858802606160/jpp_jean-pierre.png'
                            );
                        }
                        return;

                    case /quoi/gim.test(message.content):
                        if (randomReact > 0.95) {
                            return message.reply('feur <3');
                        }
                        return;

                    case frenchDadRegex.test(message.content):
                        if (randomReact > 0.9) {
                            const name = message.content
                                .slice(
                                    frenchMatch.index + frenchMatch[0].length
                                )
                                .trim();
                            if (!name || name.length > 100) return false;
                            return message.reply(
                                `Salut ${name}, Je suis ton père !`
                            );
                        }
                        return;

                    case englishDadRegex.test(message.content):
                        if (randomReact > 0.5) {
                            const name = message.content
                                .slice(
                                    englishMatch.index + englishMatch[0].length
                                )
                                .trim();
                            if (!name || name.length > 100) return false;
                            return message.reply(`Hi ${name}, I'm dad!`);
                        }
                        return;

                    default:
                        if(randomReact > 0.99) {
                            return message.reply('Tu sais que t\'es vraiment une personne méga sublime de la mort qui tue ? on est tellement content de t\'avoir sur le serveur')
                        }
                        return;
                }
            }
        }
    }
};
