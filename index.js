const fs = require('node:fs');
const path = require('node:path');
// const Discord = require("discord.js");
const config = require("./config.json");
const {Client, Events, Collection, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages
    ]
});
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath);

    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

client.on(Events.InteractionCreate, async interaction => {
    const command = interaction.client.comands.get(interaction.commandName);

    if(!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error){
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing the command!', ephemeral: true
        });
    }
})
client.login(config.BOT_TOKEN)

