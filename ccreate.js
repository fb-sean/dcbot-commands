const Discord = require('discord.js');
const fs = require("fs");
const talkedRecently = new Set();


module.exports = {
	name : "ccreate",
	description : "create a text channel",
	aliases : ["ccreate"],
	ussage : "[command] [channelname]",
	hidden : false,
	admin : false,
	premiumonly : false,
	nsfw : false,

	async execute(client,message) {
	    if (talkedRecently.has(message.author.id)) {
    } else {

          
		if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have the correct permission`)
		let ccreatedchannel = new Discord.MessageEmbed()
		ccreatedchannel.setDescription(`Enter a name for the text channel`)

		let args = message.content.slice(1).split(` `)
		if(!args[1]) return message.channel.send(UserInfoEmbed);
		let ccreatedchannel2 = new Discord.MessageEmbed()
		ccreatedchannel2.setDescription(`The text channel **${args.slice(1).join(" ")}** has been created`)
		const Logembed = new Discord.MessageEmbed()
		.setDescription(`Created Channel for **${message.author.username}** Channel Name: **${args.slice(1).join(" ")}**`)
		const channellog = client.channels.cache.get('LOGCHANNELID');
		channellog.send(Logembed)
		message.guild.channels.create(args.slice(1).join(" "), {type: `text`}), message.channel.send(ccreatedchannel2);


        talkedRecently.add(message.author.id);
        setTimeout(() => {
  
          talkedRecently.delete(message.author.id);
        }, 60000);
    }

	}
}