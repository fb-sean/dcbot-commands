const Discord = require('discord.js');
const fs = require("fs");
const botconfig = require("./../botconfig.json");
const talkedRecently = new Set();


module.exports = {
	name : "unlock",
	description : "unlock the channel",
	aliases : ["unlock"],
	ussage : "[command]",
	hidden : false,
	admin : false,
    premiumonly : false,
	nsfw : false,

	async execute(client,message,args) {
        if (talkedRecently.has(message.author.id)) {

    } else {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            const no = new Discord.MessageEmbed()
            .setDescription(`${message.author.tag} You dont have any permissions to execute this command!`)
            message.channel.send(no)
        } else {

            if(!message.guild.me.hasPermission('MANAGE_ROLES')) {
                const no2 = new Discord.MessageEmbed()
                .setDescription(`I can not unlock a channel without the \`Manage Roles\` permission!`)
                message.channel.send(no2)

            } else {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
            const done = new Discord.MessageEmbed()
            .setDescription(`Unlocked this channel successfully.`)
            .setFooter(`Requested by: ${message.author.username}`)
            const Logembed = new Discord.MessageEmbed()
            .setDescription(`Unlocked Channel for **${message.author.username}** Channel Name: **${message.channel.name}**`)
            const channellog = client.channels.cache.get('LOGCHANNELID');
            channellog.send(Logembed)
            message.channel.send(done)
        }
    }

 
        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 60000);
    }


    }
}