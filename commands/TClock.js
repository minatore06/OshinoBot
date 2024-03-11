module.exports = {
	name:'TClock',
	async execute(interaction, client, files)
	{
        var voiceOwn = interaction.voiceOwn;
        if (!interaction.member.voice || !interaction.member.voice.channelId)
            return interaction.reply({content:'Devi essere connesso alla tua stanza temporanea', ephemeral: true})

		for(var i=0; i < voiceOwn.length; i++) {
            if(voiceOwn[i][0]===interaction.member.voice.channelId) {
                if(voiceOwn[i][1]===interaction.member.id) {
                    interaction.member.voice.channel.permissionOverwrites.create(interaction.guild.id, {
                        Connect: false
                    })
                    .catch(err =>{
                        return interaction.reply({content:"C'è stato un errore\n```"+err+"```", ephemeral: true})
                    })

                    interaction.reply({content:'Stanza chiusa al pubblico', ephemeral: true})
                    return;
                }
            }
        }
        interaction.reply({content:'Non sei il proprietario di nessuna stanza', ephemeral: true})
	}
}