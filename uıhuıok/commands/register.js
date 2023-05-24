var fs = require("fs");

module.exports = {
  name: "%register",
  description: "Registration for 7PM",
  async execute(msg, cfg, client) {

    const db = require("../db.js");

    let config = await db.getConfig(cfg);

    if (
      (msg.channel.id === process.env.REG_7PM &&
        config.registrationsOpen === true) ||
      (msg.channel.id === process.env.WAITLIST_7PM && config.waitlist === true)
    ) {
      let registration = msg.content.split("\n");
      let teamName = registration[1].includes(":")
        ? registration[1].substr(registration[1].indexOf(":") + 1).trim()
        : registration[1];
      let teamTag = registration[2].includes(":")
        ? registration[2].substr(registration[2].indexOf(":") + 1).trim()
        : registration[2];
      let teamManager = msg.mentions.users.first()
        ? "<@" + msg.mentions.users.first().id + ">"
        : "";

      // reacts with ban hammer if sender of msg has ban role
      if (msg.member.roles.cache.find(role => role.name === "Rule Breakers")) {
        msg.react("910869597903781948");
        return;
      }

      let members = msg.guild.members.cache.array();
      let role = msg.guild.roles.cache.find(r => r.name === "Rule Breakers");

      for (let member of members) {
        if (
          member.roles.cache.has(role.id) &&
          msg.mentions.users.first().id != "undefined" &&
          member.id == msg.mentions.users.first().id
        ) {
          msg.react("910869597903781948");
          return;
        }
      }

      if (
        registration.length < 4 ||
        !teamManager ||
        teamManager === "" ||
        !teamName ||
        teamName === "" ||
        !teamTag ||
        teamTag === ""
      ) {
        msg.react("869025870948474880");
        return;
      }

      if (
        (config.registrationsOpen === true && config.numberOfTeams === 20) ||
        (config.waitlist === true &&
          config.numberOfTeams < 20 &&
          msg.channel.id === process.env.REG_7PM) ||
        (config.waitlist === true &&
          config.numberOfTeams === 20 &&
          msg.channel.id === process.env.WAITLIST_7PM)
      ) {
        msg.react("895284690565623818");
        const role = msg.guild.roles.cache.find(
          role => role.name === "7PM Waitlist"
        );

        let members = msg.guild.members.cache.array();

        for (let member of members) {
          if (member.id == msg.mentions.users.first().id) {
            config.waitlist = true;

            await db.saveConfig(cfg, config);

            // member.roles.add(role);
            return;
          }
        }

        return;
      }

      let registered = false;

      config.slots.forEach(team => {
        if (
          team.teamTag === "" &&
          team.teamName === "" &&
          team.teamManager === "" &&
          registered === false
        ) {
          team.teamTag = teamTag;
          team.teamName = teamName;
          team.teamManager = teamManager;
          registered = true;
        }
      });

      config.numberOfTeams++;

      await db.saveConfig(cfg, config);

      const rol = msg.guild.roles.cache.find(
        role => role.name === "7PM ID PW L-1"
      );

      for (let member of members) {
        if (member.id == msg.mentions.users.first().id) {
          // member.roles.add(rol);
        }
      }

      msg.react("892514598358507520");

      client.commands.get('!s').execute(msg, cfg, client);

      return;
    }







    // 23:00 scrims
    if (
      (msg.channel.id === process.env.REG_11PM &&
        config.registrationsOpen === true) ||
      (msg.channel.id === process.env.WAITLIST_11PM && config.waitlist === true)
    ) {
      let registration = msg.content.split("\n");
      let teamName = registration[1].includes(":")
        ? registration[1].substr(registration[1].indexOf(":") + 1).trim()
        : registration[1];
      let teamTag = registration[2].includes(":")
        ? registration[2].substr(registration[2].indexOf(":") + 1).trim()
        : registration[2];
      let teamManager = msg.mentions.users.first()
        ? "<@" + msg.mentions.users.first().id + ">"
        : "";

      // reacts with ban hammer if sender of msg has ban role
      if (msg.member.roles.cache.find(role => role.name === "Rule Breakers")) {
        msg.react("910869597903781948");
        return;
      }

      let members = msg.guild.members.cache.array();
      let role = msg.guild.roles.cache.find(r => r.name === "Rule Breakers");

      for (let member of members) {
        if (
          member.roles.cache.has(role.id) &&
          msg.mentions.users.first().id != "undefined" &&
          member.id == msg.mentions.users.first().id
        ) {
          msg.react("910869597903781948");
          return;
        }
      }

      if (
        registration.length < 4 ||
        !teamManager ||
        teamManager === "" ||
        !teamName ||
        teamName === "" ||
        !teamTag ||
        teamTag === ""
      ) {
        msg.react("869025870948474880");
        return;
      }

      if (
        (config.registrationsOpen === true && config.numberOfTeams === 20) ||
        (config.waitlist === true &&
          config.numberOfTeams < 20 &&
          msg.channel.id === process.env.REG_11PM) ||
        (config.waitlist === true &&
          config.numberOfTeams === 20 &&
          msg.channel.id === process.env.WAITLIST_11PM)
      ) {
        msg.react("895284690565623818");
        const role = msg.guild.roles.cache.find(
          role => role.name === "23PM Waitlist"
        );

        let members = msg.guild.members.cache.array();

        for (let member of members) {
          if (member.id == msg.mentions.users.first().id) {
            config.waitlist = true;
            await db.saveConfig(cfg, config);
            // member.roles.add(role);
            client.commands.get('!s').execute(msg, cfg, client);
            return;
          }
        }

        return;
      }

      let registered = false;

      config.slots.forEach(team => {
        if (
          team.teamTag === "" &&
          team.teamName === "" &&
          team.teamManager === "" &&
          registered === false
        ) {
          team.teamTag = teamTag;
          team.teamName = teamName;
          team.teamManager = teamManager;
          registered = true;
        }
      });

      config.numberOfTeams++;

      await db.saveConfig(cfg, config);

      const rol = msg.guild.roles.cache.find(
        role => role.name === "23PM ID PW L-A"
      );

      for (let member of members) {
        if (member.id == msg.mentions.users.first().id) {
          // member.roles.add(rol);
        }
      }

      msg.react("892514598358507520");

      client.commands.get('!s').execute(msg, cfg, client);


    }
  }


};