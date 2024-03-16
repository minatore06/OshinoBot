const { ActionRowBuilder, TextInputBuilder } = require('@discordjs/builders');
const { ModalBuilder, TextInputStyle, Collection } = require('discord.js');

module.exports = {
	name:'TCedit',
    cooldown: 600,
	async execute(interaction, client, files)
	{
        if (!client.cooldowns.has(this.name)) {
            client.cooldowns.set(this.name, new Collection());
        }
        
        let voiceOwn = files.gConfig[interaction.guild.id]["voiceOwn"];
        if (!interaction.member.voice || !interaction.member.voice.channelId)
            return interaction.reply({content:'Devi essere connesso alla tua stanza temporanea', ephemeral: true})

        for(var i=0; i < voiceOwn.length; i++) {
            if(voiceOwn[i][0]===interaction.member.voice.channelId) {
                if(voiceOwn[i][1]===interaction.member.id) {
                    const modal = new ModalBuilder()
                        .setCustomId('TCedit')
                        .setTitle('Modifica la tua stanza')
                        .addComponents(
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('name')
                                    .setLabel('Cambia il nome della stanza')
                                    .setPlaceholder(interaction.user.username+"'s private")
                                    .setRequired(false)
                                    .setStyle(TextInputStyle.Short)
                            ),
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('limit')
                                    .setLabel('Cambia il limite alla stanza (0 illimitato)')
                                    .setPlaceholder('0')
                                    .setRequired(false)
                                    .setStyle(TextInputStyle.Short)
                            )
                        )
                    await interaction.showModal(modal)
                        .catch(async(err) => {
                            console.log(new Date().toISOString() + "\n" + err)
                            return await interaction.reply({content: 'C\'è stato un errore', ephemeral: true})
                        })
                    const filter = (inter) => inter.customId === 'TCedit';
                    try {
                        await interaction.awaitModalSubmit({filter, time:60000})
                            .then(async(inter) => {
                                let name = inter.fields.getTextInputValue("name")
                                let limit = inter.fields.getTextInputValue("limit")
                                let msgContent = '';

                                if (name.length > 0) {
                                    if (client.cooldowns.get(this.name).has(interaction.user.id)) {
                                        let expirationTime = client.cooldowns.get(this.name).get(interaction.user.id) + (this.cooldown * 1000);
                                        if (Date.now() < expirationTime) {
                                            let timeLeft = Math.floor(expirationTime/1000);
                                            msgContent = `Puoi cambiare il nome alla stanza solo ogni 10 minuti.\nTempo rimanente: <t:${timeLeft}:R>.`;
                                        }
                                    } else {
                                        inter.member.voice.channel.setName(name);
                                        let ts = Date.now();
                                        client.cooldowns.get(this.name).set(interaction.user.id, ts);
                                        msgContent = 'Nome alla stanza cambiato';
                                    }
                                    
                                }
                                if (limit.length > 0) {
                                    inter.member.voice.channel.setUserLimit(limit);
                                    if (msgContent.length > 0)
                                        msgContent += '\n';
                                    msgContent +='Limite alla stanza cambiato';
                                }
                                if (!msgContent.length)
                                    msgContent = 'Niente da fare';
                                inter.reply({content:msgContent, ephemeral: true})
                            })
                            .catch(async(err) => {
                                console.log(new Date().toISOString() + "\n" + err)
                                await interaction.followUp({content:'Tempo scaduto', ephemeral: true})
                            })
                        
                    } catch (error) {
                        await interaction.followUp({content:'Tempo scaduto', ephemeral: true})
                    }
                    return;
                
                }
            }
        }
        interaction.reply({content:'Non sei il proprietario di nessuna stanza', ephemeral: true})
	}
}