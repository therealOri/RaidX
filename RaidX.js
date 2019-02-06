const Discord = require('discord.js');
const fs = require("fs");
const prefix = /^\-/g; //- is customizable, ex: /^\$/g would make the prefix $
const auth = require('./auth.json');
const client = new Discord.Client();
const authors = [];
var tools = require("discord-anti-spam");

 
tools(client, {
  warnBuffer: 0, 
  maxBuffer: 0,
  interval: 0000
  warningMessage: "Stop spamming!", 
  banMessage: "has been banned for spamming, anyone else?",
  maxDuplicatesWarning : 0, 
  maxDuplicatesBan: 0,
  deleteMessagesAfterBanForPastDays: 0
});

console.log(' Bot Is Online')
console.log('╚[════════════]╝')
console.log('')
client.on('ready', () => {
  console.log('Logged in as: ' + client.user.username + ' - (' + client.user.id + ')');
  client.user.setPresence({ game: {name: "RaidX | -help", type: 0 } });
  client.user.setStatus("Online");
});

//login here
client.login(auth.token);



client.on("error", () => {});
client.on('message', async(message) => {
    if (prefix.test(message.content)) {
  	var parts = message.content.replace(prefix, "").split(" ");
  	switch(parts[0]) {
            case 'ping':
                message.channel.send("Pong!~");
            break;
			
			case "status":
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.send("***Online | Version 1.1.0***");
            }, 500);
            message.channel.stopTyping();
            break;

            case "invite":
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.send("https://discordapp.com/oauth2/authorize?client_id=537126219095736351&scope=bot");
            }, 500);
            message.channel.stopTyping();
            break;

            case "help":
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.send("```-invite | Gives you the bots Invite, -status | Gives you the bots status and version, -kick @user kickes said user, | -ban @user bans said user, More will be added in the future!```");
            }, 500);
            message.channel.stopTyping();
            break;

            case "kick":
                if (message.channel.type !== "text") return;
                if (message.member.hasPermission("KICK_MEMBERS") == false) return message.channel.send("You do not have permission to kick users!");
                if (message.guild.me.hasPermission("KICK_MEMBERS") == false) return message.channel.send("I don't have permission to kick users!");
                if (message.members && message.mention.members.size < 1) return message.channel.send("Please mention someone!");
                let kicked = [];
                let notKicked = [];
                for (let member of message.mentions.members.values()) {
                    try {
                        await member.kick();
                        kicked.push(member.displayName);
                    } catch (e) {
                        notKicked.push(member.displayName);
				}}
                message.channel.send(`Kicked Users: ${kicked.join(", ")}\nNot Kicked: ${notKicked.join(", ")}`);
            break;

            case "ban":
                if (message.channel.type !== "text") return;
                if (message.member.hasPermission("BAN_MEMBERS") == false) return message.channel.send("You do not have permission to ban users!");
                if (message.guild.me.hasPermission("BAN_MEMBERS") == false) return message.channel.send("I don't have permission to ban users!");
                if (message.members && message.mention.members.size < 1) return message.channel.send("Please mention someone!");
                let banned = [];
                let notBanned = [];
                for (let member of message.mentions.members.values()) {
                    try {
                        await member.ban();
                        banned.push(member.displayName);
                    } catch (e) {
                        notBanned.push(member.displayName);
				}}
				message.channel.send(`Banned Users: ${banned.join(", ")}\nNot banned: ${notBanned.join(", ")}`);
            break;
                        
                    




			
    }
}
});
