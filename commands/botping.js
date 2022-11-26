const { SlashCommandBuilder } = require("discord.js");
//const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data:   new SlashCommandBuilder()
            .setName('botping') // The name can't have an upper case (A-Z) nor symbols.
            .setDescription('How long takes the bot to respond? You can look up that with this command!'),
    async execute(interaction){
        const sent = await interaction.deferReply({fetchReply: true});
        //await wait(1000);
        await interaction.editReply(`Done! I got a ping of ${sent.createdTimestamp - interaction.createdTimestamp}ms`)
    },
};
