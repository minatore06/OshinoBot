const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const ms = require('ms');

module.exports = {
    name:'time-out',
    data:new SlashCommandBuilder()
	    .setName('time-out')
	    .setDescription('Put in timeout your friends')
        .addUserOption(option =>
            option.setName('target')
                .setDescription("The user to timeout")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("time")
                .setDescription("The length of the timeout (default 1m)"))
        .addStringOption(option =>
            option.setName("unit")
                .setDescription("The duration's unit (default minutes)")
                .addChoices(
                    { name:'seconds', value:'s'},
                    { name:'minutes', value:'m'},
                    { name:'hours', value:'h'},
                    { name:'days', value:'d'}
                ))
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("Punishment reason"))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client, files)
    {
        await interaction.deferReply({ ephemeral: true });

        let embed = {
            footer: {
                text: (await client.users.fetch(files.config.bOwner)).tag,
                icon_url: (await client.users.fetch(files.config.bOwner)).displayAvatarURL({dynamic:true})
            },
            timestamp: new Date().toISOString()
        };
        let target = interaction.options.getMember('target');
        let durata = interaction.options.getInteger('time');
        durata = durata?durata:1;
        let unita = interaction.options.getString('unit');
        unita = unita?unita:'m';
        let reason = interaction.options.getString('reason');
        reason = reason?reason:'';

        if(!target.moderatable)
            return await interaction.editReply("I don't have enough permissions");

        await target.disableCommunicationUntil(Date.now()+(ms(durata+unita)), reason)
        .then(await interaction.editReply("Timeout succeded"))
        .catch(async(err) => {
            console.log(new Date().toISOString() + "\n" + err)
            await interaction.editReply(err)
            return;
        })

        embed.title = 'Moderation notify'
        embed.author = {
            name: interaction.guild.name,
            icon_url: interaction.guild.iconURL({dynamic:true})
        }
        embed.color = 0xFF8F00
        embed.description = `You got timeouted ${durata}${unita}, reason: \`${reason}\``
        target.send({ embeds: [embed] });

        embed.author = {
            name: interaction.user.tag,
            icon_url: interaction.user.displayAvatarURL({dynamic:true})
        }
        embed.description = `User: ${target},\ngot timeouted for \`${durata}${unita}\`,\nmoderator: ${interaction.user},\nreason: \`${reason}\``
        
        if(files.gConfig[interaction.guildId]["log-channel"]){
            await (await client.channels.fetch(files.gConfig[interaction.guildId]["log-channel"])).send({embeds:[embed]})
        }
    }
}