const { MessageEmbed } = require('discord.js');
const somethingRandom = require('some-random-cat').Random 
const talkedRecently = new Set();
const subreddits = [
    "duck",

]
module.exports = {
	name : "duck",
	description : "Schows a duck",
	aliases : ["duck"],
	ussage : null,
	hidden : false,
	admin : false,
    premiumonly : false,
	nsfw : false,

	async execute(client,message,args){
        if (talkedRecently.has(message.author.id)) {
    } else {

        let randomSubReddit = subreddits[Math.floor(Math.random() * subreddits.length)] 
        somethingRandom.getMeme(randomSubReddit).then(res => {
            const embed = new MessageEmbed()
            .setTitle(res.title)
            .setURL(`https://www.reddit.com/r/${randomSubReddit}`)
            .setImage(res.img)
            .setFooter(`👍 ${res.upvotes} | 💬 ${res.comments}`)
            .setAuthor(`From ${res.author}`)
            .setColor('#37393f')
            message.channel.send(embed)
        })
        

      
        talkedRecently.add(message.author.id);
        setTimeout(() => {
       
          talkedRecently.delete(message.author.id);
        }, 60000);
    }

    } 


}