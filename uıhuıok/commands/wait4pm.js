var fs = require("fs");

module.exports = {
  name: "!w4",
  description: "Open waitlist for 4pm",
  execute(msg) {
    if (msg.channel.id === process.env.WAITLIST_4PM) {
      if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
        msg.channel.overwritePermissions([
          {
            id: msg.guild.roles.cache.find(role => role.name === "Waitlist - 4PM")
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
        msg.channel.send(
          "Waitlist OPEN! <@&903697131473367070>\n\n**Follow the format, EDITS ALLOWED <a:pinkdown:895285069101555712>**\nTeam Name <a:6695pinkcheck:892514598358507520>",
          { allowedMentions: { roles: ["903697131473367070"] } }
        );
      } else {
        msg.reply("only ʚ Bot Admin ɞ can use this command.");
      }
    }
  }
};