const Config = require('./config.json')

module.exports.sendHelpMessage = function(client, message){
  message.reply(
    {
      embed:
        {
          color: 3447003,
          title: "CSGO Server Management Bot",
          description: `This bot can be instiagated by using the ${Config.prefix} command. Below you can find what this bot can do`,
          fields: [
            {
              name: `${Config.prefix} status`,
              value: "Shows the current status of the CSGO Retakes Server."
            },
            {
              name: `${Config.prefix} start`,
              value: "Starts up *(if it is not already running)* the CSGO Retakes Server."
            },
            {
              name: `${Config.prefix} stop`,
              value: "Stops *(if it is not already stopped)* the CSGO Retakes Server."
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Jack Tidbury (tidbury.io)"
          }
      }
    });
}

module.exports.sendStatusMessage = function(client, message, serverInfo) {

  // The server is not currently running so just send a simple message...
  if (!serverInfo.running) {
    message.channel.send(`Looks like the server is not currently on, you can start it using *${Config.prefix} start*`)
    return
  }

  message.channel.send(
    {
      embed:
        {
          color: 3447003,
          title: `${serverInfo.name}`,
          description: `Below you can find the current status of the ${serverInfo.name} CSGO server.`,
          fields: [
            {
              name: `Players Online`,
              value: `There are currently ${serverInfo.currentPlayers} players online.`
            },
            {
              name: `Current Map`,
              value: `Current map is ${serverInfo.currentMap}.`
            },
            {
              name: "Connect to server",
              value: `Paste the following into your server *connect ${serverInfo.ip}; password ${serverInfo.password}*`
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Jack Tidbury (tidbury.io)"
          }
      }
    });
}

module.exports.sendApiErrorMessage = function(client, message, error){
  message.channel.send(str(error))
  message.channel.send('Oh, something went wrong when communicating with the DatHost Api please pester <@269430456095735808> to fix :)')
}
