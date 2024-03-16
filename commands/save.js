const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	name:'save',
	data:new SlashCommandBuilder()
	    .setName('save')
	    .setDescription('You don\'t know'),
	async execute(interaction, client, files)
	{
		let target = interaction.user
		if(target.id!=files.config.bOwner)return await interaction.reply({content:"El psy kongroo!", ephemeral:true})
		await interaction.deferReply({ephemeral:true})
		console.log(files.gConfig)
		console.log(files.gConfig["353241710794375169"]["voiceOwn"])
		fs.writeFileSync('./gConfig.json', JSON.stringify(files.gConfig))
		await interaction.editReply("Save complete")
	}
}