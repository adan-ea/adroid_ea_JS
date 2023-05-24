const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
const { version } = require('../../package.json');
const cmdFolder = readdirSync('./commands');
const contextDescription = {
    userInfo: 'Shows informations about a user'
};

module.exports = {
    name: 'helpea',
    description: 'Affiche un message avec toutes les commandes du bot',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    usage: 'helpea',
    examples: ['helpea', 'helpea pingea'],
    options: [
        {
            name: 'commande',
            description: 'La méchante commande qui te pose souci',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    /**
     * Sends a message with a complete explenation about commands
     * @param {Client} client - The main hub for interacting with the Discord API, and the starting point for the bot.
     * @param {CommandInteraction} interaction - Represents a command interaction.
     */
    async runInteraction(client, interaction) {
        const cmdName = interaction.options.getString('commande');
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (!cmdName) {
            const noArgsEmbed = new EmbedBuilder()
                .setAuthor({
                    name: `${interaction.member.user.username}`,
                    iconURL: interaction.member.user.displayAvatarURL()
                })
                .setThumbnail(
                    'https://cdn.discordapp.com/attachments/763373898779197481/887604870578843668/Zw.png'
                )
                .setTitle(`❄ Voici toutes les commandes du bot !`)
                .setDescription('----------------------')
                .setColor(randomColor);
            for (const category of cmdFolder) {
                noArgsEmbed.addFields([
                    {
                        name: `❄ ${category.replace(
                            /(^\w|\s\w)/g,
                            firstLetter => firstLetter.toUpperCase()
                        )} :`,
                        value: ` \`\`${client.commands
                            .filter(
                                cmd => cmd.category === category.toLowerCase()
                            )
                            .map(cmd => cmd.name)
                            .join(' | ')}\`\``
                    },
                    {
                        name: '----------------------',
                        value: `**\`/helpea <commande>\` Pour plus d'informations.**`
                    }
                ]);
            }

            noArgsEmbed
                .addFields([{ name: 'Version', value: `v${version}` }])
                .setFooter({
                    text: `( ) = alias | < > = optionnel | [ ] = requis | (A ne pas inclure dans les commandes)`
                });
            return interaction.reply({
                embeds: [noArgsEmbed],
                ephemeral: true
            });
        }
        const cmd = client.commands.get(cmdName);
        if (!cmd) {
            return interaction.reply({
                content:
                    "Cette commande n'existe pas ou vous avez fait une typo.",
                ephemeral: true
            });
        }
        return interaction.reply({
            content: `
\`\`\`makefile
[Help: Commande: -> ${cmd.name}]

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Comment l'utiliser : /${cmd.usage}
Exemples : /${cmd.examples.join(` | /`)}

------------
( ) = alias | < > = optionnel | [ ] = requis | (A ne pas inclure dans les commandes)
\`\`\`
        `,
            ephemeral: true
        });
    }
};
