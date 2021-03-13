const Discord = require("discord.js")
const talkedRecently = new Set();
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags')

const DEVICES = {
    web: "🌐",
    desktop: "💻",
    mobile: "📱"
};

const BADGES = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
    NITRO: 'Nitro',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

const STATUSES = {
    "online": " 🟢",
    "idle": " 🟠",
    "dnd": " ⛔️",
    "streaming": " 📹",
    "offline": " 🔴"
}

module.exports = {
	name : "userinfo",
	description : "Shows the Info About the Channel",
	aliases : ["whois", "userinfo", "about"],
	ussage : "[command] [user]",
	hidden : false,
	admin : false,
    premiumonly : false,
	nsfw : false,


  async execute(client, message, args) {
    if (talkedRecently.has(message.author.id)) {
       
} else {
    const mem = args.join(' ');
    
    (async () => {
      let infoMem;
      const server = message.guild;

      if (!mem) {
        infoMem = message.member;
      } else {
        infoMem = message.mentions.members.first() || server.members.cache.find(m => m.id === `${mem}`) || server.members.cache.find(m => m.displayName.toUpperCase() === `${mem.toUpperCase()}`) || server.members.cache.find(m => m.user.username.toUpperCase() === `${mem.toUpperCase()}`) || server.members.cache.find(m => m.user.username.toLowerCase()
          .includes(`${mem.toLowerCase()}`));
      }
      if (!infoMem) {
        return message.channel.send('Error! Unable to find specified user. Please try again.');
      }

        const trimArray = (arr, maxLen = 10) => {
            if (arr.length > maxLen) {
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(` and ${len} more roles...`);
            }
            return arr;
        }

        const upperCase = str => {
            return str.toUpperCase().replace(/_/g, " ").split(" ")
                      .join(" ")
        }

        const titleCase = str => {
            return str.toLowerCase().split(" ")
                      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                      .join(" ")
        }

        const roles = infoMem.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        let userFlags;
        if (infoMem.user.flags === null) {
            userFlags = ''
        } else {
            userFlags = infoMem.user.flags.toArray();
        }
        if(infoMem.presence.status == "offline") { userDevice = "" } else if (!infoMem.bot) { userDevice = DEVICES[Object.keys(infoMem.presence.clientStatus)[0]] } else if (infoMem.bot) { userDevice = "" }
        if(!infoMem.bot) { userInfo = "No" } else if (infoMem.bot) { userInfo = "Yes" }
        if(infoMem.presence.status == "dnd") { status = "DND"} else status = titleCase(infoMem.presence.status)

        const embed = new MessageEmbed({ client: client })
            .setAuthor(infoMem.displayName, infoMem.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(infoMem.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: "User Badges", value: `${userFlags.length ? userFlags.map(flag => BADGES[flag]).join("") : "None"}`, inline:false },
                { name: "Joined Discord", value: `${moment(infoMem.user.createdAt).format("DD MMM YYYY")}`, inline:true },
                { name: "Joined Server", value: `${moment(infoMem.joinedAt).format("DD MMM YYYY")}`, inline: true },
                { name: "Nickname", value: `${infoMem.displayName}` || "None", inline: true },
                { name: "Discriminator", value: `${infoMem.user.discriminator}`, inline: true },
                { name: "Bot", value: `${userInfo}`, inline:true },
                { name: "Status", value: `${STATUSES[infoMem.user.presence.status]}`, inline:true },
                { name: "User Coloor", value: `${upperCase(infoMem.displayHexColor)}`, inline: true },
                { name: "User ID", value: `${infoMem.user.id}`, inline:true },
                { name: "Highest Role", value: `${infoMem.roles.highest.id === message.guild.id ? "None" : infoMem.roles.highest}`, inline:true },
                { name: "Roles", value: `${roles.length < 10 ? roles.join(", ") : roles.length > 10 ? trimArray(roles).join(", ") : "None"}`, inline:false }
            )
            .setColor("#37393f")
             message.channel.send(embed);
		})()


    talkedRecently.add(message.author.id);
    setTimeout(() => {

      talkedRecently.delete(message.author.id);
    }, 60000);
}
   
}
}