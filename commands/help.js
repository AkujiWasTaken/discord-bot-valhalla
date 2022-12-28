const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies with a list of commands with usage')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

    async execute(interaction){
        const helpEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Command Help')
        .addFields(
            {name: 'user:', value: '/user (Shows when specified user joined the server)'},
            {name: 'server:', value: '/server (Shows how many current users are in the server)'},
            {name: 'generatepassword:', value: '/generatepassword {size} (Allows a user to specify a password size and have one generated)'}
        )
        .setTimestamp()
        .setFooter({ text: 'Valhalla', iconURL: 'https://i.imgur.com/PJfayce.jpg' });
        interaction.reply({embeds: [helpEmbed], ephemeral: true });
    }
}