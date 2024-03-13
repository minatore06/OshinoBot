const { SlashCommandBuilder } = require('@discordjs/builders');
const process = require('node:process');
const fs = require('fs');

module.exports = {
	name:'restart',
    data:new SlashCommandBuilder()
	    .setName('restart')
	    .setDescription('You don\'t know'),
	async execute(interaction, client, files)
	{
		let target = interaction.user
		if(target.id!=files.config.bOwner)return await interaction.reply({content:"El psy kongroo!", ephemeral:true})
		await interaction.reply({content:"Restarting...", ephemeral:true})
		fs.writeFileSync('./../gConfig.json', JSON.stringify(files.gConfig))
		client.destroy()
		process.on("exit", function () {
			console.log("sos")
			spawn('./../update.sh',
			{
				cwd: process.cwd(),
				detached: true,
				stdio: "inherit"
			})
		});
		console.log("Restarting");
		process.exit(0);
	}
}