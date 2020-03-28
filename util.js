const Config = require('./config.json')


module.exports.getBotCommand = function(message){
  // This function checks if the message starts with our Bot Prefix, and if it
  // does then it returns the 'command' (the string after the prefix)
  if (message.startsWith(Config.prefix)) {
    // Remove the bot prefix from the string to get the command...
    let command = message.substring(Config.prefix.length)
    if (command){
      // Return the command pre-trimmed...
      return command.trim()
    } else {
      // They used our prefix but didnt provide a command, return help...
      return 'help';
    }
  } else {
    // Doesnt start with our prefix, so we really dont care about it...
    return null;
  }
}
