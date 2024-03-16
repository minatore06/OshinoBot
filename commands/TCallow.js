const { ActionRowBuilder, UserSelectMenuBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
	name:'TCallow',
	async execute(interaction, client, files)
	{
        let voiceOwn = files.gConfig[interaction.guild.id]["voiceOwn"];
        if (!interaction.member.voice || !interaction.member.voice.channelId)
            return interaction.reply({content:'Devi essere connesso alla tua stanza temporanea', ephemeral: true})
        
        for(var i=0; i < voiceOwn.length; i++) {
            if(voiceOwn[i][0]===interaction.member.voice.channelId) {
                if(voiceOwn[i][1]===interaction.member.id) {
                    interaction.reply({content:'Seleziona un utente', components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new UserSelectMenuBuilder()
                                    .setCustomId('TCallow')
                                    .setMinValues(1)
                                    .setMaxValues(10)
                            )
                    ], ephemeral: true})
                    .then(msg => {
                        setTimeout(function () {
                            msg.delete()
                            .catch(err => {
                                console.log(new Date().toISOString() + "\n" + err)
                            });
                        }, ms('30s'));
                    });
                    return;
                }
            }
        }
        interaction.reply({content:'Non sei il proprietario di nessuna stanza', ephemeral: true})
	}
}