const { EmbedBuilder, messageLink } = require('@discordjs/builders');
const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const rng = require('generate-password');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('generatepassword')
    .setDescription('Returns with a new random password')
    .addIntegerOption(option =>
        option
        .setName('size')
        .setDescription('The size of the password')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .setDMPermission(true),

    async execute(interaction){
        const amount = interaction.options.getInteger('size');

        var password = rng.generate({
            length: `${amount}`,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true
        });

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('regenerate')
            .setLabel('Refresh')
            .setDisabled(true)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('delete')
            .setLabel('Delete Password')
            .setDisabled(true)
            .setStyle(ButtonStyle.Danger),
        );

        const passwordEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Random Generated Password')
        .addFields(
            {name: 'Generated Password: ', value: `${password}`},
        )
        .setTimestamp()
        .setFooter({text: 'Valhalla', iconUrl: 'https://i.imgur.com/PJfayce.jpg'});
        await interaction.reply({embeds: [passwordEmbed], components: [row], ephemeral: true});

    }
}