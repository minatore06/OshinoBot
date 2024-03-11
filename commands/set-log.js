const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    name:'set-log',
    data:new SlashCommandBuilder()
	    .setName('set-log')
	    .setDescription('Set the channel for logs')
        .addChannelOption(option =>
            option.setName('log-channel')
            .setDescription('The channel where the bot will send logs')
            .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client, files)
    {
        let logchan = interaction.options.getChannel('log-channel')
        if(!logchan.isTextBased())
        {
            interaction.reply({content: "Invalid channel", ephemeral:true})
            return;
        }
        await logchan.sendTyping()
        .then(() => {
            files.gConfig[interaction.guildId]["log-channel"] = logchan.id
            interaction.reply({content:`Log channel set as ${logchan}`, ephemeral:true})    
        })
        .catch((err) => {
            interaction.reply({content:`I can't write in that channel ${err}`, ephemeral:true})
        })
    }
}