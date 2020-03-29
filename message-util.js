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
  if (!serverInfo.running && !serverInfo.booting) {
    message.channel.send(`Looks like the server is not currently on, you can start it using *${Config.prefix} start*`)
    return
  }

  if (serverInfo.booting) {
    message.channel.send(
      {
        embed:
          {
            color: 3447003,
            title: `${serverInfo.name}`,
            description: `The Server is currently Booting and should be ready in approx 10 seconds.`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Jack Tidbury (tidbury.io)"
            }
        }
      });
  } else {

    let serverFields = [{
        name: "Connect to server",
        value: `Paste the following into your server \n*connect ${serverInfo.ip}; password ${serverInfo.password}*`
      }]

    if (serverInfo.currentMap){
      serverFields.unshift({
        name: `Current Map`,
        value: `Current map is ${serverInfo.currentMap}.`
      })
    }

    if (serverInfo.currentPlayers){
      serverFields.unshift({
        name: `Players Online`,
        value: `There are currently ${serverInfo.currentPlayers} players online.`
      })
    }

    message.channel.send(
      {
        embed:
          {
            color: 3447003,
            title: `${serverInfo.name}`,
            description: `Below you can find the current status of the ${serverInfo.name} CSGO server.`,
            fields: serverFields
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Jack Tidbury (tidbury.io)"
            }
        }
      });
  }


}

module.exports.sendStartingMessage = function(message){
  message.channel.send('Attempting to start server')
}

module.exports.sendServerAlreadyOn = function(message){
  message.channel.send('Looks like the server is alredy running')
}

module.exports.stoppedServer = function(message){
  message.channel.send('Successfully stopped the server. Thanks for keeping down the costs :)')
}

module.exports.sendServerAlreadyOff = function(message){
  message.channel.send('Looks like the server is alredy stopped')
}

module.exports.sendApiErrorMessage = function(message, error){
  message.channel.send(str(error))
  message.channel.send('Oh, something went wrong when communicating with the DatHost Api please pester <@269430456095735808> to fix :)')
}
