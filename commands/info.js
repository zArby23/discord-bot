const { SlashCommandBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
            .setName('info')
            .setDescription('Gets the information about a user or the server!')
            .addSubcommand(subcommand => 
                subcommand
                    .setName('user')
                    .setDescription('Gets the information about a member.')
                    .addUserOption(option => option
                        .setName('member')
                        .setDescription('The user to be selected.')
                        )
                )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('server')
                    .setDescription('Gets the information about the server.')
                    ),

    async execute(interaction){
        if(interaction.options.getSubcommand === "user"){
            const user = interaction.options.getUser('member');

            if (user){
                await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
            } else {
                await interaction.reply(`Your username: ${interaction.user.username}\nID: ${interaction.user.id}`);
            }

        } else if (interaction.options.getSubcommand === 'server'){
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
        }
    },
};
        