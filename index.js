const config = require('./config.json');
const { Client, Collection, Events, EmbedBuilder, GatewayIntentBits, AttachmentBuilder } = require("discord.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

const channelIdToMonitor = ''; // Replace with the ID of the channel you want to monitor

client.on('messageCreate', async message => {
    if (!message.guild) return; // Ignore messages from DMs
    if (message.author.bot) return; // Ignore messages from bots

    // Check if the message was sent in the specified channel
    if (message.channelId === channelIdToMonitor) {
        // Kick the user who sent the message
        try {
            await message.member.kick();
            message.channel.send(`User ${message.author.tag} has been kicked for sending a message in the specified channel.`);
        } catch (error) {
            console.error('Error kicking user:', error);
        }
    }
});

// Login to Discord with the bot's token
client.login(config.token);
