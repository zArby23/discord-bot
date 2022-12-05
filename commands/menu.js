const { SelectMenuOptionBuilder } = require("@discordjs/builders");
const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Testing the select menu function!"),

  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Nothing selected yet!")
        .setOptions(
          new SelectMenuOptionBuilder({
            label: "#1",
            description: "The very first option!",
            value: "Hi! Youse lected the first option!",
          }),
          new SelectMenuOptionBuilder({
            label: "#2",
            description: "The ominous second option!",
            value: "Hi! You selected the second option!",
          })
        )
    );

    await interaction.reply({
      content: "A select menu!",
      components: [row],
    });

    await interaction.update({
      content: `You selected: ${interaction.value[0]}`,
      components: [row]
    });
  },
};
