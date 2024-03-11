const { SlashCommandBuilder } = require('@discordjs/builders');
const process = require('node:process');
const fs = require('fs');

module.exports = {
	name:'shutdown',
    data:new SlashCommandBuilder()
	    .setName('shutdown')
	    .setDescription('You don\'t know'),
	async execute(interaction, client, files)
	{
		let target = interaction.user
		if(target.id!=files.config.bOwner)return await interaction.reply({content:"El psy kongroo!", ephemeral:true})
		await interaction.reply({content:"GN", ephemeral:true})
		fs.writeFileSync('./gConfig.json', JSON.stringify(files.gConfig))
		console.log("Shutted down")
		client.destroy()
		process.exit(0)
	}
}