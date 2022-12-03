const { ActionRowBuilder, ButtonBuilder} = require("@discordjs/builders");
const { SlashCommandBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('btntest')
            .setDescription('Testing something with the buttons...'),

    async execute(interaction){
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('button')
                .setLabel('Click me.')
                .setStyle(ButtonStyle.Success),
        );
        
        await interaction.reply({content: 'Just click the button below.', components: [row]})


        const collector = interaction.channel.createMessageComponentCollector({time: 15000});

        collector.on('collect', async i => {
            if(i.member.id !== interaction.user.id){
                return i.reply({content: "You're not supposed to click this!", ephemeral: true, fetchReply: true})
            }

            await i.update({content: 'Test successfully passed!', components: []})

        });
        collector.on('end', collected => console.log(`Collected ${collected.size} item(s).`))
    }
}