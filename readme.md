# GearGG - Discord CSGO Server Management Bot

### What is it?
This discord bot serves as a way to manage CSGO server hosted by DatHost using Discord. DatHost Provide a *Pay As You Play* payment service which is great but needing to login to start / stop the server as needed, using this discord bot you can start / stop and view the current status of the server.

### Usage
* ```{prefix} status```  *Displays the current status of the CSGO server*
* ```{prefix}  start```   *Starts up the CSGO server*
* ```{prefix}  stop```    *Stops the CSGO server*
* ```{prefix}  help```    *Lists all commands avalible to the user*

### Insalliation

To install this server you will need to place a ```config.json``` in the same directory as the node application. This config file should look like the one below:
```
{
  "token"  : "notarealtoken",
  "prefix" : "!prefix",
  "server_id": "notarealserverid",
  "dathost_username": "fake@email.com",
  "dathost_psw": "passwordhere"
}
```
In order for the bot to work, replace the fields as follows:
* ```token```: Discord bot token
* ```prefix```: The prefix you want your bot to respond to i.e !geargg
* ```server_id```: Dathost server id
* ```dathost_username```: Dathost Username
* ```dathost_psw```: Dathost password

This application can then run on any VPS or managed bot service and can be managed using PM2.
