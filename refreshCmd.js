const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '1216444935193231512';
const guildId = '1041311173003448340';
const commandId = '';

(async () =>{
	for (const file of commandFiles) {
		let command = await require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '9' }).setToken(token);

  	try {
		console.log('Started refreshing application (/) commands.');
		
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
			);
			
			console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	} 
		
/* 	 	try {
		console.log('Started refreshing guild application (/) commands.');
		
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
			);
			
			console.log('Successfully reloaded guild application (/) commands.');
		} catch (error) {
			console.error(error);
			} */

/* 		rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
			.then(() => console.log('Successfully deleted guild command'))
			.catch(console.error);
		 */
	/* 	rest.delete(Routes.applicationCommand(clientId, commandId))
			.then(() => console.log('Successfully deleted guild command'))
			.catch(console.error);
		*/
})();