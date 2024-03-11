const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name:'ping',
    data:new SlashCommandBuilder()
	    .setName('ping')
	    .setDescription('Pong!'),
	async execute(interaction, client, files)
	{
		let sent = await interaction.reply({content:`Pong!`, ephemeral: true});
		interaction.editReply(`Heartbeat: ${client.ws.ping}ms, Lantency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	}
}