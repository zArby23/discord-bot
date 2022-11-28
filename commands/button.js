const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, messageLink } = require("discord.js");
// const {client} = require('../index.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('button')
            .setDescription('I pretty looking button!'),

    async execute(interaction){
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
                // new ButtonBuilder()
                //     .setCustomId('secondary')
                //     .setLabel('Click this one?')
                //     .setStyle(ButtonStyle.Success)
            );
            
            await interaction.reply({content: 'I think you should...', components: [row]})

            const filter = (i) => i.customId === ('primary'/*|| 'secondary'*/) && i.user.id === '1036983677839736882' //message.author.id

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                await i.update({ content: 'The button was clicked! ~~No more interactions for you this time!~~', components: [] })
                
            });
            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        } 
}
