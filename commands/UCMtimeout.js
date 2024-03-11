const { ContextMenuCommandBuilder, ApplicationCommandType } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const ms = require('ms');

module.exports = {
    name:'UCMtimeout',
    data:new ContextMenuCommandBuilder()
        .setName('timeout')
        .setType(2)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client, files){
        await interaction.deferReply({ ephemeral: true });

        let embed = {
            footer: {
                text: (await client.users.fetch(files.config.bOwner)).tag,
                icon_url: (await client.users.fetch(files.config.bOwner)).displayAvatarURL({dynamic:true})
            },
            timestamp: new Date().toISOString()
        };
        let target = interaction.targetMember;
        let durata = "1";
        let unita = "m";
        let reason = "Quick moderation action";

        if(!target.moderatable)
            return await interaction.editReply("I don't have enough permissions");

        await target.disableCommunicationUntil(Date.now()+(ms(durata+unita)), reason)
        .then(await interaction.editReply("Timeout succeded"))
        .catch(async(err) => {
            console.log(err)
            await interaction.editReply(err)
            return;
        })

        embed.title = 'Moderation notify'
        embed.author = {
            name: interaction.guild.name,
            icon_url: interaction.guild.iconURL({dynamic:true})
        }
        embed.color = 0xFF8F00
        embed.description = `You got timeouted for ${durata}${unita}, this is a rapid action`
        target.send({ embeds: [embed] });

        embed.author = {
            name: interaction.user.tag,
            icon_url: interaction.user.displayAvatarURL({dynamic:true})
        }
        embed.description = `User: ${target},\ngot timeouted for \`${durata}${unita}\`,\nmoderator: ${interaction.user},\nreason: \`rapid action\``
        
        if(files.gConfig[interaction.guildId]["log-channel"]){
            await (await client.channels.fetch(files.gConfig[interaction.guildId]["log-channel"])).send({embeds:[embed]})
        }
    }
}