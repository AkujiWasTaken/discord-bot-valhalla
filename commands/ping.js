const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

// module.exports is how we export data in node.js so you can require() in other files
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction){
        // if you need to access your client instance from inside a command file, we can do this by using interaction.client
        await interaction.reply(`Ping`);
    },
};