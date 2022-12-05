const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("btntest")
    .setDescription("Testing something with the buttons..."),

  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("button")
        .setLabel("Click me.")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("button2")
        .setLabel("No, click me!")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "Just click the button below.",
      components: [row],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "button") {
        if (i.member.id !== interaction.user.id) {
          return i.reply({
            content: "You're not supposed to click this!",
            ephemeral: true,
          });
        }
        await i.update({
          content: `Test successfully passed!`,
          components: [row],
        });
      }
      if (i.customId === "button2") {
        if (i.member.id !== interaction.user.id) {
          return i.reply({
            content: "You're not supposed to click this!",
            ephemeral: true,
          });
        }
        await i.update({
          content: `Test successfully passed pressing the second button!`,
          components: [row],
        });
      }
    });

    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} item(s).`)
    );
  },
};
