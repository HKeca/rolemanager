const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('debug', console.log);

const connections = [];

client.on('message', async (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }

  if (msg.author.id === '259446085465014282') {
    if (msg.content === 'play') {
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        connections.push(connection);

        const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=EiUjYQgsmwA', { filter: 'audioonly' }));

        dispatcher.on('finish', () => {
          dispatcher.destroy();
          msg.guild.voiceConnection.disconnect();
          connections.pop();
        });
      } else {
        msg.reply('You need to join a voice channel first!');
      }
    }

    if (msg.content === 'dc') {
      if (connections.length > 0) {
        connections[connections.length - 1].disconnect();
        connections.pop();
      }
    }
  }
});

client.login(process.env.TOKEN);