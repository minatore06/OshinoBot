const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name:'fluff',
    data:new SlashCommandBuilder()
	    .setName('fluff')
	    .setDescription('You know'),
	async execute(interaction, client, files)
	{
		await interaction.reply("https://i.pinimg.com/originals/12/05/55/120555652bb1882e787375762b1bc012.gif");
	}
}