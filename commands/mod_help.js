const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('modhelp')
    .setDescription('Replies with a list of commands with usage for mods')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction){
        const helpEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Mod Command Help: ')
        .addFields(
            {name: 'kick:', value: '/kick {user} {reason}'},
            {name: 'ban:', value: '/ban {user} {reason}'},
        )
        .setTimestamp()
        .setFooter({text: 'Valhalla', iconUrl: 'https://i.imgur.com/PJfayce.jpg'});
        interaction.reply({embeds: [helpEmbed], ephemeral: true});
    }
}
