const Discord = require("discord.js");
const token = "YOUR BOT TOKEN HERE";
require("dotenv");
const db = require("quick.db");
const client = new Discord.Client();
client.on('ready', () => console.log("Client is ready!"))
const fs = require("fs");
console.clear()


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


/*

``
||
[]

*/

client.on('message', async (message) => {
    if(message.author.bot)return;
    if(message.channel.type === "dm")return;


    let prefix = "!"
    let args = message.content.slice(prefix.length).trim().split(' ');

    let cmd = args.shift().toLowerCase();
    let command;
    if(!message.content.startsWith(prefix))return;

    if(client.commands.has(cmd)){
        command = client.commands.get(cmd);
    }else {
        command = client.commands.get(client.aliases.get(cmd));
    }
    if(command) command.run(client, message, args);
})

fs.readdir("./commands", (err, files) => {
    if(err)return console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if(jsfiles.length === 0)return;

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        })
    })
});


client.on('guildMemberAdd', async member => {
    let data = db.get(`welcome.${member.guild.id}`);
    let channel = client.channels.cache.get(data.channel);
    let embed = new Discord.MessageEmbed()
    .setDescription(`Member **${member.user.tag}** has been joined!`)

    channel.send(
        embed
    )
});



client.login(token)