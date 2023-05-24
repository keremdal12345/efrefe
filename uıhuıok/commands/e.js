var fs = require("fs");

module.exports = {
  name: "!e",
  description: "Early Registration for 7PM",
  async execute(msg, cfg) {
    if (msg.channel.id === process.env.REG_7PM || msg.channel.id === process.env.REG_11PM) {
      if (
        msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")
      ) {
        msg.channel.overwritePermissions([
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "× MT EU Scrimers ×"
            ).id,
            allow: ["VIEW_CHANNEL"],
            deny: ["SEND_MESSAGES"]
          },
          {
            id: msg.channel.guild.roles.everyone,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(role => role.name === "× MT/SUGAR ×")
              .id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "Fast Pass 1 - 7PM"
            ).id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "Fast Pass 2 - 7PM"
            ).id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "Fast Pass 3 - 7PM"
            ).id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "× VIP - 7PM ×"
            ).id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
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
              role => role.name === "ʚ x ɞ"
            ).id,
            allow: [
              "VIEW_CHANNEL",
              "SEND_MESSAGES",
              "ADD_REACTIONS",
              "USE_EXTERNAL_EMOJIS"
            ]
          }
        ]);

        const db = require("../db.js");

        let config = await db.getConfig(cfg);

        config.registrationsOpen = true;
        config.waitlist = false;

        await db.saveConfig(cfg, config);

        msg.channel.send(
          "<a:p_warning:928906713803919360> **__Priority Registration is now open!__** \n\n**Follow the format, NO EDITS<a:pinkdown:895285069101555712>**\n%register\nTeam Name:\nTeam Tag:\nTeam Manager:",
          { allowedMentions: { roles: ["839508565030600714"] } }
        );
      } else {
        msg.reply("only ʚ Bot Admin ɞ can use this command.");
      }
    }
  }
};

