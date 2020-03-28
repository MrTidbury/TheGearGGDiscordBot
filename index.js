const Discord = require('discord.js');
const Config = require('./config.json')
const Util = require('./util.js')
const MessageUtil = require('./message-util.js')
const ServerUtil = require('./server-util.js')

const client = new Discord.Client();

// Anything that happens before this fires will not be logged into the discord servers
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// This is fired whenever our bot recives a message...
client.on('message', msg => {

  // Get the Command (if any) from the msg..
  let command = Util.getBotCommand(msg.content);

  // They didnt use our prefix, bail....
  if (!command) {
    return
  }

  // Log the command...
  console.log(`Received command ${command}`)

  // Handle the diffrent commands that we support, and fall back to a generic
  // message...
  switch (command) {
    case 'help':
      MessageUtil.sendHelpMessage(client, msg);
      break;
    case 'status':
      ServerUtil.getServerStatus((success, info) => {
        console.log(info)
        if (success) {
          MessageUtil.sendStatusMessage(client, msg, info)
        } else {
          MessageUtil.sendApiErrorMessage(client, msg, info)
        }
      })
      break;
    case 'stop':
      msg.reply('stop command init...')
      break;
    case 'start':
      msg.reply('start command init...')
      break;
    case 'ping':
      msg.reply('pong')
      break;
    default:
      msg.reply('you made a fucky wucky..')
  }
});


/**
Below are Handlers that help us in debugging WebSocket connection issues nothing
too important but very helpful in debugging...
*/

client.on("error", (e) => {
  console.error(e)
});

client.on("disconnect", (e) => {
    console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
});

client.on("reconnecting", (e) => {
    console.log(`client tries to reconnect to the WebSocket`);
});

client.on("resume", (e) => {
    console.log(`whenever a WebSocket resumes, ${e} replays`);
});

// Log Us in to discords servers....
client.login(Config.token);
