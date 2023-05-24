var fs = require("fs");

module.exports = {
  name: "!c",
  description: "Cancel slot for 7PM",
  async execute(msg, cfg, client) {
    if (msg.channel.id === process.env.PW_SLOTS_7PM || msg.channel.id === process.env.PW_SLOTS_11PM) {
      if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {

        let slot =
          msg.content.split(" ")[1] == "all"
            ? "all"
            : parseInt(msg.content.split(" ")[1]);

        const db = require("../db.js");

        let config = await db.getConfig(cfg);

        if (slot === "all") {
          config.slots.forEach(team => {
            team.teamTag = "";
            team.teamName = "";
            team.teamManager = "";
          });

          config.numberOfTeams = 0;
          msg.channel.send("Removed all slots");
        } else {
          if (msg.channel.id === process.env.PW_SLOTS_7PM) {
            const rol = msg.guild.roles.cache.find(
              role => role.name === "7PM ID PW - A"
            );
            let members = msg.guild.members.cache.array();

            for (let member of members) {
              if (member.id == config.slots[slot - 5].teamManager.replace(/[\\<>@#&!]/g, "")) {
                member.roles.remove(rol);
              }
            }
          } else if (msg.channel.id === process.env.PW_SLOTS_11PM) {
            const rol = msg.guild.roles.cache.find(
              role => role.name === "23PM ID PW - A"
            );
            let members = msg.guild.members.cache.array();

            for (let member of members) {
              if (member.id == config.slots[slot - 5].teamManager.replace(/[\\<>@#&!]/g, "")) {
                member.roles.remove(rol);
              }
            }
          }

          config.slots[slot - 5].teamTag = "";
          config.slots[slot - 5].teamName = "";
          config.slots[slot - 5].teamManager = "";

          config.numberOfTeams = config.numberOfTeams - 1;
        }

        await db.saveConfig(cfg, config);

        if (msg.channel.id === process.env.PW_SLOTS_7PM) {
          client.channels.fetch(process.env.WAITLIST_7PM).then(channel => {
            channel.messages.fetch(`919338131348672572`).then(message => {
              message.edit("**__FREE SLOTS: " + (20 - config.numberOfTeams) + "__**");
            }).catch(err => {
              console.error(err);
            });
          });
        } else {
          // client.channels.fetch(process.env.WAITLIST_7PM).then(channel => {
          //   // channel.send("FREE SLOTS: "+(20 - config.numberOfTeams));
          //   channel.messages.fetch(`919338131348672572`).then(message => {
          //     message.edit("**__FREE SLOTS: " + (20 - config.numberOfTeams) + "__**");
          //   }).catch(err => {
          //     console.error(err);
          //   });
          // });
        }

        msg.react("892514598358507520");
        client.commands.get('!s').execute(msg, cfg, client);
      } else {
        msg.reply("only ʚ Bot Admin ɞ can use this command.");
      }
    }
  }
};


