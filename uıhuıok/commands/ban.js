var fs = require("fs");

module.exports = {
  name: "!ban",
  description: "Add ban role",
  execute(msg, client) {
    if (msg.mentions.users.first() == undefined) {
      return;
    }

    const rol = msg.guild.roles.cache.find(
      role => role.name === "Rule Breakers"
    );

    let members = msg.guild.members.cache.array();

    for (let member of members) {
      if (member.id == msg.mentions.users.first().id) {
        member.roles.add(rol);
      }
    }

    msg.react("892514598358507520");


  }

};


