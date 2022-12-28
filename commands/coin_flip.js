const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Returns either heads or tails')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

    async execute(interaction){

        if (interaction.commandName === 'ping')
        var HOT = ['Heads 🪙 ', 'Tails 🪙 '];
        var coinFlipRNG = HOT[Math.floor(Math.random() * HOT.length)];
        const coinflip = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('**__Heads Or Tails__**')
        .addFields(
            {name: 'Result:', value: `${coinFlipRNG}`},
        )
        .setTimestamp()
        .setFooter({text: 'Valhalla', iconUrl: 'https://i.imgur.com/PJfayce.jpg'});
        interaction.reply({embeds: [coinflip]});
    }
}