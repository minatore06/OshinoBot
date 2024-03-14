const process = require('node:process');
const { Client, GatewayIntentBits, ActivityType, ButtonStyle, ChannelType, Collection } = require('discord.js');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const ms = require('ms');
const fs = require('fs');
const config = require('./config.json');
const { token, bOwner } = require('./config.json');
const gConfig = require('./gConfig.json');

const client = new Client({ intents: [GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

let debug = false;
let files = {"config":config, "gConfig":gConfig}
var videos = ["https://www.youtube.com/watch?v=sAn7baRbhx4", "https://www.youtube.com/watch?v=VqB1uoDTdKM", "https://www.youtube.com/watch?v=olOfpzW50P8", "https://www.youtube.com/watch?v=bZe5J8SVCYQ", "https://www.youtube.com/watch?v=GjrrLtjeUVw", "https://www.youtube.com/watch?v=sfHvgPJPMXk", "https://www.youtube.com/watch?v=SmUC_kSw6eY", "https://www.youtube.com/watch?v=Jl6lee2wyPQ", "https://www.youtube.com/watch?v=nlLhw1mtCFA", "https://www.youtube.com/watch?v=ttCHb-MNIFE", "https://www.youtube.com/watch?v=dbn-QDttWqU", "https://www.youtube.com/watch?v=cn4M-fH08XY", "https://www.youtube.com/watch?v=mYb4UvVpaS8", "https://youtu.be/UIp6_0kct_U", "https://youtu.be/p88uRZ5zYMA", "https://youtu.be/JNz0ng19kuw", "https://youtu.be/VqkKokT5RpY", "https://youtu.be/K8T6Y7K-esM", "https://youtu.be/fRTzdZcooro?si=nMsZm2wQoMxCPDPF", "https://youtu.be/ZOGFfjhfwdI?si=u0xkd1m3QS3qIQhS", "https://youtu.be/n3NqprvC6jc?si=N53cViLoa_d_9ObZ", "https://youtu.be/PoCBIrsJ-to?si=BuOMoVFQ5brujr4f", "https://youtu.be/DqOtKa42iOw?si=DimTS3ojA1vLF-FX", "https://youtu.be/RVmUx9FERDE?si=r6xiQ9LIy2toy-9r"]
var music = ["https://www.youtube.com/watch?v=Q9WcG0OMElo", "https://www.youtube.com/watch?v=12vh55_1ul8", "https://www.youtube.com/watch?v=f7tMeBGxIw4", "https://www.youtube.com/watch?v=0XFudmaObLI", "https://www.youtube.com/watch?v=FtutLA63Cp8", "https://www.youtube.com/watch?v=TKfS5zVfGBc", "https://www.youtube.com/watch?v=bAn6C4p7mAE", "https://www.youtube.com/watch?v=2Od7QCsyqkE", "https://www.youtube.com/watch?v=WUjxaXg8QKE", "https://www.youtube.com/watch?v=VEe_yIbW64w", "https://www.youtube.com/watch?v=IHENIg8Se7M", "https://www.youtube.com/watch?v=UnIhRpIT7nc", "https://www.youtube.com/watch?v=tyneiz9FRMw", "https://www.youtube.com/watch?v=7UubKYqEy3s", "https://www.youtube.com/watch?v=_VH91mivTUw", "https://www.youtube.com/watch?v=sToRddIV7kU", "https://www.youtube.com/watch?v=dyKdLLQP5PI", "https://www.youtube.com/watch?v=bl7W-sU-MKI", "https://www.youtube.com/watch?v=ioQLlX2ELbg", "https://youtu.be/6d-28nn_gpA", "https://youtu.be/-kBQ6lHKTEc", "https://youtu.be/qNIhngowViI", "https://youtu.be/--41OGPMurU", "https://youtu.be/8UVNT4wvIGY", "https://youtu.be/piEyKyJ4pFg", "https://youtu.be/Jrg9KxGNeJY", "https://youtu.be/tnAoq3_6f5M", "https://youtu.be/TwIssYH2Gyw", "https://youtu.be/z6EQlZaB7v8", "https://youtu.be/35bPrTbAabo?si=IfEYB7CRoaeEZWB9", "https://youtu.be/gt-v_YCkaMY?si=I6_iOiDm_9eSw_U6", "https://youtu.be/--41OGPMurU?si=CbsDAPkTJ7qQ1hI9", "https://youtu.be/uTO0KnDsVH0?si=3chT5-LAJzfAzxce", "https://youtu.be/qNIhngowViI?si=JwiNTgsUQakQ-Byq", "https://youtu.be/NXNfMwUR-w4?si=76hblQLKcq0fl6Bb", "https://youtu.be/by4SYYWlhEs?si=u9pSbZ_fpcTddjZs", "https://youtu.be/tLsJQ5srVQA?si=LC2agF9Frv0FZ2VR", "https://youtu.be/ZRtdQ81jPUQ?si=odHwst40Gn4kehYq", "https://youtu.be/zPGf4liO-KQ?si=Wt0Lh73WGHdgZtn1", "https://youtu.be/BoJ0pfhMmfU?si=nzYh0KgYlm_MLQnp", "https://youtu.be/Gimu8J9RbDA?si=0RArPT6TJLOZcVXl", "https://youtu.be/khnNHHGR8jw?si=b6GxxnkpQKDmFJ9H", "https://youtu.be/zHuJijck8dY?si=_nRUX8hk2jXtLLE1", "https://youtu.be/HT3ksyFX9DI?si=UL7erOs245qf2--O", "https://youtu.be/Ci_zad39Uhw?si=Xo7Vh0Pni2vJc59U", "https://youtu.be/z1W4c7ym49Y?si=fS13iSSyEWv3p9ql", "https://youtu.be/z3OKd5b2Rlw?si=_SI_qLpf1QLrG5Gq", "https://youtu.be/ECkxzFgbJqQ?si=ud8ToxDtp3bhP_l6", "https://youtu.be/pgXpM4l_MwI?si=wh8qmTZn53YNJwuH", "https://youtu.be/YFnkzhUyz18?si=Fe8b16vI0DOt0gba", "https://youtu.be/UO5yWuH7aUA?si=LQhjiy1DoctHQwQc", "https://youtu.be/qal34e9v_pk?si=ticpnxJejR8M_LHE", "https://youtu.be/UHoOkZ7zWu4?si=giMjguBB7F0VUnhY", "https://youtu.be/DkROVPRcceM?si=brzxudskr-RXp6bC", "https://youtu.be/eSW2LVbPThw?si=qVrhLgYmcdsfD9VC", "https://youtu.be/IDQYlsDqpAU?si=FdnQ7US6IrOrcoOf"]
var bumpMsg = null
var stanzaTemp = '1216417228031787108';
var categoriaTemp = '1216417153230569565';
var modules = ["tempChannels"];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

function wait(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function eliminazioneMess(message, msg, wait)//funzione per eliminare il messaggio di risposta
{
  setTimeout(function () {
    if (msg) {
        msg.delete()
        .catch(err => {
            console.log(new Date().toISOString() + "\n" + err)
        });
    }
    if (message) {
        message.delete()
        .catch(err => {
            console.log(new Date().toISOString() + "\n" + err)
        });
    }
  }, ms(wait))
  return;
}


function activityLoop(){
    setTimeout(() => {
        client.user.setActivity("There's no /help",{type: ActivityType.Listening})
        client.user.setStatus("online")

        setTimeout(() => {
          client.user.setActivity("un anime con oshinomina", { type: ActivityType.Watching})

            setTimeout(() => {
                client.user.setActivity("with Mina#3690",{type: ActivityType.Playing})
                client.user.setStatus("dnd")

                setTimeout(() => {
                    let ar = videos.concat(music)
                    let rId = Math.floor(Math.random()*ar.length)
                    client.user.setActivity("yooooooo, watch this",{type: ActivityType.Streaming, url:ar[rId]})

                    activityLoop();
                }, 30000);
            }, 60000);
        }, 30000);
    }, 60000);
}

client.on('ready', async () => {
    client.user.setActivity("Starting...",{type: ActivityType.Competing})
    client.user.setStatus("idle")
    client.guilds.fetch().then(async gm => {
        gm.forEach(async guild => {
            if(!gConfig[guild.id])gConfig[guild.id] = {}
            if(!gConfig[guild.id]["modules"])gConfig[guild.id]["modules"] = {}
            modules.forEach(module => {
                console.log(module)
                gConfig[guild.id]["modules"][module] = false
            })
            if(!gConfig[guild.id]["voiceOwn"])gConfig[guild.id]["voiceOwn"] = []
            else {
                for(var i=0; i<gConfig[guild.id]["voiceOwn"].length; i++) {
                    console.log(gConfig[guild.id]["voiceOwn"][i])
                    let vState = (await client.users.fetch(gConfig[guild.id]["voiceOwn"][i][1])).voice
                    let ch = await client.channels.fetch(gConfig[guild.id]["voiceOwn"][i][0])
                    if (ch.members.size==0){
                        setTimeout(function(){
                            if(!ch)return;
                            for (let i = 0; i < gConfig[guild.id]["voiceOwn"].length; i++){
                                if(ch.id == gConfig[guild.id]["voiceOwn"][i][0]){
                                    try {
                                        if(ch.client.user.id == client.user.id)ch.delete("Stanza vuota");
                                    } catch (err) {
                                        console.log(new Date().toISOString() + "\n" + err)
                                    }
                                    if(gConfig[guild.id]["voiceOwn"][i]&&gConfig[guild.id]["voiceOwn"][i][2])clearTimeout(gConfig[guild.id]["voiceOwn"][i][2]);
                                    gConfig[guild.id]["voiceOwn"].splice(i,1);
                                }
                            }
                        }, 5000)
                    } else if (!vState || vState.channelId != gConfig[guild.id]["voiceOwn"][i][0]){
                        gConfig[guild.id]["voiceOwn"][i][2] = setTimeout( function(){
                            if(!ch)return;
                            try {
                                if(ch.client.user.id == client.user.id)ch.delete('Proprietario assente');
                            } catch (err) {
                                console.log(new Date().toISOString() + "\n" + err)
                            }
                            gConfig[guild.id]["voiceOwn"].splice(i,1);
                        }, 300000)
                    } 
                }
            }
        })
    })
    fs.writeFileSync('./gConfig.json', JSON.stringify(gConfig))
    console.log('Online')
    activityLoop();
})

client.on('guildCreate', async guild => {
    if(!gConfig[guild.id])gConfig[guild.id] = {}
    if(!gConfig[guild.id]["log-channel"])gConfig[guild.id]["log-channel"] = ""
    if(!gConfig[guild.id]["modules"])gConfig[guild.id]["modules"] = {}
    modules.forEach(module => {
        gConfig[guild.id]["modules"][module] = false
    })
    if(!gConfig[guild.id]["voiceOwn"])gConfig[guild.id]["voiceOwn"] = []
    fs.writeFileSync('./gConfig.json', JSON.stringify(gConfig))
})

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    let user = message.author
    let member = message.member
    let guild = message.guild
    let channel = message.channel
/* 
    if (guild.id == "1041311173003448340"){
        if (message.content.toLowerCase().includes("cute")){
            message.reply("Yeah, you won an hug!");
            message.reply("https://tenor.com/view/hug-gif-25588769");
        }
    } */
    switch (message.content.toLowerCase()) {
        case "!debug":
            if (user.id == bOwner){
                if (!debug)
                {
                    debug = true;
                    message.reply("El psy congroo[!](https://cdn.donmai.us/original/bf/a5/bfa59a99a9a17fc753973071ef4694a4.gif)")
                        .then(msg => eliminazioneMess(message, msg, "10s"));
                }
                else
                {
                    debug = false;
                    message.reply("I'm back[!](https://media.tenor.com/UHibsWWoOpQAAAAd/monogatari-oshino.gif)")
                        .then(msg => eliminazioneMess(message, msg, "10s"));
                }
            } else {
                if (debug){
                    message.reply("Un umano come te non dovrebbe disturbarmi durante la mia pausa[.](https://i.pinimg.com/originals/92/f1/72/92f1724b4a5dfe1b705bf4bac60a50c6.gif)")
                        .then(msg => eliminazioneMess(message, msg, "10s"));
                } else {
                    message.reply("You're not my master and you don't know this command[.](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/628788cd-1b38-46ed-86e3-4af1ab94cf97/d6sysx0-f298bccb-2217-43eb-82d9-90ed972498fa.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyODc4OGNkLTFiMzgtNDZlZC04NmUzLTRhZjFhYjk0Y2Y5N1wvZDZzeXN4MC1mMjk4YmNjYi0yMjE3LTQzZWItODJkOS05MGVkOTcyNDk4ZmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.q5YHDMz-daqna4LMoJ3N9UWfULm0H_n-P0qVy9HyNwc)")
                        .then(msg => eliminazioneMess(message, msg, "10s"));
                }
            }
            break;
        case "!send":
            if (debug){
                message.reply("Ciao, al momento sono stata messa in modalità debug, per cui ti ignorerò. Ka ka!")
                    .then(msg => eliminazioneMess(message, msg, "5s"));
                return console.log("Modalità debug attiva, interazione ignorata");
            }
            if (user.id !== bOwner) {
                message.reply("You're not my master and you don't know this command")
                    .then(msg => eliminazioneMess(message, msg, "5s"));
            }
            try {
                let row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('tc:edit')
                            .setLabel("Modifica")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('tc:unlock')
                            .setLabel("Sblocca")
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('tc:lock')
                            .setLabel("Blocca")
                            .setStyle(ButtonStyle.Danger)
                    )
                let row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('tc:allow')
                            .setLabel("Permetti membro")
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('tc:deny')
                            .setLabel("Nega membro")
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('tc:remove')
                            .setLabel("Rimuovi membro")
                            .setStyle(ButtonStyle.Danger)
                    )
                
                await message.channel.send({
                    embeds: [
                        {
                            "title": "Free Clubs control pannel",
                            "description": "<:11:553206458838286336> Ciao,\n<:Astolfo:1217625591612837939> Hai mai voluto personalizzare la tua stanza temporanea?\n<a:hiroi_laugh:1217612251687686255> Oppure permetterne l'accesso solamente ad alcuni amici?\n<a:Chikapanic:1217618364659269697> Oppure c'è un utente col quale non vuoi stare?\n<a:Fingerspin_Rikka:1217622231564292177> Bene, perchè con questo nuovissimo pannello di controllo,\n<a:Herta_Kurukuru:1217575441204772864> potrai fare tutte queste cose utilissime!\n\n<a:Konosuba_1:1217582700165206096> (in caso di problemi o idee, contattare oshinomina)<a:Konosuba_2:1217587200435425372>",
                            "url": "https://youtu.be/D39fKQIJSBY?si=1ctTuoNtPYjclYUm",
                            "color": 16077059,
                            "footer": {
                              "text": "AMMINISTRAZIONE DI ANIMEITALIA",
                              "icon_url": "https://media.discordapp.net/attachments/1216360069973807105/1217575491276640386/Progetto_senza_titolo_5.png?ex=6604868a&is=65f2118a&hm=963dc2ef52b66365a39c9cb4dc6392a94b59b8636b3473676c640a07c01db566&=&format=webp&quality=lossless&width=462&height=462"
                            },
                            "image": {
                              "url": "https://media.discordapp.net/attachments/1216360069973807105/1217574265239506994/RUOLI_6.png?ex=66048566&is=65f21066&hm=239e79f8ebb858885c58abecd00784d6a3d65c090e7b0a4f831a80d313a6efd7&=&format=webp&quality=lossless&width=924&height=462"
                            }
                          }
                    ], 
                    components:[row, row2]
                })
                message.delete()
                .catch(err => {
                    console.log(new Date().toISOString() + "\n" + err)
                })
            } catch (error) {
                console.log(new Date().toISOString() + "\n" + error)
            }
            break;
    }
})

client.on('messageDelete', async message => {
    if (message.author.bot) return;

    if (!message.inGuild()) return;
    console.log(message.mentions.members.size)
    if (message.createdTimestamp < (Date.now() - ms("5m"))) return;// message older than 5 minutes
    if (!message.mentions.members.size) return; // no mentions
    let member = message.member;
    let embed = {
        author: {
            name: member.displayName,
            icon_url: member.displayAvatarURL({dynamic:true})
        },
        title: `<a:GanyuPing_REEEEE:1217571370016178266>ghost ping rilevato<:Colpevole:602821598550032413>`,
        description: message.content,
        color: 0x3d3a3d,
        footer: {
            text: member.id,
            icon_url: member.user.displayAvatarURL({dynamic:true})
        },
        timestamp: new Date().toISOString()
    };
    message.channel.send({embeds: [embed]});
})
                
client.on('interactionCreate', async interaction => {
    let commandName = interaction.commandName;
    let target;
    let channel;
    let embed = {
        footer: {
            text: (await client.users.fetch(bOwner)).tag,
            icon_url: (await client.users.fetch(bOwner)).displayAvatarURL({dynamic:true})
        },
        timestamp: new Date().toISOString()
    };

    if (debug) {
        await wait(500);
        if (interaction.isRepliable() && !(await interaction.fetchReply())) {
            interaction.reply("Ciao, al momento sono stata messa in modalità debug, per cui ti ignorerò. Ka ka!")
                .then(msg => eliminazioneMess(null, msg, "5s"));
        }
        return console.log(new Date().toISOString() + "\n" + "Modalità debug attiva, interazione ignorata");
    }
    
    if(interaction.isAutocomplete()){
        let focused = interaction.options.getFocused(true)
    }

    else if (interaction.isButton()){
        let intIDs = interaction.customId.split(':');
        if (intIDs[0] == "tc"){
            commandName = intIDs[0].toUpperCase() + intIDs[1];

            if (client.commands.has(commandName)){
                const command = client.commands.get(commandName);

                command.execute(interaction, client, files)
            }
        }
        return;
    }

    else if (interaction.isAnySelectMenu()){
        let intIDs = interaction.customId.split(':');
        if (intIDs[0] == "TCallow"){
            interaction.users.forEach(async value => {
                interaction.member.voice.channel.permissionOverwrites.create(value.id, {
                    Connect: true
                })
                .catch(err =>{
                    return interaction.reply({content:"C'è stato un errore\n```"+err+"```", ephemeral: true})
                })
            })
            return interaction.reply({content:`Operazione completata`, ephemeral: true})
        } else if (intIDs[0] == "TCdeny"){
            interaction.users.forEach(async value => {
                interaction.member.voice.channel.permissionOverwrites.create(value.id, {
                    Connect: false
                })
                .catch(err =>{
                    return interaction.reply({content:"C'è stato un errore\n```"+err+"```", ephemeral: true})
                })
            })
            return interaction.reply({content:`Operazione completata`, ephemeral: true})
        } else if (intIDs[0] == "TCremove"){
            let membro = interaction.members.first()
            if(!membro.voice) return interaction.reply({content:`${membro} non è in nessuna vocale`, ephemeral: true});
            if(membro.voice.channelId!=interaction.member.voice.channelId) return interaction.reply({content:`${membro} non è nella tua stessa vocale`, ephemeral: true})
            
            membro.voice.setChannel(null)
            .catch(err =>{
                return interaction.reply({content:"C'è stato un errore\n```"+err+"```", ephemeral: true})
            })
            return interaction.reply({content:`Operazione completata`, ephemeral: true})
        }
        return;
    }

    else if (interaction.isChatInputCommand()){
        if (client.commands.has(commandName)){
            const command = client.commands.get(commandName);
        
            command.execute(interaction, client, files)
        }
        return;
    }

    else if(interaction.isUserContextMenuCommand())
    {
        commandName = "UCM"+commandName;
        if (client.commands.has(commandName)){
            const command = client.commands.get(commandName);
        
            command.execute(interaction, client, files)
        }
        return;
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    if(debug)
        return console.log(new Date().toISOString() + "\n" + "Modalità debug attiva, evento ignorato");
    if(oldState){//uscito dalla stanza
        var oldChannel = oldState.channel
        var OldMember = oldState.member
        let voiceOwn = gConfig[oldState.guild.id]["voiceOwn"]
        
        if(oldState.channel!=newState.channel){
            if(oldChannel && oldChannel.parentId == categoriaTemp && oldChannel.id != stanzaTemp) {
                if(oldChannel.members.size===0){
                    setTimeout(function(){
                        if(!oldState.channel)return;
                        for (let i = 0; i < voiceOwn.length; i++){
                            if(oldState.channel.id == voiceOwn[i][0]){
                                try {
                                    if(oldState.channel.client.user.id == client.user.id)oldState.channel.delete("Stanza vuota");
                                } catch (err) {
                                    console.log(new Date().toISOString() + "\n" + err)
                                }
                                if(voiceOwn[i]&&voiceOwn[i][2])clearTimeout(voiceOwn[i][2]);
                                voiceOwn.splice(i,1);
                            }
                        }
                    }, 5000)
                }
            }
            
            if(oldState.channel){
                for(var i=0; i<voiceOwn.length; i++) {
                    if(voiceOwn[i][1] === oldState.member.id && voiceOwn[i][0] === oldState.channel.id) {
                        voiceOwn[i][2] = setTimeout( function(){
                            if(!oldState.channel)return;
                            try {
                                if(oldState.channel.client.user.id == client.user.id)oldState.channel.delete('Proprietario assente');
                            } catch (err) {
                                console.log(new Date().toISOString() + "\n" + err)
                            }
                            voiceOwn.splice(i,1);
                        }, 300000)
                    }
                }
            }
        }
    } 
    if(newState){//entrato in stanza
        var newChannel = newState.channel
        var newMember = newState.member
        let voiceOwn = gConfig[newState.guild.id]["voiceOwn"]
        
        if(newState.channel){
            if(oldState.channelId!=newState.channelId && newState.channelId == stanzaTemp) {
                try {
                    newState.guild.channels.create({
                        name: newMember.user.username+"'s private",
                        type: ChannelType.GuildVoice,
                        parent: categoriaTemp
                    }).then(channel => {
                        voiceOwn[voiceOwn.length] = [channel.id, newMember.id];
                        
                        /*setTimeout(function(){
                        channel.setParent(categoriaTemp, { lockPermissions: false })
                        }, 1000)
                        
                        channel.overwritePermissions(newMember.id, {
                        Connect: true
                        })
                        setTimeout(function(){
                        channel.overwritePermissions(client.guilds.get(serverId).defaultRole.id, {
                        Connect: false
                        })
                        }, 1000)
                        */
                        setTimeout(function(){
                            newState.setChannel(channel)
                            channel.permissionOverwrites.create(newState.member.id, {
                                Connect: true,
                                Speak: true,
                                MuteMembers: true,
                                DeafenMembers: true,
                                ViewChannel: true
                            })
                        }, 1000)
                    }).catch(console.error)
                } catch (error) {
                    console.log(new Date().toISOString() + "\n" + error)
                }
            
            }else{
                for(var i = 0; i<voiceOwn.length; i++) {
                    if(voiceOwn[i][0] === newState.channel.id && voiceOwn[i][1] === newState.member.id)
                        clearTimeout(voiceOwn[i][2]);
                }
            }
        }
    }
})

client.login(token)

client.on('error', async err => {
    fs.writeFileSync('./err.log',  new Date().toISOString() + "\n" + err.message)
    try {
        await (await client.users.fetch(bOwner)).send("Errore imprevisto\n" + err.message)
        if (client && err.discordAPIError) client.user.lastMessage.channel.send(err.discordAPIRError.method)
    } catch (error) {
        console.error(new Date().toISOString() + "\n" + error)
    }
})

process.on('uncaughtException', async (err, origin) => {
    fs.writeFileSync('./err.log', new Date().toISOString() + "\n" + err)
    try {
        await (await client.users.fetch(bOwner)).send("Errore imprevisto\n" + err)
    } catch (error) {
        console.error(new Date().toISOString() + "\n" + error)
    }
/*     client.destroy()
    process.exit(0) */
});

process.on('exit', async (code) => {
    fs.writeFileSync('./gConfig.json', JSON.stringify(gConfig))
    try {
        (await client.users.fetch(bOwner)).send("Bot offline\n" + code)
    } catch (error) {
        console.log(new Date().toISOString() + "\n" + error)
    }
});