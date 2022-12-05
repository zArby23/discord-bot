const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription(
      "A command created for test purposes, it just replies with something..."
    ),
  async execute(interaction) {
    await interaction.reply("Surprise! I'm working");
  },
};
