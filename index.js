const { channel } = require("diagnostics_channel");
const { REST, Routes } = require("discord.js");
const { Client } = require('discord.js');
const { config } = require('dotenv');

config();
const { TOKEN, CLIENT_ID } = process.env;

const client = new Client({intents : [11264]})

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name : 'create',
    description : 'creates an AI image with deepAI'
  }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong');
  }

  if(interaction.commandName === 'create') {
    interaction.reply('hi')
  }
});



client.login(TOKEN);