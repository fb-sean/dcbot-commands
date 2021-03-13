const { MessageEmbed } = require("discord.js")
const talkedRecently = new Set();


module.exports = {
    name : "announce",
	description : "send a announce in a channel",
	aliases : ["announce"],
	ussage : "[command] [channel] [announce]",
	hidden : false,
	admin :  false,
    premiumonly : false,
    nsfw : false,

    async execute(message, args) {
        if (talkedRecently.has(message.author.id)) {
    } else {

        const channel = message.mentions.channels.first()
        if (!channel) {
            message.reply("Specify the channel to send this announcement")
            return
        } else {
            let annuncment = args.slice(1).join(" ")
            if(!annuncment) return message.channel.send(`You did not specify what you want to announce`)
            const Embed = new MessageEmbed()
            .setTitle(`New Announcment!`)
            .setDescription(`${annuncment}`)
            .setFooter(`Sent by: ${message.author.tag}`)
            .setColor("#37393f")
            channel.send(`@everyone`).then(m => m.delete())
            channel.send(Embed)
        }


        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 60000);
    }
    }
}