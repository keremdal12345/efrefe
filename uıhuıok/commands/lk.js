var fs = require("fs");

module.exports = {
  name: "!lk",
  description: "Registration for 7PM",
  async execute(msg, cfg) {
    if (msg.channel.id === process.env.REG_7PM || msg.channel.id === process.env.REG_11PM) {
      if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
        msg.channel.overwritePermissions([
          {
            id: msg.guild.roles.cache.find(role => role.name === "× MT EU Scrimers ×")
              .id,
            deny: ["SEND_MESSAGES"],
            allow: ["VIEW_CHANNEL"]
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
              role => role.name === "ʚ Scrim Staff ɞ"
            ).id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: msg.guild.roles.cache.find(
              role => role.name === "ʚ x ɞ"
            ).id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          }
        ]);

        const db = require("../db.js");

        let config = await db.getConfig(cfg);

        config.waitlist = true;
        config.registrationsOpen = false;

        await db.saveConfig(cfg, config);

        msg.channel.send("Registrations closed for today. See you in our next scrims!");
      } else {
        msg.reply("only ʚ Bot Admin ɞ can use this command.");
      }
    }
  }
};

