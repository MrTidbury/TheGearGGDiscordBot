const Request = require('request')
const Config = require('./config.json')

// Setup the Base API URL for the DatHost Api...
const BaseApiUrl = `https://dathost.net/api/0.1/game-servers/${Config.server_id}`
// Setup the Auth Dict Needed for authenticating with the Api...
const AuthDict = {'auth': {'user': Config.dathost_username, 'pass': Config.dathost_psw}}

// Function to get the Current Server Status...
module.exports.getServerStatus = function(callback) {
  Request.get(BaseApiUrl, AuthDict, (error, response, body) => {


    // If we have an error, then need to tell the invocator...
    if (error){
      callback(false, {})
    }

    let data = JSON.parse(body)

    // There is alot of shit in the response, so lets filter it down...
    // we always want to know if it is running...
    let serverDetails = {
      running: data.on,
      name: data.name,
      booting: data.booting
    }

    // If the server is running then lets add some more shit boi...
    if (data.on){
      serverDetails.ip = `${data.custom_domain}:${data.ports.game}`
      serverDetails.password = data.csgo_settings.password
      // The data.staus comes in a really anoyying data struct, lets sort that now...
      data.status.forEach(stautsDict => {
        if (stautsDict.key == 'Players online'){
          serverDetails.currentPlayers = stautsDict.value
        } else if (stautsDict.key == 'Current map'){
          serverDetails.currentMap = stautsDict.value
        }
      })
    }

    // Fire the Callback to pass this data to the calling function...
    callback(true, serverDetails);
  });
}

// Function to start the server...
module.exports.startServer = function(callback) {
  Request(`${BaseApiUrl}/start`, { method: "POST", auth: { user: Config.dathost_username, pass: Config.dathost_psw}}, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(true)
      } else {
        callback(false)
      }
  });
}

// Function to stop the server...
module.exports.stopServer = function(callback) {
  Request(`${BaseApiUrl}/stop`, { method: "POST", auth: { user: Config.dathost_username, pass: Config.dathost_psw}}, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(true)
      } else {
        callback(false)
      }
  });
}
