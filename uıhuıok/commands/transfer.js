var fs = require("fs");

module.exports = {
  name: "!transfer",
  description: "role transfer",
  execute(msg, config, client) {
    if (msg.channel.id === process.env.BTCHANNELID) {
      if (msg.mentions.users.first() == undefined) {
      return;
    }

    //const rol = msg.guild.roles.cache.find(
     // role => role.name === "7PM ID PW L-1"
   // );
     //let members = msg.guild.members.cache.array();

   // for (let member of members) {
   //   if (member.id == msg.mentions.users.first().id) {
   //     member.roles.add(rol);
   //   }
   // }
    }

  }
}