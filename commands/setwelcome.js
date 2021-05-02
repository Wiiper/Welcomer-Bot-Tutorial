const db = require("quick.db");

module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send("You don't have permissions");

    let channel = message.mentions.channels.first();
    if(!channel)return message.channel.send("Please mention the channel");

    if(channel){
        return message.channel.send("Channel for welcome now is **" + channel.name + "**"),
        db.set(`welcome.${message.guild.id}`, {
            channel: channel.id
        });
    }
}

module.exports.help = {
    name: "setwelcome",
    aliases: []
}