const Discord = require('discord.js');
const prefix = /^\-/g; //- is customizable, ex: /^\$/g would make the prefix $
const auth = require('./auth.json');
const client = new Discord.Client();

client.on("error", () => {});
var tools = require("discord-anti-spam");

 
tools(client, {
    warnBuffer: 3, 
    maxBuffer: 5,
    interval: 1000,
    warningMessage: "Stop spamming!", 
    banMessage: "has been banned for spamming, anyone else?",
    maxDuplicatesWarning : 5, 
    maxDuplicatesBan: 8,
    deleteMessagesAfterBanForPastDays: 7
});


client.on("guildCreate", guild => {
    console.log(`Someone added RaidX to their discord!: ${guild.name}, Member count: ${guild.memberCount}!`)
});

client.on('guildDelete', guild => {
    console.log(`Someone removed RaidX from their discord!: ${guild.name}, Member count: ${guild.memberCount}!`)
});

client.on('error', console.error);

client.on('warn', console.warn);

// client.on end besides message message

client.on('uncaughtException', (err) => {
console.log("error", "Uncaught Exception", err);
});

client.on("unhandledRejection", (err) => {
console.log("Uncaught Promise Error", err);
});

client.on("error", () => {});
console.log(' Bot Is Online')
console.log('╚[════════════]╝')
console.log('')
client.on('ready', () => {
  console.log('Logged in as: ' + client.user.username + ' - (' + client.user.id + ')');
  client.user.setPresence({ game: {name: "-vote | -help | -invite", type: 0 } });
  client.user.setStatus("Online");
});


client.on('message', msg => {
    client.emit('checkMessage', msg); // This runs the filter on any message bot receives in any guilds.
});

client.on('guildMemberAdd', member => {
    function joinmessage() {
        var rand = [`Cheers, love! ${member}'s here!`, `Uh oh, ${member} just joined. *Hide*`, `${member} is here to kick butt and chew gum. And ${member} is all out of gum`, `Roses are red, violets are blue, ${member} joined this server with you`, `Ha! ${member} has joined! You activated my trap card!`, `${member} just joined. Everyone, look innocent!`, `Never gonna give ${member} up. Never gonna let ${member} down.`, `Swoooosh. ${member} just landed.`, `It's ${member}! Praise the sun! \[T]/`, `Welcome, ${member}. We hope you brought the special sauce.`, `Ready player ${member}`];
    
        return rand[Math.floor(Math.random()*rand.length)];
    }
    if (member.guild.id == "537129932761989122") {
      client.channels.get("542101137378115593").send(`${joinmessage()}`);
    };
    });
    
    client.on('guildMemberRemove', member => {
    function exitmessage() {
        var rand = [`Oh, ${member} just left!`, `Uh oh, ${member} just quit. *plays a sad song*`, `${member} left to fight crime!`, `Roses are red, violets are blue, ${member} left this server *not* you..`, `Ha! ${member} has rage quit!`, `${member} just left. Everyone, party!`, `I guess I'm gonna give ${member} up, and gonna let ${member} down.`, `Good bye, ${member}. We kept your stuff.`, `Unready player ${member}`];
    
        return rand[Math.floor(Math.random()*rand.length)];
    }
    if (member.guild.id == "537129932761989122") {
      client.channels.get("542101137378115593").send(`${exitmessage()}`);
    };
    });



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
                message.channel.send("***Online | Version 1.1.2***");
            }, 500);
            message.channel.stopTyping();
            break;

            case "invite":
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.send("https://discordapp.com/oauth2/authorize?client_id=537126219095736351&scope=bot&permissions=8");
            }, 500);
            message.channel.stopTyping();
            break;

            case "help":
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.send("```-invite | Gives you the bots Invite, -status | Gives you the bots status and version, -kick @user kickes said user, | -ban @user bans said user, | -vote will let you vote for the bot!, More will be added in the future!```");
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

            case "vote":
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.send("https://discordbots.org/bot/537126219095736351/vote");
            }, 500);
            message.channel.stopTyping();
            break;
                        
                    



			
    }
}
});

//login here
client.login(process.env.BOT_TOKEN);
