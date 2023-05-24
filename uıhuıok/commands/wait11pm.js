var fs = require("fs");

module.exports = {
  name: "!w11",
  description: "Open waitlist for 11pm",
  async execute(msg, cfg, client) {
    if (msg.channel.id === process.env.WAITLIST_11PM) {
      if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
        msg.channel.overwritePermissions([
          {
            id: msg.guild.roles.cache.find(role => role.name === "23PM Waitlist")
              .id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.channel.guild.roles.everyone,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "ʚ Scrim Staff ɞ"
            ).id,
            allow: [
              "VIEW_CHANNEL",
              "SEND_MESSAGES",
              "MANAGE_ROLES",
              "ADD_REACTIONS",
              "USE_EXTERNAL_EMOJIS"
            ]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "ʚ Staff ɞ"
            ).id,
            allow: [
              "VIEW_CHANNEL",
              "SEND_MESSAGES",
              "ADD_REACTIONS",
              "USE_EXTERNAL_EMOJIS"
            ]
          }
        ]);

        msg.channel.send(
          "Waitlist OPEN! <@&912061264270860309>\n\n**Follow the format, NO EDITS<a:pinkdown:895285069101555712>**\n%register\nTeam Name:\nTeam Tag:\nTeam Manager:",
          { allowedMentions: { roles: ["912061264270860309"] } }
        );

        const db = require("../db.js");

        let config = await db.getConfig(cfg);

        config.waitlist = true;
        config.registrationsOpen = false;

        await db.saveConfig(cfg, config);

        msg.guild.channels.cache.get(process.env.REG_11PM).send("!lk");
      } else {
        msg.reply("only ʚ Bot Admin ɞ can use this command.");
      }
    }
  }
};

