const { ActionRowBuilder, UserSelectMenuBuilder } = require('@discordjs/builders');

module.exports = {
	name:'TCremove',
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
                                    .setCustomId('TCremove')
                                    .setMinValues(1)
                                    .setMaxValues(1)
                            )
                    ], ephemeral: true})
                    return;
                }
            }
        }
        interaction.reply({content:'Non sei il proprietario di nessuna stanza', ephemeral: true})
	}
}